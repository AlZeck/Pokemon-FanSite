//classe per l'oggetto Utente
class Utente {
    /*  PARAMETRI
        _username   : stringa

        _pkm1       : oggetto Pokemon (può essere null)
        _pkm2       : oggetto Pokemon (può essere null)
        _pkm3       : oggetto Pokemon (può essere null)
        _pkm4       : oggetto Pokemon (può essere null)
        _pkm5       : oggetto Pokemon (può essere null)
        _pkm5       : oggetto Pokemon (può essere null)
    */


    //costruttore
    constructor(username, pkm1, pkm2, pkm3, pkm4, pkm5, pkm6) {
        this._username = username;

        this._pkm1 = pkm1;
        this._pkm2 = pkm2;
        this._pkm3 = pkm3;
        this._pkm4 = pkm4;
        this._pkm5 = pkm5;
        this._pkm6 = pkm6;
    }


    //getter
    get username() { return this._username; }
    get pkm1() { return this._pkm1; }
    get pkm2() { return this._pkm2; }
    get pkm3() { return this._pkm3; }
    get pkm4() { return this._pkm4; }
    get pkm5() { return this._pkm5; }
    get pkm6() { return this._pkm6; }


    //setter
    set pkm1(x) { this._pkm1 = x; }
    set pkm2(x) { this._pkm2 = x; }
    set pkm3(x) { this._pkm3 = x; }
    set pkm4(x) { this._pkm4 = x; }
    set pkm5(x) { this._pkm5 = x; }
    set pkm6(x) { this._pkm6 = x; }


    //funzione per restituire il pokemon richiesto dell'utente (o null)
    dammiPokemon(id) {
        if(this.pkm1 != null && this.pkm1.id == id) return this.pkm1;
        else if(this.pkm2 != null && this.pkm2.id == id) return this.pkm2;
        else if(this.pkm3 != null && this.pkm3.id == id) return this.pkm3;
        else if(this.pkm4 != null && this.pkm4.id == id) return this.pkm4;
        else if(this.pkm5 != null && this.pkm5.id == id) return this.pkm5;
        else if(this.pkm6 != null && this.pkm6.id == id) return this.pkm6;
        else return null;
    }


    //funzione per inserire il pokemon richiesto
    settaPokemon(id) {
        //salvo in P l'oggetto pokemon
        P;

        if(this.pkm1 == null) this.pkm1 = P;
        else if(this.pkm2 == null) this.pkm2 = P;
        else if(this.pkm3 == null) this.pkm3 = P;
        else if(this.pkm4 == null) this.pkm4 = P;
        else if(this.pkm5 == null) this.pkm5 = P;
        else if(this.pkm6 == null) this.pkm6 = P;
    }
}
