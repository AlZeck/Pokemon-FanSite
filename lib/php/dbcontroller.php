<?php 
    class DBController {

        /**
         * ? functions defined on this class :
         * *   public static function getController() 
         *        Gets the database controller 
         * *   public function getPokemonById( $id )
         *        Gets pokemon by id 
         * *   public function getUserByUsername( $username )
         *        Gets user by username 
         * *   public function getMossaById( $id )
         *        Gets mossa by id 
         * *   public function getPokemonList()
         *        Gets all the pokemons in the database
         * *   public function getMosseList()
         *        Gets all the mosse in the database
         * *   public function getMosseListByPokemon( $id )
         *        Gets all the mosse that a pokemon can learn
         * *   public function getListPokemonByMossa( $id )
         *        Gets all the pokemons in the database that can learn an specific move
         * *   public function getListPokemonByType
         *        Gets all the pokemons in the database that belong to an specific type
         * *   public function getListMovesByType( $type )
         *        Gets all the mosse in the database that belong to an specific type
         */


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

        private function __construct(){
    
            $this->connection = new mysqli(self::$servername, self::$username, self::$password, self::$database);
            if ($this->connection->connect_error) {
                die("Connection failed: " . $this->connection->connect_error);
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
                $obj = $result -> fetch_all();
                if (sizeof($obj)==0){
                    $obj = Null;
                }
                $result->free_result(); 
            }
            return $obj;
        }

        /**
         * Gets user by username 
         * @param string $username String that identifies the user
         * @return  array(   string => username, 
         *                  string => password, 
         *               )
         *          or null if no match is found
         */
        public function getUserByUsername( $username ){
            $query = "select * from utente where username = ".$username;
            return $this->query($query);
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
                and pokemon.id = ".strval($id);
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
                and mossa.id =".strval($id);
            return $this->query($query);
        }

        /**
         * Gets all the pokemons in the database that belong to an specific type 
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
       
    }

?>