const {MongoClient, ObjectId} = require('mongodb');
const bcrypt = require('bcryptjs');

const url = `mongodb+srv://abecc:tortilla@cluster0.mpjye.mongodb.net/myData?retryWrites=true&w=majority`;

const client =  new MongoClient(url);

const dbName = 'myData';

const db = client.db(dbName);

const userCollection = db.collection("users")
const dataCollection = db.collection("data")

const config = require('../config');
const fs = require('fs');

exports.home = (req, res) => {
    res.render('home' ,{
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

    console.log(req.body.password)
    
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);

    console.log(hash)

    let questions = [
        {question: req.body.q1, answer: req.body.a1},
        {question: req.body.q2, answer: req.body.a2},
        {question: req.body.q3, answer: req.body.a3}
    ]
    await client.connect();
    const addUser = userCollection.insertOne({
        username: req.body.username,
        password: req.body.password,
        questions: questions,
        saltHash: hash

    });

    res.redirect("/")
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
    const userResults = await userCollection.find({username: req.body.username}).toArray()
    client.close();
    if(userResults.length != 0){
        console.log(userResults)
        console.log(userResults[0].password)
        console.log(req.body.password)
        if(bcrypt.compareSync(req.body.password, userResults[0].saltHash)){
            res.render("dashboard",{
                title: "Dashboard",
                user: userResults
            })
        }else{
            res.redirect("login")
        }
    }else{
        res.redirect("login")
    }
}

exports.signUpAction = async (req, res) => {
    await client.connect();
    const addUser = client.insertOne({
        username: req.body.username,
        password: req.body.password,
        saltHash: req.body.hash
    });
    const userResults = userCollection.find({username: req.body.username});
    client.close();
    res.render("dashboard",{
        title: "Dashboard",
        user: userResults
    });
}

exports.dashboard = async (req, res) => {
    await client.connect();
    const userResult = await collection.findOne(req.body.username);
    client.close();
    //if(userResult.password == req.body.password == 'pass123') {
}

exports.changeAnswer = async (req, res) => {
    await client.connect();
    let questions = [
        {question: req.body.q1, answer: req.body.a1},
        {question: req.body.q2, answer: req.body.a2},
        {question: req.body.q3, answer: req.body.a3}
    ]
    const updateResult = await collection.updateOne(
        {username: user.username},
        { $set: {
            questions: questions
        }
    });
    client.close();
}

