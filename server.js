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

app.post('/api/pullLeaderBoard', async (req, res, next) => {

    var error = '';
    const {gameId: game };

    const user = await db.collection('Users').find().toArray();

    switch (game) {
        case 1:
            break;
        case 2:
            break;
        case 3:
            user.sort((a, b) => a.TypingScore - b.TypingScore);
            break;
    }

    var top10 = user.slice(0, 10);

    var ret = {
        gameLeaders: top10,
        error: error
    }

});

app.post('/api/changeScore', async (req, res, next) =>{

    var error = '';
    var playerScore;
    const { _id: ID, GameScore: score, gameId: game } = req.body;

    var objId;
    var doBool = true;
    var intGame = game;
    if (ID != null)
        objId = new ObjectId(ID);

    playerScore = score;

    if (isNaN(playerScore)) {
        doBool = false;
        error = 'Score is not a number';
    }

    if (isNaN(intGame)) {
        doBool = false;
        error = 'Game is not a number id';
    }

    const db = client.db();

    if (!objId || !score) {
        error = 'Not enough information present to update';
        doBool = false;
    }

    const user = await db.collection('Users').find({ _id: objId }).toArray();
    var oldScore;
   

    if (user.length <= 0) {
        doBool = false;
        error = 'Could not find the user';
    }
    //Check the score and if it should update
    if (user.length > 0) {
        switch (intGame) {
            case 1:
                oldScore = user[0].ColorScore;
                break;
            case 2:
                oldScore = user[0].ReactionScore;
                break;
            case 3:
                oldScore = user[0].TypingScore;
                if (oldScore > score) {
                    doBool = false;
                    error = 'old score was better';
                }
                break;
    }
    }
   

    //ID: 1 - colorScore, 2 - reactionScore, 3 - TypingScore
    if (doBool) {
        switch (intGame) {
            case 1:
                await db.collection('Users').updateOne({ _id: objId }, { $set: { ColorScore: playerScore } });
                break;
            case 2:
                await db.collection('Users').updateOne({ _id: objId }, { $set: { ReactionScore: playerScore } });
                break;
            case 3:
                await db.collection('Users').updateOne({ _id: objId }, { $set: { TypingScore: playerScore } });
                break;
            default:
                error = 'Could not Find Game';
                doBool = false;
        }
        if(doBool)
            error = 'Successfully updated the score';
    }

    var ret = {
        id: objId,
        error: error,
        score: playerScore
    }
    res.status(200).json(ret);  
});


app.listen(5000);