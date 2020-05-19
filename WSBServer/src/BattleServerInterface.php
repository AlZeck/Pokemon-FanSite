<?php

namespace Server;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

include 'DBController.php';
include 'Battaglia/battaglia.php';
include 'Battaglia/utilities.php';
include 'Battaglia/pokemon.php';
include 'Battaglia/mossa.php';
include 'Battaglia/utente.php';

class BattleServerInterface implements MessageComponentInterface {
    protected $clients;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
    }

    /**
     * Connection Arrival handler 
     */
    public function onOpen(ConnectionInterface $conn) {
        // Store the new connection to send messages to later
        $this->clients->attach(new User($conn));

        echo "New connection! ({$conn->resourceId})\n";
    }

    // Tells all clients the arrival of a new User
    private function updateUsers() {
        $lisclients = array();
        foreach ($this->clients as $client) {
            if (!$client->isInBattle())
                array_push($lisclients, $client->getUsername());
        }
        $msg = "{ \"type\": \"update\", \"value\" : [\"" . implode("\",\"", $lisclients) . "\"] }";
        echo "sending pool Message : " . $msg . "\n";
        foreach ($this->clients as $client) {
            $client->send($msg);
        }
    }

    // Common finders 
    private function getUserbyUserName($username) {
        foreach ($this->clients as $client) {
            if ($username == $client->getUsername()) {
                return $client;
            }
        }
        return NULL;
    }

    private function getUserbyConnection(ConnectionInterface $conn) {
        foreach ($this->clients as $client) {
            if ($conn == $client->getConn()) {
                return $client;
            }
        }
    }


    /**
     * Message arrival handler 
     */
    public function onMessage(ConnectionInterface $from, $msg) {
        /**$numRecv = count($this->clients) - 1;
        echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
            , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');*/
        $parsedMsg = \json_decode($msg, true);
        //\var_dump($parsedMsg);
        //echo $msg;

        switch ($parsedMsg['type']) {
            case 'new':
                /**
                 * new user arrived 
                 * @return toClients updated userlist 
                 */
                $client = self::getUserbyConnection($from);
                $username = $parsedMsg["value"]["sender"];
                $team = \json_encode($parsedMsg["value"]["team"]);
                //\var_dump($team);
                $client->setInfo($username, $team);
                $parsedMsg["msg"] = "User:" . $client->getUsername() . " has arrived ";
                echo $parsedMsg["msg"] . "\n";

                self::updateUsers();
                break;
            case 'CPU':
                /**
                 * Create new battle against CPU
                 * @return toClient battle Message
                 */
                $client = self::getUserbyConnection($from);
                $team = \json_encode($parsedMsg["value"]["team"]);
                $client->startBattle(new CPU($team));

                break;
            case 'request':
                /**
                 * User is asking another to battle 
                 * @return if( adv exist ) fowards the request
                 *         else sends client refuse Message
                 */
                $client = self::getUserbyConnection($from);
                $adv = $parsedMsg["value"]["destination"];
                if ($adv == 'CPU') {
                    $client->startBattle($client->getAdv());
                } else {
                    $clientAdv = self::getUserbyUserName($adv);
                    if ($clientAdv !== NULL && $clientAdv->getWaiting() == "") {
                        $client->setWaiting($adv); // sets client to wait for battle accept
                        $clientAdv->send($msg); //forward the request to the adv
                    } else {
                        //adv not found ERROR? 
                        $client->send('{ "type" : "error", "value" : "UTENTE NON DISPONIBILE"}');
                    }
                }
                break;
            case 'accept':
                /**
                 * User accepts the battle request
                 * @return if( adv exist ) battle Message
                 *         else refuse Message
                 */
                $client = self::getUserbyConnection($from);
                $adv = $parsedMsg['value']['destination'];
                $clientAdv = self::getUserbyUserName($adv);
                if ( $clientAdv !== NULL && $clientAdv->getWaiting() == $parsedMsg['value']['sender']) {
                    // ADV FOUND start battle and availible
                    $clientAdv->startBattle($client);
                    self::updateUsers();
                } else {
                    //adv not found ERROR? 
                    $client->send('{ "type" : "error", "value" : "UTENTE NON DISPONIBILE" }');
                }
                break;
            case 'refuse':
                 /**
                 * User refuses the battle request
                 * @return if( adv exist ) refuses Message
                 *          else none
                 */
                $adv = $parsedMsg['value']['destination'];
                $clientAdv = self::getUserbyUserName($adv);
                if ( $clientAdv !== NULL  && $clientAdv->getWaiting() == $parsedMsg['value']['sender'] ) {
                    // ADV FOUND FOWARD MESSAGE
                    $clientAdv->setWaiting("");
                    $clientAdv->send($msg);
                }
                // if not found Ignore //
                break;
            case 'cancel':
                $client = self::getUserbyConnection($from);
                $client->setWaiting("");
                break;
            case 'battle':
                $client = self::getUserbyConnection($from);
                $info = \json_encode($parsedMsg['value']['battleInfo']);
                if ($parsedMsg['value']['sender'] == 'CPU') {
                    $client->getAdv()->selectAction($info);
                } else {
                    $client->selectAction($info);
                }
                break;
            


            default:
                $from->send('{ "type" : "error", "value" : "RICHIESTA NON TROVATA"}');
        }
    }

    /**
     * On Closure procedure 
     * Exchanges the user for a CPU (to prevent errors) and sends forfeit message
     */
    public function onClose(ConnectionInterface $conn) {
        // The connection is closed, remove it, as we can no longer send it messages
        $client = self::getUserbyConnection($conn);
        $this->clients->detach($client);
        self::updateUsers();
        if ($client->isInBattle()) {
            $client->getAdv()->endBattle();
        }
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    /**
     * On Error procedure 
     * Exchanges the user for a CPU (to prevent errors) and sends forfeit message
     */
    public function onError(ConnectionInterface $conn, \Exception $e) {
        $client = self::getUserbyConnection($conn);
        $this->clients->detach($client);
        self::updateUsers();
        if ($client->isInBattle()) {
            $client->getAdv()->endBattle();
        }
        $conn->close();
        echo "An error has occurred: for User {$client->getUsername()} {$e->getMessage()}\n";
    }
}

class CPU {
    protected $team; // msg with team 
    protected $battle; //Object || Null if not in battle 
    protected $adv; // User
    protected $action;
    protected $username; //username 

    function __construct($team) {
        $this->team = $team;
        $this->action = "";
        $this->adv = NULL;
        $this->battle = NULL;
        $this->username = "CPU";
    }

    public function send($msg) {
    }

    private function sendPoolMessage($msg) {
        $this->adv->send($msg);
    }

    
    function endBattle() {
        //fix both players leave error
    }

    function selectAction($action) {
        $this->action = $action;
        if ($this->adv->action != "") {
            $msg = $this->battle->generaRisposta($this->action, $this->adv->action);
            $this->sendPoolMessage('{ "type": "battle", "value" : ' . $msg . '}');
            $this->action = "";
            $this->adv->action = "";
        }
    }

    function getAdv() {
        return $this->adv;
    }
}

class User extends CPU {
    //"{ type: "user|msg", sender: username, dest: dest, msg: message }"
    private $conn;  //conn->resourceId
    private $waitstatus;



    function __construct(ConnectionInterface $conn) {
        parent::__construct("");
        $this->conn = $conn;
        $this->username = "";
        $this->waitstatus = "";
    }

    function setInfo($username, $team) {
        //echo "User in ".$this->conn->resourceId." updated its name to ".$username."\n";
        $this->username = $username;
        $this->team = $team;
    }

    public function getUsername() {
        return $this->username;
    }

    public function getConn() {
        return $this->conn;
    }

    public function send($msg) {
        $this->conn->send($msg);
    }

    private function sendPoolMessage($msg) {
        $this->send($msg);
        $this->adv->send($msg);
    }

    function startBattle(CPU $adv) {
        $this->adv = $adv;
        $adv->adv = $this;
        // Create the correct strings to send to the controller
        $msg1 = '{ "utente": "' . $this->username . '" ,"squadra":' . $this->team . '}';
        $msg2 = '{ "utente": "' . $adv->username . '" ,"squadra":' . $adv->team . '}';
        // Starts the controller
        $ret = \Battaglia::inizializzaBattaglia($msg1, $msg2);
        $this->battle = $ret[0];
        $adv->battle  = $ret[0];

        $msg = $ret[1];
        $this->sendPoolMessage('{ "type": "battle", "value" : ' . $msg . '}');
    }

    function endBattle() {
        $forfeitAction = '{
            "utente": "' . $this->adv->getUsername() . '",
            "azione": "forfeit",
            "valore": 0
        }';
        $this->adv = new CPU($this->adv->team);
        $this->adv->adv = $this;
        $this->adv->selectAction($forfeitAction);
    }

    function deleteBattle() {
        $this->adv = NULL;
        $this->battle = NULL;
    }

    function isInBattle() {
        if ($this->battle !== NULL) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    // possible status availible, wait
    function getWaiting(){
        return $this->waitstatus;
    }

    function setWaiting($val){
        $this->waitstatus = $val;
    }

    function selectAction($action) {
        $this->action = $action;
        if ($this->adv->action != "") {
            $msg = $this->battle->generaRisposta($this->action, $this->adv->action);
            $this->sendPoolMessage('{ "type": "battle", "value" : ' . $msg . '}');
            $this->action = "";
            $this->adv->action = "";
        }
    }
}
