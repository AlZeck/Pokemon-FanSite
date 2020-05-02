//classe per l'oggetto Mossa
class Mossa {
    /*  PARAMETRI
        _id         :   intero
        _nome       :   stringa
        _tipo       :   stringa

        _potenza    :   intero
        _precisione :   intero
        _categoria  :   stringa
    */


    //costruttore
    constructor(id, nome, tipo, potenza, precisione, categoria) {
        this._id = id;
        this._nome = nome;
        this._tipo = tipo;

        this._potenza = potenza;
        this._precisione = precisione;
        this._categoria = categoria;
    }


    //getter
    get id() { return this._id; }
    get nome() { return this._nome; }
    get tipo() { return this._tipo; }
    get potenza() { return this._potenza; }
    get precisione() { return this._precisione; }
    get categoria() { return this._categoria; }
}
