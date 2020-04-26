<?php 
    class DBController {

        /**
         * * local db values 
         */ 
        private static $servername = "localhost";
        private static $username = "monty";
        private static $password = "python";
        private static $database = "pokemon_fansite";
        /**
         * * external db values 
         *   private static $servername = "localhost";
         *   private static $username = "monty";
         *   private static $password = "python";
         *   private static $database = "pokemon_fansite";
        */

        private static $controller = null; 
        private $connection;

        function __construct(){
    
            $this->connection = new mysqli(self::$servername, self::$username, self::$password, self::$database);
            if ($this->connection->connect_error) {
                die("Connection failed: " . $this->connection->connect_error);
            }
            echo "Connected successfully \n";
        }

        public static function getController() {
            if (!self::$controller){
                self::$controller = new DBController();
            }
       
          return self::$controller;
        }

        // ideally this might get removed
        public function getConnection(){
            return $this->connection;
        }
        
        // ideally this might get removed
        public function query($query){
            return $this->connection.query();
        }

        public function getPokemonById( $id ){
            // TODO
            $this->connection.query();
        }
        
        public function getUserByUsername( $username ){
            // TODO
            $this->connection.query();
        }
    
        public function getMossaById( $id ){
            // TODO
            $this->connection.query();
        }

        public function getPokemonList(){
            // TODO
            $this->connection.query();
        }

        public function getMosseList(){
            // TODO
            $this->connection.query();
        }

        
        public function getMosseListByPokemon( $id ){
            // TODO
            $this->connection.query();
        }

    }


    /**
     * experiment 
     */
    echo "trying to connect  \n";
    $obj = DBController::getController();
    //var_dump($obj);
    
?>