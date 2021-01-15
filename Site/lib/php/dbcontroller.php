<?php 

    class DBController {

        /**
         * ? functions defined on this class :
         * *   public static function getController() 
         *        Gets the database controller 
         * ? User
         * *   public function getUserInfoByUsername( $username )
         *        Gets user's information by username 
         * *   public function checkUsernameExists( $username )
         *        Checks if the username exists
         * *   public function addNewUser($username,$password)
         *        Adds New user to the db
         * ? Pokemon 
         * *   public function getPokemonById( $id )
         *        Gets pokemon by id 
         * *   public function getMossaById( $id )
         *        Gets mossa by id 
         * *   public function getPokemonList()
         *        Gets all the pokemons in the database
         * *   public function getMosseList()
         *        Gets all the mosse in the database
         * *   public function getListTipi()
         *        Gets all the types in the database
         * *   public function checkTipoExists( $tipo )
         *        Checks if the type exists 
         * *   public function getMosseListByPokemon( $id )
         *        Gets all the mosse that a pokemon can learn
         * *   public function getListPokemonByMossa( $id )
         *        Gets all the pokemons in the database that can learn an specific move
         * *   public function getListPokemonByType( $type )
         *        Gets all the pokemons in the database that belong to an specific type
         * *   public function getListMovesByType( $type )
         *        Gets all the mosse in the database that belong to an specific type
         * *   public function searchByName($name)
         *        Search the entire db for an specific name 
         */

        
        private static $controller = null; 
        private $connection;
        
        private function __construct(){
            try{
                $dbopts = parse_url(getenv('DATABASE_URL'));
                $servername = $dbopts["host"];
                $username = $dbopts["user"];
                $password = $dbopts["pass"];
                $port = $dbopts["port"];
                $database = ltrim($dbopts["path"],'/');
                $this->connection = new PDO("pgsql:host=$servername;dbname=$database;port=$port", $username, $password);
            } catch (PDOException $e){
                die("Connection failed: " . $e->getMessage());
            }
            // echo "Connected successfully \n";
        }

        public static function getController() {
            if (!self::$controller){
                self::$controller = new DBController();
            }
       
          return self::$controller;
        }
        
        private function query($query){
            $obj = Null;
            if( $result = $this->connection->query($query) ){
                $obj = $result -> fetchAll(PDO::FETCH_ASSOC);
                if (sizeof($obj)==0){
                    $obj = Null;
                }
            }
            return $obj;
        }

        /**
         * Gets user's information by username 
         * @param string $username String that identifies the user
         * @return  array(   string => username, 
         *                  string => password, 
         *               )
         *          or null if no match is found
         */
        public function getUserInfoByUsername( $username ){
            $query = "select * from utente where username = '".$username."'";
            $result = $this->query($query);
            if($result != Null)
                return $result[0];
            else 
                return $result;
        }

        /**
         * Checks if the username exists 
         * @param string $username String that identifies the user
         * @return bool(true) if exists
         *         or bool(false)  if NOT 
         */
        public function checkUsernameExists( $username ){
            $query = "select username from utente where username = '".$username."'";
            $result = $this->query($query);
            if($result != Null)
                return true;
            else 
                return false;
        }

        /**
         * Adds New user to the db
         * @param string $username user choosen username
         * @param string $password user choosen password 
         * @return bool(true) if successful
         *         or bool(false)  if error 
         */
        public function addNewUser($username,$password){
            $query = "insert into utente values('".$username."','".$password."');";
            $this->connection->beginTransaction();
            $this->connection->exec($query);
            return $this->connection->commit();
        }
        
        /**
         * Gets pokemon by id 
         * @param int $id Integer that identifies the pokemon
         * @return  array(   string => id = int, 
         *                   string => nome, 
         *                   string => tipo1,
         *                   string => tipo2 == Null if not exists ,
         *                   string => ps = int,
         *                   string => att = int,
         *                   string => dif = int,
         *                   string => attsp = int,
         *                   string => difsp = int,
         *                   string => vel = int,
         *                   string => uber = int[0,1]
         *               )
         *          or null if no match is found
         */
        public function getPokemonById( $id ){
            $query =  "select * from pokemon where pokemon.id = ".strval($id);
            $result = $this->query($query);
            if($result != Null)
                return $result[0];
            else 
                return $result;
        }
         
        /**
         * Gets mossa by id 
         * @param int $id Integer that identifies the mossa
         * @return  array(
         *                   string => id = int, 
         *                   string => nome, 
         *                   string => tipo,
         *                   string => categoria,
         *                   string => potenza = int,
         *                   string => precisione = int,
         *                   string => descrizione
         *               )
         *          or null if no match is found
         */
        public function getMossaById( $id ){
            $query = "select * from mossa where id =".strval($id);
            $result = $this->query($query);
            if($result != Null)
                return $result[0];
            else 
                return $result;
        }

        /**
         * Gets all the pokemons in the database
         * @return  array(
         *              array(
         *                   string => id = int, 
         *                   string => nome, 
         *                   string => tipo1,
         *                   string => tipo2,
         *                   string => ps = int,
         *                   string => att = int,
         *                   string => dif = int,
         *                   string => attsp = int,
         *                   string => difsp = int,
         *                   string => vel = int,
         *                   string => uber = int[0,1]
         *                  )
         *               )
         *          or null if no match is found
         */
        public function getPokemonList(){
            $query = "select * from pokemon";
            return $this->query($query);
        }

        /**
         * Gets all the mosse in the database
         * @return  array(   
         *              array(
         *                   string => id = int, 
         *                   string => nome, 
         *                   string => tipo,
         *                   string => categoria,
         *                   string => potenza = int,
         *                   string => precisione = int,
         *                   string => descrizione
         *                   )
         *               )
         *          or null if no match is found
         */
        public function getMosseList(){
            $query = "select * from mossa";
            return $this->query($query);
        }

        /**
         * Gets all the types in the database
         * @return  array(   
         *              array(
         *                   string => nome
         *                   )
         *               )
         *          or null if no match is found
         */
        public function getListTipi(){
            $query = "select * from tipo";
            return $this->query($query);
        }

        /**
         * Checks if the type exists 
         * @param string $tipo String that identifies the type
         * @return bool(true) if exists
         *         or bool(false)  if NOT 
         */
        public function checkTipoExists( $tipo ){
            $query = "select * from tipo where nome = '".$tipo."'";
            $result = $this->query($query);
            if($result != Null)
                return true;
            else 
                return false;
        }

        /**
         * Gets all the mosse that a pokemon can learn
         * @param int $id Integer that identifies the pokemon
         * @return  array(   
         *              array(
         *                   string => id = int, 
         *                   string => nome, 
         *                   string => tipo,
         *                   string => categoria,
         *                   string => potenza = int,
         *                   string => precisione = int,
         *                   string => descrizione
         *                   )
         *               )
         *          or null if no match is found
         */        
        public function getMosseListByPokemon( $id ){
            $query = "select mossa.*
            from mossa,pokemon,impara 
            where impara.pokemon = pokemon.id 
                and mossa.id = impara.mossa 
                and pokemon.id = ".strval($id).
            "order by mossa.id";
            return $this->query($query);
        }

        /**
         * Gets all the pokemons in the database that can learn an specific move 
         * @return  array(
         *              array(
         *                   string => id = int, 
         *                   string => nome, 
         *                   string => tipo1,
         *                   string => tipo2,
         *                   string => ps = int,
         *                   string => att = int,
         *                   string => dif = int,
         *                   string => attsp = int,
         *                   string => difsp = int,
         *                   string => uber = int[0,1]
         *                  )
         *               )
         *          or null if no match is found
         */
        public function getListPokemonByMossa( $id ){
            $query = "select pokemon.*
            from mossa,pokemon,impara 
            where impara.pokemon = pokemon.id 
                and mossa.id = impara.mossa 
                and mossa.id =".strval($id). 
            "order by pokemon.id";
            return $this->query($query);
        }

        /**
         * Gets all the pokemons in the database that belong to an specific type 
         * @param string $type type name
         * @return  array(
         *              array(
         *                   string => id = int, 
         *                   string => nome, 
         *                   string => tipo1,
         *                   string => tipo2,
         *                   string => ps = int,
         *                   string => att = int,
         *                   string => dif = int,
         *                   string => attsp = int,
         *                   string => difsp = int,
         *                   string => uber = int[0,1]
         *                  )
         *               )
         *          or null if no match is found
         */
        public function getListPokemonByType( $type ){
            $query = "select * from pokemon where tipo1 = '".$type."' or tipo2 = '".$type."'";
            return $this->query($query);
        }

        /**
         * Gets all the mosse in the database that belong to an specific type
         * @param string $type type name
         * @return  array(   
         *              array(
         *                   string => id = int, 
         *                   string => nome, 
         *                   string => tipo,
         *                   string => categoria,
         *                   string => potenza = int,
         *                   string => precisione = int,
         *                   string => descrizione
         *                   )
         *               )
         *          or null if no match is found
         */
        public function getListMovesByType( $type ){
            $query = "select * from mossa where tipo = '".$type."'";
            return $this->query($query);
        }

        /**
         * Search the entire db for an specific name 
         * @param string $name name that is being search
         * @return  array(   
         *              array(
         *                   string => tab = int, 1 = pokemon, 2 = mossa, 3 = tipo
         *                   string => id = int, 0 if tab = tipo
         *                   string => nome
         *                  )
         *              )
         *          or null if no match is found
         */
        public function searchByName($name){
            $name = strtolower($name);
            $query = "select '1' as tab, id, nome, tipo1 as tipo from pokemon where nome like '".$name."%' ".
            "union ".
            "select '2' as tab, id, nome, tipo from mossa where nome like '".$name."%' ".
            "union ".
            "select '3' as tab, 0, nome, nome as tipo from tipo where nome like '".$name."%' ".
            "order by tab,id";
            return $this->query($query);
        }


        
    }
    
?>