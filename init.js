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
  console.log('这是数据库初始化信息');
  User.deleteMany({},function(err){
      if(err) throw err;
      Code.deleteMany({},function(err){
          if(err) throw err;
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
              if(err) throw err;
              console.log('新用户创建完毕');
              newCodes.save(function(err){
                if(err) throw err;
                console.log('VIP库创建完毕');
                console.log('数据库初始化完成');
                process.exit();
            })
          })
      })
  })

})
