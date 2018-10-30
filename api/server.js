var express = require("express");
var mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName ='cake';

const app = express();

// 登录
app.get('/login',function (req,res){
    res.append("Access-Control-Allow-Origin", "*");
    // console.log(req.query.username,req.query.password);
   
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var whereStr = {
            "username":req.query.username,
            "password":req.query.password
        };  // 查询条件
        dbo.collection("user").find(whereStr).toArray(function(err, result) {
            if (err) throw err;
            console.log(666, result);
            if(result.length > 0){
                res.send({
                    "code":1,
                    'username': result[0].username,
                    "message":"登录成功"
                })
            }
            else{
                res.send({
                    "code":0,
                    "message":"密码或用户错误"
                })
            }
            db.close();
        });
        
    });
})
// 注册
app.get('/reg',function (req,res){
    res.append("Access-Control-Allow-Origin", "*");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var myobj = {
            phone:req.query.phone,
            username:req.query.username,
            password:req.query.password
        };
        dbo.collection("user").find({username: req.query.username}).toArray(function(err, result) {
            if (err) throw err;
            // 判断有没有该用户名
            if(result.length > 0){
                res.send({
                    "code":0,
                    "message":"用户已存在！"
                })
            }
            else{
                // 插入数据库
                dbo.collection("user").insertOne(myobj, function(inerr, inresult) {
                    if (inerr) throw inerr;
                    if(inresult.result.ok === 1){
                        res.send({
                            "code":1,
                            "message":"注册成功"
                        })
                    }
                    else{
                        res.send({
                            "code":0,
                            "message":"failed"
                        })
                    }
                    db.close();
                });
            }
        });
    });
})

// 查询商品列表
app.get('/goodslist',function (req, res){
    // 跨域请求
    res.append("Access-Control-Allow-Origin", "*");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var whereStr
        if(req.query.id){
            whereStr = {
                "_id" :  mongoose.Types.ObjectId(req.query.id) //用了转成MongoDB ID格式

            };  // 查询条件
        }else{
            whereStr = {"goodsid":req.query.goodsid}
        }
        dbo.collection("goods").find(whereStr).toArray(function(err, result) {
            if (err) throw err;
            // var results = JSON.stringify(result)
            if(result.length > 0){
                res.send({
                    "code":1,
                    "data":result,
                    "message":"success"
                })

            }
            else{
                res.send({
                    "code":0,
                    "message":"failed"
                })
            }
            db.close();
        });
        
    });
    
})

// 查询购物车
app.get('/buycar',function (req, res){
    // 跨域请求
    res.append("Access-Control-Allow-Origin", "*");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var whereStr = {
            "username":req.query.username
        };  // 查询条件
        dbo.collection("buycar").find(whereStr).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            // var results = JSON.stringify(result)
            if(result.length > 0){
                res.send({
                    "code":1,
                    "data":result,
                    "message":"success"
                })

            }
            else{
                res.send({
                    "code":0,
                    "message":"failed"
                })
            }
            db.close();
        });
        
    });
    // res.send('123')
})

// 加入购物车
app.get('/addbuycar',function (req,res){
    res.append("Access-Control-Allow-Origin", "*");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var myobj = {
            bigimg: req.query.bigimg,
            number: req.query.number,
            size: req.query.size,
            title: req.query.title,
            name: req.query.name,
            price: req.query.price,
            username: req.query.username
        };
        // 操作之前先查询数据库
        dbo.collection("buycar").find({name: req.query.name, username: req.query.username}).toArray(function(err, result) {
            if (err) throw err;
            // 判断购物车有没有该商品
            if(result.length > 0){
                // 更新
                var whereStr = {
                    name: req.query.name,
                    username: req.query.username
                }; // 查询条件
                var updateStr = {$set: {number: req.query.number*1 + result[0].number*1}};
                dbo.collection("buycar").updateOne(whereStr, updateStr, function(uperr, upres) {
                    console.log(upres)
                    if (uperr) throw uperr;
                    if(upres.result.ok === 1){
                        res.send({
                            "code":1,
                            "message":"success"
                        })
                    }
                    else{
                        res.send({
                            "code":0,
                            "message":"failed"
                        })
                    }
                    db.close();
                });
            }
            else{
                // 插入数据库
                dbo.collection("buycar").insertOne(myobj, function(inerr, inresult) {
                    if (inerr) throw inerr;
                    if(inresult.result.ok === 1){
                        res.send({
                            "code":1,
                            "message":"success"
                        })
                    }
                    else{
                        res.send({
                            "code":0,
                            "message":"failed"
                        })
                    }
                    db.close();
                });
            }
        });
    });
})

// 删除一条购物车
app.get('/deletebuycar',function (req, res){
    // 跨域请求
    res.append("Access-Control-Allow-Origin", "*");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var whereStr
        if(req.query.id){
            whereStr = {
                "_id" :  mongoose.Types.ObjectId(req.query.id), //用了转成MongoDB ID格式
                "username" : req.query.username
            };  // 查询条件
        }
        dbo.collection("buycar").deleteOne(whereStr, function(err, obj) {
            if (err) throw err;
            console.log("删除购物车成功");
            db.close();
        });
    });

})
// 全删购物车数据
app.get('/alldel',function (req,res){
    // 跨域请求
    res.append("Access-Control-Allow-Origin", "*");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var whereStr = {
            username: req.query.username
        };  // 查询条件
        dbo.collection("buycar").deleteMany(whereStr, function(err, obj) {
            if (err) throw err;
            if(obj.result.ok === 1){
                res.send({
                    "code":1,
                    "message":"success"
                })
            }
            else{
                res.send({
                    "code":0,
                    "message":"failed"
                })
            }
            db.close();
        });
    });
})

// 更新购物车商品数量
app.get('/updatebuycar',function (req,res){
    res.append("Access-Control-Allow-Origin", "*");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        // 更新
        var whereStr = {
            "_id" :  mongoose.Types.ObjectId(req.query._id),
            "username" : req.query.username
        }; // 查询条件
        var updateStr = {$set: {number: req.query.number}};
        dbo.collection("buycar").updateOne(whereStr, updateStr, function(uperr, upres) {
            if (uperr) throw uperr;
            if(upres.result.ok === 1){
                res.send({
                    "code":1,
                    "message":"success"
                })
            }
            else{
                res.send({
                    "code":0,
                    "message":"failed"
                })
            }
            db.close();
        });
    });
})

app.listen(2222);