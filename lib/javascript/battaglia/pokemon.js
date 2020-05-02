//classe per l'oggetto Pokemon
class Pokemon {
    /*  PARAMETRI
        _id       : intero
        _nome     : stringa
        _tipo1    : stringa
        _tipo2    : stringa (può essere null)

        _ps       : intero
        _att      : intero
        _dif      : intero
        _atts     : intero
        _difs     : intero
        _vel      : intero

        _mossa1   : oggetto Mossa (può essere null)
        _mossa2   : oggetto Mossa (può essere null)
        _mossa3   : oggetto Mossa (può essere null)
        _mossa4   : oggetto Mossa (può essere null)
    */


    //costruttore
    constructor(id, nome, tipo1, tipo2, ps, att, dif, atts, difs, vel, mossa1, mossa2, mossa3, mossa4) {
        this._id = id;
        this._nome = nome;
        this._tipo1 = tipo1;
        this._tipo2 = tipo2;

        this._ps = ps;
        this._att = att;
        this._dif = dif;
        this._atts = atts;
        this._difs = difs;
        this._vel = vel;

        this._mossa1 = mossa1;
        this._mossa2 = mossa2;
        this._mossa3 = mossa3;
        this._mossa4 = mossa4;
    }


    //getter
    get id() { return this._id; }
    get nome() { return this._nome; }
    get tipo1() { return this._tipo1; }
    get tipo2() { return this._tipo2; }
    get ps() { return this._ps; }
    get att() { return this._att; }
    get dif() { return this._dif; }
    get atts() { return this._atts; }
    get difs() { return this._difs; }
    get vel() { return this._vel; }
    get mossa1() { return this._mossa1; }
    get mossa2() { return this._mossa2; }
    get mossa3() { return this._mossa3; }
    get mossa4() { return this._mossa4; }


    //setter
    set ps(x) { this._ps = x; }
    set mossa1(x) { this._mossa1 = x; }
    set mossa2(x) { this._mossa2 = x; }
    set mossa3(x) { this._mossa3 = x; }
    set mossa4(x) { this._mossa4 = x; }
}
