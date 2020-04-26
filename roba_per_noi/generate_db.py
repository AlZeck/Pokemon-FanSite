import pymysql
import os


def create_db():
    print("Connecting")
                        # host,user,password,db
    db = pymysql.connect( host="localhost",user="monty",
                      password="python",db="pokemon_fansite")

    cursor = db.cursor()

    try:
        cursor.execute("drop tables pokemon, mossa, impara, utente;")
    except pymysql.err.InternalError:
        pass


    cursor.execute("create table pokemon ( "+\
    	"id numeric primary key,"+\
    	"nome varchar(20) not null,"+\
        "tipo1 varchar(12) not null,"+\
        "tipo2 varchar(12),"+\
        "ps numeric not null,"+\
        "att numeric not null,"+\
        "dif numeric not null,"+\
        "attsp numeric not null,"+\
        "difsp numeric not null,"+\
        "vel numeric not null,"+\
        "uber boolean not null,"+\
        "check (id > 0 and ps >= 0  and att >= 0 and dif >= 0 and attsp >= 0 and difsp >= 0 and vel >= 0 ),"+\
    	"check (tipo1 in ('acciaio', 'acqua', 'buio', 'coleottero', 'drago', 'elettro',"+\
    					"'erba', 'folletto', 'fuoco', 'ghiaccio', 'lotta', 'normale', "+\
    					"'psico', 'roccia', 'spettro', 'terra', 'veleno', 'volante')),"+\
    	"check (tipo2 is Null or tipo2 in ('acciaio', 'acqua', 'buio', 'coleottero', 'drago', 'elettro',"+\
    										"'erba', 'folletto', 'fuoco', 'ghiaccio', 'lotta', 'normale',"+\
    										"'psico', 'roccia', 'spettro', 'terra', 'veleno', 'volante'))"+\
        "check (tipo2 is Null or tipo1 != tipo2));"
    )


    cursor.execute( "create table mossa ("+\
        	"id numeric primary key,"+\
    	    "nome varchar(20) not null,"+\
    	    "tipo varchar(12) not null,"+\
    	    "categoria varchar(10) not null,"+\
    	    "potenza numeric not null,"+\
    	    "precisione numeric not null,"+\
    	    "descrizione varchar(200) not null,"+\
            "check (potenza >= 0 and precisione  >= 0 and precisione <= 100),"+\
            "check (categoria in ('speciale','fisico')),"+\
    	    "check (tipo in ('acciaio', 'acqua', 'buio', 'coleottero', 'drago', 'elettro', 'erba', "+\
                            "'folletto', 'fuoco', 'ghiaccio', 'lotta', 'normale', 'psico', 'roccia', "+\
                            "'spettro', 'terra', 'veleno', 'volante'))"+\
            ");"
    )
    cursor.execute("create table impara ("+\
        "pokemon numeric references pokemon(id),"+\
        "mossa numeric references mossa(id),"+\
        "primary key (pokemon,mossa)"+\
    ");"
    )

    cursor.execute("create table utente ("+\
                        "username varchar(50) primary key,"+\
                        "password varchar(50)"+\
                    ");"
    )


    poke_dict = {}
    with open("../assets/pokedex/info_pokemon.csv") as files:
        lis = files.readlines()
        for x in lis[1:]:
            if len(x) < 1:
                continue
            cur = x.strip().split(',')
            if cur[3] != '':
                cursor.execute("insert into pokemon values ({},'{}','{}','{}',{},{},{},{},{},{},{});".format(
                    cur[0],cur[1],cur[2],cur[3],cur[4],cur[5],cur[6],cur[7],cur[8],cur[9],cur[10]))
            else:
                cursor.execute("insert into pokemon values ({},'{}','{}',{},{},{},{},{},{},{},{});".format(
                    cur[0],cur[1],cur[2],"Null",cur[4],cur[5],cur[6],cur[7],cur[8],cur[9],cur[10]))

            poke_dict[cur[1]]=cur[0]


    with open("../assets/movedex/mosse.csv") as files:
        lis = files.readlines()
        for x in lis[1:]:
            if len(x) < 1:
                continue
            cur = x.strip().split(';')
            cursor.execute("insert into mossa values ({},'{}','{}','{}',{},{},'{}');".format(
                    cur[0],cur[1].replace("'","\\'"),cur[2],cur[3],cur[4],cur[5],cur[6].replace("'","\\'")))

    lispoke = os.listdir("../assets/movedex/mosse_per_pokemon")
    for poke in lispoke:
        with open("../assets/movedex/mosse_per_pokemon/"+poke) as files:
            lis = files.readlines()
            for x in lis[1:]:
                if len(x) < 1:
                    continue
                cur = x.strip().split(';')
                pokemon = poke[:poke.index('.')]
                cursor.execute("insert into impara values ({},{});".format(
                   poke_dict[pokemon] ,cur[0] ))


    db.commit()
    db.close()
    print("succesful")


def create_sql_file():
    print("drop tables pokemon, mossa, impara, utente;")
    print("create table pokemon ( "+\
    	"id numeric primary key,"+\
    	"nome varchar(20) not null,"+\
        "tipo1 varchar(12) not null,"+\
        "tipo2 varchar(12),"+\
        "ps numeric not null,"+\
        "att numeric not null,"+\
        "dif numeric not null,"+\
        "attsp numeric not null,"+\
        "difsp numeric not null,"+\
        "vel numeric not null,"+\
        "uber boolean not null,"+\
    	"check (id > 0 and ps >= 0  and att >= 0 and dif >= 0 and attsp >= 0 and difsp >= 0 and vel >= 0 ),"+\
    	"check (tipo1 in ('acciaio', 'acqua', 'buio', 'coleottero', 'drago', 'elettro',"+\
    					"'erba', 'folletto', 'fuoco', 'ghiaccio', 'lotta', 'normale', "+\
    					"'psico', 'roccia', 'spettro', 'terra', 'veleno', 'volante')),"+\
    	"check (tipo2 is Null or tipo2 in ('acciaio', 'acqua', 'buio', 'coleottero', 'drago', 'elettro',"+\
    										"'erba', 'folletto', 'fuoco', 'ghiaccio', 'lotta', 'normale',"+\
    										"'psico', 'roccia', 'spettro', 'terra', 'veleno', 'volante'))"+\
        "check (tipo2 is Null or tipo1 != tipo2));"
    )


    print( "create table mossa ("+\
        	"id numeric primary key,"+\
    	    "nome varchar(20) not null,"+\
    	    "tipo varchar(12) not null,"+\
    	    "categoria varchar(10) not null,"+\
    	    "potenza numeric not null,"+\
    	    "precisione numeric not null,"+\
    	    "descrizione varchar(200) not null,"+\
            "check (potenza >= 0 and precisione  >= 0 and precisione <= 100),"+\
            "check (categoria in ('speciale','fisico')),"+\
    	    "check (tipo in ('acciaio', 'acqua', 'buio', 'coleottero', 'drago', 'elettro', 'erba', "+\
                            "'folletto', 'fuoco', 'ghiaccio', 'lotta', 'normale', 'psico', 'roccia', "+\
                            "'spettro', 'terra', 'veleno', 'volante'))"+\
            ");"
    )
    print("create table impara ("+\
        "pokemon numeric references pokemon(id),"+\
        "mossa numeric references mossa(id),"+\
        "primary key (pokemon,mossa)"+\
    ");"
    )

    print("create table utente ("+\
                        "username varchar(50) primary key,"+\
                        "password varchar(50)"+\
                    ");"
    )


    poke_dict = {}
    print("insert into pokemon values")
    with open("../assets/pokedex/info_pokemon.csv") as files:
        lis = files.readlines()
        for x in lis[1:]:
            if len(x) < 1:
                continue
            cur = x.strip().split(',')
            if x != lis[len(lis)-1]:
                if cur[3] != '':
                 print("({},'{}','{}','{}',{},{},{},{},{},{},{}),".format(
                        cur[0],cur[1],cur[2],cur[3],cur[4],cur[5],cur[6],cur[7],cur[8],cur[9],cur[10]))
                else:
                    print("({},'{}','{}',{},{},{},{},{},{},{},{}),".format(
                        cur[0],cur[1],cur[2],"Null",cur[4],cur[5],cur[6],cur[7],cur[8],cur[9],cur[10]))
            else:
                if cur[3] != '':
                 print("({},'{}','{}','{}',{},{},{},{},{},{},{});".format(
                        cur[0],cur[1],cur[2],cur[3],cur[4],cur[5],cur[6],cur[7],cur[8],cur[9],cur[10]))
                else:
                    print("({},'{}','{}',{},{},{},{},{},{},{},{});".format(
                        cur[0],cur[1],cur[2],"Null",cur[4],cur[5],cur[6],cur[7],cur[8],cur[9],cur[10]))
            poke_dict[cur[1]]=cur[0]

    print("insert into mossa values")
    with open("../assets/movedex/mosse.csv") as files:
        lis = files.readlines()
        for x in lis[1:]:
            if len(x) < 1:
                continue
            cur = x.strip().split(';')
            if x != lis[len(lis)-1]:
                print("({},'{}','{}','{}',{},{},'{}'),".format(
                        cur[0],cur[1].replace("'","\\'"),cur[2],cur[3],cur[4],cur[5],cur[6].replace("'","\\'")))
            else:
                print("({},'{}','{}','{}',{},{},'{}');".format(
                        cur[0],cur[1].replace("'","\\'"),cur[2],cur[3],cur[4],cur[5],cur[6].replace("'","\\'")))
    

    print("insert into impara values")
    lispoke = os.listdir("../assets/movedex/mosse_per_pokemon")
    for poke in lispoke:
        with open("../assets/movedex/mosse_per_pokemon/"+poke) as files:
            lis = files.readlines()
            for x in lis[1:]:
                if len(x) < 1:
                    continue
                cur = x.strip().split(';')
                pokemon = poke[:poke.index('.')]
                if x != lis[len(lis)-1] or poke != lispoke[len(lispoke)-1]:
                    print("({},{}),".format(
                        poke_dict[pokemon] ,cur[0] ))
                else:
                    print("({},{});".format(
                        poke_dict[pokemon] ,cur[0] ))


create_db()
#create_sql_file()