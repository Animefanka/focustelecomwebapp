const express = require('express');
const Dialer = require('dialer').Dialer;
const bodyParser = require('body-parser');
var app=express();
var url='https://uni-call.fcc-online.pl';
var _bridge = null;
const server = require('http').Server(app);
const io=require('socket.io')(server);

//Dialer.configure({login:"focus39",password:"8dhjsmsh5m",url:"http//uni-call.fcc-online.pl"})


app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,Content-Type,Accept");
    next();
});
app.use(bodyParser.text());
app.use(bodyParser.json());
server.listen(3000,function(){
    console.log('Sitecall app listening on port 3000!');
});

io.on('connection',function(socket){
    console.log('socket connected');
})

app.post('/call',async function (req,res){
    let data=req.body;
    _bridge = await Dialer.call(data.first_number,data.second_number);
    let status = await _bridge.getStatus();
    io.emit('status',{id:'123',status:status});
    currentStatus(_bridge);
    res.json({id:'123',status: _bridge.STATUSES.NEW});
});

app.get('/status',async function (req,res){
    if(_bridge){
    let status = await _bridge.getStatus();
    res.json({id:'123',"status":status});}
})

function currentStatus(_bridge){
    let status=null;
    let intervalId=setInterval(async()=>{
        let currentStatus = await _bridge.getStatus();
        if(status!==currentStatus){
            status=currentStatus;
        io.emit('status',{id:'123',status:status});
        }
        if(!!~["FAILED","ANSWERED"].indexOf(status)){
            clearInterval(intervalId)
        }
    },200);
}