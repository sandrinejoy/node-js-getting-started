//testing websockets
var HOST = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(HOST);
var el;

ws.onmessage = function (event) {
 console.log('Server time: ' + event.data);
};