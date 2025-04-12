const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//silly update line
const MongoClient = require('mongodb').MongoClient;
const url='mongodb+srv://christopherjparrett:LSNTxt8JgrjqOCEM@cluster0.mfdvieh.mongodb.net/COP4331?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(url);
client.connect();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => 
{
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
app.post('/api/login', async (req, res, next) => 
{
  var error = '';

  const { login, password } = req.body;

  const db = client.db();
  const results = await db.collection('Users').find({Login:login, Password:password}).toArray();

  var id = -1, name = "";

  if(results.length >= 0){
    id = results[0].UserId;
    name = results[0].Name;
  }

  var ret = { id:id, Name:name, error:error};
  res.status(200).json(ret);
});

// incoming: login, password
// outgoing: id, firstName, lastName, error
app.post('/api/register', async (req, res, next) => 
{
  var error = '';
  var newId = -1;

    var score = -1;

  const { login, password, name} = req.body;

  if (!login || !password || !name)
  { 
    error = 'All fields are required';
  }

  const db = client.db();
  const user = await db.collection('Users').find({Login:login}).toArray();

  if(user.length > 0){
    error = "User already exist!";
  }
  else {
      newId = 0;
    const result = await db.collection('Users').insertOne({
      Login:login, Password:password,
      Name: name, ColorScore: score, ReactionScore: score, TypingScore: score, UserId: newId
    });
  }
 
  var ret = 
  {
    id:newId,
    Name:name,
    error:error
  };

  res.status(200).json(ret);
});

app.listen(5000);