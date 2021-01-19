const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const https = require("https");
const fs = require("fs");
const WebSocket = require("ws");
const MongoClient = require("mongodb").MongoClient;
const Connection = require("./lib/connections/connection.js");
const GLOBAL_PARAM = require("./lib/global_param.js");

// http sever
var http_server = http.createServer(app);


/**
 * 配置使用 session
 */

app.use(session({
  secret: 'victor', //配置加密字符串
  resave: true,
  saveUninitialized: true, // 无论是否使用 Session，都会默认分配一把钥匙
}));


//配置post请求
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//设置跨域访问
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin",GLOBAL_PARAM.HOST_NAME);
    //允许的header类型
    res.header("Access-Control-Allow-Headers","Content-Type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS,PATCH");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Content-Type", "application/x-www-form-urlencoded");
    res.header("Set-Cookie", "SameSite=None; Secure");
    if (req.method.toLowerCase() == 'options')
        res.sendStatus(200);  //让options尝试请求快速结束
    else
        next();
})

// 建立 websocket 连接
var ws = new WebSocket("ws://www.anbotcloud.com:8180/anbotwebsocket/1b8f1ebd1c88431a9a1f3b6d23229655/1.0.0", {perMessageDeflate: false});

// 接受服务端发来的数据
ws.on("message", function incoming(data) {

    if (data != "ping"){

        var JsObj = JSON.parse(data);

        Promise
            .resolve()
            .then(()=>{
                console.log(JsObj.function);
                switch(JsObj.function){
                    case "statusReport":
                        return Connection.updateRobotStatus(JsObj.param);
                        break;
                    case "loginMainServer":
                        return Connection.updateRobotOnlineOfflineStatus(JsObj);
                        break;
                    case "robotOffline":
                        return Connection.updateRobotOnlineOfflineStatus(JsObj);
                        break;
                    case "personReport": 
                        break;
                    case "plateReport":
                        break;

                }
            });

        // // 和本地 mongo 建立连接，并将获取的数据转换为 JSON 并存入 robots 中。
        // MongoClient.connect('mongodb://localhost/robot', (err, client)=>{
        //     if (err) throw err;

        //     var db = client.db('robot');

        //     db.collection('robots').insert(JsObj, (err, records)=>{
        //         if (err) throw err;

        //         console.log("存储了一条数据");
        //     });
        // });

    } else {
        ws.send("pong");
        console.log("回复了一条 pong");
    }

});




app.get('/', (req, res, next) => {
	res.send("Server Starting at port: 3002");
})



http_server.listen(3002, () =>{
	console.log('App is running at port 3002.')

})