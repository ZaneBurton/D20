import SourceMapSupport from 'source-map-support';
SourceMapSupport.install();
import 'babel-polyfill';

import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient, ObjectId } from 'mongodb';
import Issue from './issue.js';

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

let db;
// routes will go here
app.post('/api/signup', (req, response) => {
			var e = req.body.email;
			var p = req.body.password;
			console.log("Here");

				var myobj = { email: e, password: p };
				db.collection("users").insertOne(myobj, function(err, res) {
					if (err){
						throw err;
						response.send("Failed to add user");
					} 
					console.log("1 document inserted");
					response.send("Added user");
				})
});

app.post('/api/login/', (req, response) => {
		var e = req.body.email;
		var p = req.body.password;
		var url = "mongodb://localhost:27017/";
		var query = { email: e };
		console.log(e);
		db.collection("users").find(query).toArray(function(err, result) {
				if (err){
					throw err;
					response.send('Failed');
				}
				//console.log(result);
				if(result.length > 0) {
					if(result[0].password == p) {
						response.send("Success " + result[0].email);
					}
					else{
						console.log("Error. Passwords do not match.");
					}

				}
				else{
					console.log("Email does not exist");
				}
			//db.close();
		});	
});
		

app.get('/api/issues', (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.effort_lte || req.query.effort_gte) filter.effort = {};
  if (req.query.effort_lte) filter.effort.$lte = parseInt(req.query.effort_lte, 10);
  if (req.query.effort_gte) filter.effort.$gte = parseInt(req.query.effort_gte, 10);

  db.collection('issues').find(filter).toArray()
  .then(issues => {
    const metadata = { total_count: issues.length };
    res.json({ _metadata: metadata, records: issues });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

app.post('/api/issues', (req, res) => {
  const newIssue = req.body;
  newIssue.created = new Date();
  if (!newIssue.status) {
    newIssue.status = 'New';
  }

  const err = Issue.validateIssue(newIssue);
  if (err) {
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }

  db.collection('issues').insertOne(Issue.cleanupIssue(newIssue)).then(result =>
    db.collection('issues').find({ _id: result.insertedId }).limit(1)
    .next()
  )
  .then(savedIssue => {
    res.json(savedIssue);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

app.get('/api/issues/:ISBN', (req, res) => {
  let ISBN;
  try {
    ISBN = req.params.ISBN;
  } catch (error) {
    res.status(422).json({ message: `Invalid issue ID format: ${error}` });
    return;
  }

  db.collection('issues').find({ ISBN: ISBN }).limit(1)
  .next()
  .then(issue => {
    if (!issue) res.status(404).json({ message: `No such issue: ${issueId}` });
    else res.json(issue);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

app.put('/api/issues/:id', (req, res) => {
  let issueId;
  try {
    issueId = new ObjectId(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalid issue ID format: ${error}` });
    return;
  }

  const issue = req.body;
  delete issue._id;

  const err = Issue.validateIssue(issue);
  if (err) {
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }

  db.collection('issues').updateOne({ _id: issueId }, Issue.convertIssue(issue)).then(() =>
    db.collection('issues').find({ _id: issueId }).limit(1)
    .next()
  )
  .then(savedIssue => {
    res.json(savedIssue);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});



app.delete('/api/issues/:id', (req, res) => {
  let issueId;
  try {
    issueId = new ObjectId(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalid issue ID format: ${error}` });
    return;
  }

  db.collection('issues').deleteOne({ _id: issueId }).then((deleteResult) => {
    if (deleteResult.result.n === 1) res.json({ status: 'OK' });
    else res.json({ status: 'Warning: object not found' });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve('static/index.html'));
});

MongoClient.connect('mongodb://localhost/issuetracker').then(connection => {
  db = connection;
  app.listen(3000, () => {
    console.log('App started on port 3000');
  });
}).catch(error => {
  console.log('ERROR:', error);
});






