const { exec } = require('child_process');
const express = require('express');
fs = require('fs');
const app=express();
app.use(express.static('dist/nodejsLabs'));//
app.use(express.urlencoded({extended:true}));
app.use(express.json());
let server = require('http').Server(app);//Create an http server using express app

let expressSession = require('express-session');
let passport = require('./login/passport');
app.use(expressSession({
    secret: 'leihehe',
    resave: true,
    saveUninitialized: true
}));
// Initilize passport

let names={"Richard":2995,"John":8011,"Bob":5,"Tim":5390};

app.use(passport.initialize());
app.use(passport.session());
let mongoose = require('mongoose');
const User=require('./models/user');
const Code=require('./models/code');
let url = "mongodb://localhost:27017/nodejsLabs";
mongoose.connect(url,function(err){
  if(err){
      console.log('Error in mongoose connection');
      throw err;
  }
  console.log('Connection established');
})

/* LOGIN PART */

app.get('/authenticate',passport.authenticateMiddleware(), (req, res) => {
  res.status(200).json({"statusCode" : 200 ,"message" : "hello"});
});

app.post('/login', passport.authenticate('local.login'), function (req, res) {
    let returnData = {
      isSuccess: true,
      user: req.user
    };
    
    res.send(JSON.stringify(returnData));
});
  
app.post('/signup',passport.authenticate('local.signup'),function(req, res) {
    res.status(200).json();
})

app.get('/logout', function(req, res){
    req.logout();
    res.json();
  });




/* SOCKET PART */
let io = require("socket.io")(server);


io.on('connection',function(socket){

/* Lab 1 */
    
    socket.on('lab1', function(data){
      
      let bomber=exec('python -u ./test.py -n '+data,function(err,data){
          if(err) socket.emit('bombStatus',"Some error occurred.");
      })
      bomber.stdout.on('data', function(data) {
          socket.emit('bombStatus',data)
      });  
    })


    
/* Lab 2 */
    socket.on('unlock', function(data){
//Code collection consists of _id, username, code，which would be added by the administrator manually.
      if(Object.keys(data).length === 0){
        socket.emit("vipContent","Invalid activation code");
      }else{
        Code.findOne(data,'vipCode',function (err,result){//In the Code collection, users can not be found unless the administrator manually added the username and vipCode.
          if(err) socket.emit('vipContent',"Some error occured");
          else if(result!=null){
            User.findOneAndUpdate({username:data.username},{vip:true},function (err,fUser){
              if(err) socket.emit('vipContent',"Some error occured");
              socket.emit('vipContent',"The flag is ufnskaknv123ff2. Congratulations!");
            })
          }else{
            socket.emit('vipContent',"Invalid activation code，please contact the host to purchase the activation code");
          }
        })
      }

    })



/* Lab 3 */

    socket.on('lab3', function(data){
      let announcement= {
        "content":"The website is temporarily closed, more features are being developed",
        "backupSecret":"5oGt5Zac5L2g77yB5om+5Yiw5LqG56ys5LiJ5YWz55qEZmxhZzogcXdkZDEyZ2RoNTI2MzEyYTNzYw=="//For convinence, I encrypted the previous content. I will change it back after the maintainance.
      }
      let backlist=['backupSecret'];
      if(backlist.includes(data)){
        socket.emit('announcement',"Illegal operation detected. Your IP has been logged");//check blacklist, scare them.
      }else if(announcement[data]!=null){
        socket.emit('announcement',announcement[data]);
      }else{
        socket.emit('announcement',"Some error occurred.");
      }
      
    })

/* Lab 4 */
    socket.on('lab4',function(data){
      //Send the number of tickets
      let target = data.username;
      let p=data.ticket;
      if(p<2&&p>0){
        names[target]=names[target]+p;
        io.sockets.emit('results',names)
      }else{
        //非法数据
        socket.emit('results',names)
      }
    })
    io.sockets.emit('results',names);

/* Lab 5 */
socket.on('unlockLab5', function(data){
//Code collection consists of _id, username, code，which would be added by the administrator manually.
        if(Object.keys(data).length === 0){
          socket.emit("vipContent","Invalid activation code.");
        }else{
          Code.findOne({username:String(data.username),vipCode:String(data.vipCode)},'vipCode',function (err,result){//In the Code collection, users can not be found unless the administrator manually added the username and vipCode.
            if(err) socket.emit('vipContent',"Some error occured.");
            else if(result!=null){
              User.findOneAndUpdate({username:data.username},{vip:true},function (err,data){
                if(err) socket.emit('vipContent',"Some error occured.");
                
                socket.emit('vipContent',"Success");
              })
            }else{
              let Log={"Event":"You cannot access the premium content，please contact the host to purchase the activation code！","Time":Date.now()};
              //You can add any attributes into the Log{} , and the front end will fetch and present it.
              merge(Log,data);
              socket.emit('vipContent',Log);
            }
          })
        }
  
      })
  socket.on('checkVIP', function(data){

    User.findOne({username:JSON.parse(data).user.username, vip:true},function (err,result){
      if(err){
        socket.emit('vipContent',"Some error occurred.");
        result={};
      } 
      if(result!=null){
        if(result.vip==true){
          socket.emit('vipContent',"The flag is ufnskaknv123ff2. Congratulations!");
        }else{
          socket.emit('vipContent',"You are not allowed to access the content")
        }
      }else{
        socket.emit('vipContent',"You are not allowed to access the content")
      }

    })

  })
      


})
/* Lab 6 */
app.get('/lab6',function(req,res){
  var flag = 'Congratulations, you are invted to join our Cybersecurity Team.';
  if(req.url.match(/7B|7D|2C|\,/ig)){
    res.send("Incorrect answer.");
  }else{
    if(req.query.ck.name==='admin'&&req.query.ck.anwser==='niceGame'){
      res.send(flag);
    }else{
      res.send("Incorrect answer.");
    }
  }

})

app.get("/initial",function(req,res){
  User.deleteMany({},function(err){
    if(err) res.json({"msg":"Database initialization failed. Please check whether the database is connected"});
    Code.deleteMany({},function(err){
      if(err) res.json({"msg":"Database initialization failed. Please check whether the database is connected"});
        let newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          username: "admin",
          password: "admin123123"
        });
        let newCodes=new Code({
          _id: new mongoose.Types.ObjectId(),
          username:"admin",
          vipCode:"wqhduqwodnj13"
        })
        newUser.save(function(err){
            if(err) res.json({"msg":"Database initialization failed. Please check whether the database is connected"});
            console.log('new user created');
            newCodes.save(function(err){
              if(err) res.json({"msg":"Database initialization failed. Please check whether the database is connected"});
              console.log('VIP table created');
              console.log('Database initialization completed');
              res.json({"msg":"Database initialization completed!"});
          })
        })
    })
})
  
})

function merge(target,source) {
  for (let key in source){
      if (key in source && key in target){
          merge(target[key],source[key]);
      }else {
          target[key]=source[key];
      }
  }}






server.listen(8888,function(){
    console.log('listening on port 8888!')
})