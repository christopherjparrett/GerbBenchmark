const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//silly update line
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb+srv://christopherjparrett:LSNTxt8JgrjqOCEM@cluster0.mfdvieh.mongodb.net/COP4331?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(url);
client.connect();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

// incoming: login, password
// outgoing: id, firstName, lastName, error
app.post('/api/login', async (req, res, next) => {
    var error = '';

    const { login, password } = req.body;

    const db = client.db();
    const results = await db.collection('Users').find({ Login: login, Password: password }).toArray();

    var id, name = "";

    if (results.length > 0) {
        id = results[0]._id;
        name = results[0].Name;
    }
    else {
        error = 'The User was not Found';
    }

    var ret = { id: id, Name: name, error: error };
    res.status(200).json(ret);
});

// incoming: login, password
// outgoing: id, firstName, lastName, error
app.post('/api/register', async (req, res, next) => {
    var error = '';
    var newId;

    var score = -1;

    var doBool = true;

    const { login, password, name } = req.body;

    if (!login || !password || !name) {
        error = 'All fields are required';
        doBool = false;
    }

    const db = client.db();
    const user = await db.collection('Users').find({ Login: login }).toArray();

    if (user.length > 0) {
        error = "User already exist!";
    }
    else if (doBool) {
        const result = await db.collection('Users').insertOne({
            Login: login, Password: password,
            Name: name, ColorScore: score, ReactionScore: score, TypingScore: score
        });
        const userForId = await db.collection('Users').find({ Login: login, Password: password }).toArray();
        newId = userForId[0]._id;
    }

    var ret =
    {
        id: newId,
        Name: name,
        error: error
    };

    res.status(200).json(ret);
});

app.post('/api/deleteUser', async (req, res, next) => {
    var error = '';
    var doBool = true;

    var objId;
    var isDeleted = false;

    const db = client.db();

    const { _id: ID } = req.body;

    if (ID != null)
        objId = new ObjectId(ID);

    if (!objId) {
        error = 'Not enough information present to delete';
        doBool = false;
    }
    else {
        const user = await db.collection('Users').find({ _id: objId }).toArray();
        if (user.length <= 0) {
            error = 'User could not be found!';
            doBool = false;
        }
        else {
            oldId = user[0]._id;
        }
    }

    if (doBool) {
        await db.collection('Users').deleteOne({ _id: objId });
        error = 'deleted the user';
        isDeleted = true;
    }

    var ret = {
        id: objId,
        error: error,
        boolStatus: isDeleted
    }
    res.status(200).json(ret);
});

app.post('/api/colorScore', async (req, res, next) =>{

    var error = '';
    var score;
    const { _id: ID, ColorScore: score } = req.body;

    var objId;
    var doBool = true;

    if (ID != null)
        objId = new ObjectId(ID);

    const db = client.db();

    if (!objId || !score) {
        error = 'Not enough information present to update';
        doBool = false;
    }

    const user = await db.collection('Users').find({ _id: objId }).toArray();

    if (user.length <= 0) {
        doBool = false;
        error = 'Could not find the user';
    }

    if (doBool) {
        await db.collection('Users').updateOne({ _id: objId }, { $set: { ColorScore: score } });
        error = 'Successfully updated the score';
    }

    var ret = {
        id: objId,
        error: error,
        score: score
    }
    res.status(200).json(ret);  
});


app.listen(5000);