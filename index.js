const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
var session = require('express-session');
var ssn;
const PORT = process.env.PORT || 5000


const server=express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(session({secret:'sandrinqwerty',resave: true,
  saveUninitialized: true}))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/proctored', (req, res) => res.render('pages/proctored'))
  .post('/room',(req,res)=>{

  })
  .post('/userauth',(req,res)=>{
    ssn=req.session;
    ssn.email = req.body.email;
    ssn.name = req.body.name;
    ssn.verified = req.body.verified;
    ssn.uid = req.body.uid;
    ssn.photourl = req.body.photourl;
    res.send({'cuser':ssn});

  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))



//for websockets
const { Server } = require('ws');
const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);
