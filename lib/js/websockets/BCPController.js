// Battle Commnunication Protocol Controller 

class BCPController {

    /**
     * Creates a new websocket to communicate with server 
     * @param {string} username 
     * @param {string} team 
     * @param {function} msgreceiver 
     */
    constructor(username, team, msgreceiver) {
        var x =  new WebSocket('ws://localhost:8080');
        this.conn = x
        this.conn.onopen = function (e) {
            console.log("Connection established!");
            var toSend = { type: "new", value: { sender : username, team : team } };
            x.send(JSON.stringify(toSend));
            console.log("sending " + JSON.stringify(toSend));
        };
        this.conn.onmessage = function (e) {
            console.log(e.data);
            msgreceiver(e);
        }
    }

    /**
     * 
     * 
     * @param {string} type 
     * @param {string} value 
     */
    send (type, value) {
        var toSend = { type: type, value: value};
        this.conn.send(JSON.stringify(toSend));
        console.log("sending " + JSON.stringify(toSend));
    }
    // TODO create more wrappers
}
