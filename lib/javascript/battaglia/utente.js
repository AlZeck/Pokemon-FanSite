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
}
