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
// 初始化调用 passport

let names={"Richard":2995,"John":8011,"Rosemary":5,"Tim":5390};

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
          if(err) socket.emit('bombStatus',"发生了点错误");
      })
      bomber.stdout.on('data', function(data) {
          socket.emit('bombStatus',data)
      });  
    })


    
/* Lab 2 */
    socket.on('unlock', function(data){
//Code collection由三个部分组成：_id, username, code，由管理员手动添加
      if(Object.keys(data).length === 0){
        socket.emit("vipContent","激活码错误！");
      }else{
        Code.findOne(data,'vipCode',function (err,result){//数据库中的Code collection里，除非管理员手动添加username和vipCode，用户是不能被找到的。
          if(err) socket.emit('vipContent',"发生了点错误");
          else if(result!=null){
            User.findOneAndUpdate({username:data.username},{vip:true},function (err,data){
              if(err) socket.emit('vipContent',"发生了点错误");
              
              socket.emit('vipContent',"激活成功");
            })
          }else{
            socket.emit('vipContent',"激活码错误，请联系站长购买VIP激活码");
          }
        })
      }

    })

    socket.on('checkVIP', function(data){

      User.findOne({username:JSON.parse(data).user.username, vip:true},function (err,result){
        if(err){
          socket.emit('vipContent',"发生了点错误");
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

/* Lab 3 */

    socket.on('lab3', function(data){
      let announcement= {
        "content":"此栏暂时关闭，更多功能正在开发中",
        "backupSecret":"5oGt5Zac5L2g77yB5om+5Yiw5LqG56ys5LiJ5YWz55qEZmxhZzogcXdkZDEyZ2RoNTI2MzEyYTNzYw=="//为了方便，我把之前lab3的内容用加密了，等到时候开发好以后再搬过来。
      }
      let backlist=['backupSecret'];
      if(backlist.includes(data)){
        socket.emit('announcement',"检测到非法入侵，你的IP已被记录");//检测到黑名单，吓唬一下
      }else if(announcement[data]!=null){
        socket.emit('announcement',announcement[data]);
      }else{
        socket.emit('announcement',"发生了点错误");
      }
      
    })

/* Lab 4 */
    socket.on('lab4',function(data){
      //发送你的票数
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
  //Code collection由三个部分组成：_id, username, code，由管理员手动添加
        if(Object.keys(data).length === 0){
          socket.emit("vipContent","激活码错误！");
        }else{
          Code.findOne({username:String(data.username),vipCode:String(data.vipCode)},'vipCode',function (err,result){//数据库中的Code collection里，除非管理员手动添加username和vipCode，用户是不能被找到的。
            if(err) socket.emit('vipContent',"发生了点错误");
            else if(result!=null){
              User.findOneAndUpdate({username:data.username},{vip:true},function (err,data){
                if(err) socket.emit('vipContent',"发生了点错误");
                
                socket.emit('vipContent',"激活成功");
              })
            }else{
              let Log={"Event":"查看会员内容失败，激活码错误，请联系站长购买VIP激活码！","Time":Date.now()};
              //Log{}中可以可以加上任意自定义的attribute,在前端可以对应更新获取数据
              merge(Log,data);
              socket.emit('vipContent',Log);
            }
          })
        }
  
      })


})
/* Lab 6 */
app.get('/lab6',function(req,res){
  var flag = '恭喜你，回答成员，您正式受邀成为公司网安小组成员！';
  if(req.url.match(/7B|7D|2C|\,/ig)){
    res.send("回答错误！");
  }else{
    if(req.query.ck.name==='admin'&&req.query.ck.anwser==='niceGame'){
      res.send(flag);
    }else{
      res.send("回答错误！");
    }
  }

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