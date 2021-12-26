# NodejsLabs

**这是一个非常基础的Node.js的web渗透靶场，该靶场使用Node.js+Angular，以前后端分离模式完成搭建，主要是为了帮助大家入门和了解Node.js的一些原生的特性和相关漏洞的产生原理，并不携带漏洞库。**

## Screenshot

**现已有6个Labs, 下面是部分演示界面：**

**Home/Overview**

![screenshot1](./image/screenshot1.png)

 **Lab1**

![screenshot2](./image/screenshot2.png)

**Lab3**

![screenshot2](./image/screenshot3.png)

## Install & Usage

**环境要求**

[Node.js](https://nodejs.org/en/download/)

`npm install -g @angular/cli`

[mongoDB](https://docs.mongodb.com/manual/administration/install-community/)

**安装**

`cd nodejs-vul-labs-main`

下载相应依赖: `npm i`

生成前端:`ng build` 

**使用：**

先启动mongoDB(默认为`mongodb://localhost:27017`)

**第一次运行需要初始化数据库:** `node init.js`

`node main.js`

访问：http://localhost:8888

## To Do

**因为作者也是边学习边编写，后续将逐渐添加新题。**

## Summary

| Lab名称               | 漏洞知识点             |
| --------------------- | ---------------------- |
| Lab 1：手机轰炸       | 命令执行               |
| Lab 2：会员内容       | NoSql注入攻击          |
| Lab 3：此Lab维护中    | JavaScript特性绕过     |
| Lab 4：代码之星评选   | JavaScript特性绕过     |
| Lab 5：加强版会员内容 | Javascript原型链污染   |
| Lab 6：加入网安小组   | HPP污染+nodejs特性绕过 |

**待续。**

