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

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let d = new Date();
let month = months[d.getMonth()];
let day = d.getDate();
let year = d.getFullYear();
let visited = 0;
let myString = `${month} ${day}, ${year}`;

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
        {question: 'What is you favourite food?', answer: req.body.q1},
        {question: 'Which mascot do you prefer?', answer: req.body.q2},
        {question: 'How many languages do you know?', answer: req.body.q3}
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

    console.log(userResults)
    console.log(userResults[0].password)
    console.log(req.body.password)



    if(bcrypt.compareSync(req.body.password, userResults[0].saltHash)){
        if(req.cookies.beenHereBefore == 'yes') {
            visited++;
            res.cookie('visited', visited, {maxAge: 9999999999});
            let myString = `${month} ${day}, ${year}`;
            res.cookie('stuff', myString, {maxAge: 9999999999});
            res.render("dashboard",{
                title: "Dashboard",
                user: userResults,
                
                data: `Welcome back. Last time you were on this site: ${req.cookies.stuff}. `
            });
        }
        else {
            res.cookie('beenHereBefore', 'yes', {maxAge: 9999999999});
            visited = 1;
            res.cookie('visited', visited, {maxAge: 9999999999});
            res.cookie('stuff', myString, {maxAge: 9999999999});
            res.render("dashboard",{
                title: "Dashboard",
                user: userResults,
                data: "Welcome new user!"
            });
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
        user: userResults,
        data: "Welcome new user!"
    });
}

exports.dashboard = async (req, res) => {
    await client.connect();
    const userResult = await collection.findOne(req.body._id);
    client.close();
    //if(userResult.password == req.body.password == 'pass123') {
}

exports.changeAnswer = async (req, res) => {
    await client.connect();
    console.log("changeAnswer reached")
    console.log(req)
    
    console.log(req.body.question1)

    let questions = [
        {question: 'What is you favourite food?', answer: req.body.q1},
        {question: 'Which mascot do you prefer?', answer: req.body.q2},
        {question: 'How many languages do you know?', answer: req.body.q3}
    ]
    const updateResult = await userCollection.updateOne(
        {_id: ObjectId(req.params.id)},
        { $set: {
            questions: questions
        }
    });
    client.close();
    res.redirect("/");
}

exports.api = async (req,res) => {
    await client.connect();
    collection.find(
        {
            questions:
            {
                
            }
        })

}