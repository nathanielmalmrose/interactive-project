const {MongoClient, ObjectId} = require('mongodb');

const url = `mongodb+srv://abecc:tortilla@cluster0.mpjye.mongodb.net/myData?retryWrites=true&w=majority`;

const client =  new MongoClient(url);

const dbName = 'myData';

const db = client.db(dbName);

const userCollection = db.collection("users")
const dataCollection = db.collection("data")

const config = require('../config');
const fs = require('fs');

exports.home = (req, res) => {
    response.render('home' ,{
        config: config,
        title: "Home Page"
    });
}

exports.getData = async (req, res) => {
    await client.connect()
    const userResult = await dataCollection.findOne(ObjectId(req.params.id))
    client.close()
    res.render('home',{
        title: "Homepage",
        user: userResult
    })
}

exports.getAllData = async (req, res) =>{
    await client.connect()
    const dataResult = await dataCollection.find({})
    client.close()
    res.render("dashboard",{
        title: "Dashboard",
        data: dataResult
    })
}

exports.getLimitData = async (req, res) => {
    await client.connect()
    const dataResult = await dataCollection.find({}).limit(req.body.limit).toArray()
    client.close()
    res.render("dashboard",{
        title:"Dashboard",
        data: dataResult
    })
}

exports.addUser = async (req, res) =>{
    await client.connect();
    const addUser = client.insertOne({
        username: req.body.username,
        pass: req.body.pass,
        saltHash: req.body.hash
    });
}

exports.signUp = (request, response) => {
    response.render('signup', {
        config: config,
        title: "Sign Up"
    });
}

exports.logIn = (request, response) => {
    response.render('login', {
        config: config,
        title: "Log In"
    });
}

exports.logInAction = async (req, res) => {
    await client.connect();
    const userResults = userCollection.find({username: req.body.username})
    client.close();
    if(userResults.pass == req.body.pass){
        res.render("dashboard",{
            title: "Dashboard",
            user: userResults
        })
    }else{
        res.redirect("/login")
    }
}


