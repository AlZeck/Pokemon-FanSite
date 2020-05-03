import os

class movedex_fixer:
    """
    Fix Movedex csv files, analizing, removing and updating its csv files 

    Attributes
    ----------
    path_poke : str
        Original path to the pokemon movedex directory 
    path_move : str
        Original path to movedex main file 
   
    """

    path_poke = "../assets/movedex/mosse_per_pokemon/"
    path_move = "../assets/movedex/mosse.csv"
    def __init__(self, poke = path_poke, move = path_move):
        """ Creates a new modex_fixer instance
         Attributes
        ----------
        path_poke : str
            path to the pokemon movedex directory 
        path_move : str
            path to movedex main file 
        """
        self.path_poke = poke
        self.path_move = move
        self.__filtered = False

    def fix_move_id(self) -> None: 
        """ Fixes the ordering errors in the movedex csv file
        """ 
        with open(self.path_move,'r+') as movedex:
            lis = movedex.readlines()            
            for x in range(1,len(lis)):
                cur = lis[x].strip().split(';')
                if x != cur[0]:
                    lis[x] = "{};{};{};{};{};{};{}".format(
                        x,cur[1],cur[2],cur[3],cur[4],
                        cur[5],cur[6]
                    )
                else: 
                    lis[x] = lis[x].strip()
            movedex.seek(0)
            print("id;mossa;tipo;categoria;potenza;precisione;descrizione",file=movedex)
            for line in lis[1:]: 
                print(line,file=movedex)
        return None

    def filter_pokemon_moves(self) -> None:
        """ Filters the pokemon moves
        """ 
        pokes = os.listdir(self.path_poke)
        all_moves = [x.split(';')[1] for x in open(self.path_move).readlines()[1:]]
        for poke in pokes:
            with open(self.path_poke+poke,'r') as pokefile:
                #print(poke)
                poke_moves = pokefile.readlines()
            if poke_moves[0].strip() =='id;name':
                poke_moves = [x.split(';')[1].strip() for x in poke_moves[1:]]
            else:
                poke_moves = [x.strip() for x in poke_moves]
            aux = []
            for move in poke_moves:
                if move in all_moves:
                    aux.append("{};{}".format(all_moves.index(move)+1,move))
            
            with open(self.path_poke+poke,'w') as pokefile:
                print("id;name",file=pokefile)
                for line in aux:
                    print(line,file=pokefile)
            
        self.__filtered = True
        return None

    def checks_missing_moves(self) -> None:
        """ Prints Pokemons with less than 8 moves
        """ 
        if not self.__filtered:
            self.filter_pokemon_moves()
        pokes = os.listdir(self.path_poke)
        for poke in pokes:
            with open(self.path_poke+poke,'r') as pokefile:
                poke_moves = [ x.split(';')[0].strip() for x in pokefile.readlines() ]
                if len(poke_moves) < 8 :
                    print(poke[:poke.index('.')])
        return None

if __name__ == "__main__":
    obj = movedex_fixer()
    obj.fix_move_id()
    obj.filter_pokemon_moves()
    obj.checks_missing_moves()

