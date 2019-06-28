/** A simple REST server built with express */

const shortid = require('shortid');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const PORT = 3000;
const REST_URL = 'http://studentprojectdev-env.mbhm4mnt2c.eu-north-1.elasticbeanstalk.com/';

app.use(bodyParser.json());
app.use(allowCorsMiddleware);

app.get('/Project/List', getProjects);
app.get('/Student/List', getStudents);
app.get('/Project/ResetToInitialState', resetToInitialState);

app.post('/Project/createGroup', createGroup);
app.post('/Project/AddStudentToGroup', addStudentToGroup);

app.post('/Student/GetProjects', getStudentProject);

app.listen(3000, () =>
  console.log(
    `app listening on port ${PORT}. Go to http://localhost:${PORT}/Project/List to test that the server is running.`
  )
);

function resetToInitialState(req, res) {
  request(REST_URL + 'Project/ResetToInitialState', function (error, response, body) {
    if(!error && response.statusCode == 200) {
      res.send(body);
    }
  });
}

function getProjects(req, res) {
  request(REST_URL + 'Project/List', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
}
function getStudents(req, res) {
  request(REST_URL + 'Student/List', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
}

function getStudentProject(req, res) {
  const studentId = req.body.studentId;
  request({
    headers: {'content-type' : 'application/json'},
    url: REST_URL + 'Student/GetProjects?id=' + studentId
  }, function (error, response, body) {
    console.log(response);
    if(!error && response.statusCode == 200) {
      console.log(body);
      res.send(body);
    }
  });
}

function createGroup(req, res) {
  const projectId = req.body.projectId;
  const groupName = req.body.groupName;

  request({
    headers: {'content-type' : 'application/json'},
    url: REST_URL + 'Project/CreateGroup?projectId=' + projectId + '&groupName=' + groupName
  }, function (error, response, body) {
    console.log(response.statusCode);
    if(!error && response.statusCode == 200) {
      console.log(body);
      res.send(body);
    }
  });
}

function addStudentToGroup(req, res) {
  const groupId = req.body.groupId;
  const studentId = req.body.studentId;
  console.log(groupId + ' ' + studentId);
  request({
    headers: {'content-type' : 'application/json'},
    url: REST_URL + 'Project/AddStudentToGroup?groupId=' + groupId + '&studentId=' + studentId
  }, function (error, response, body) {
    console.log(response.statusCode);
    if(!error && response.statusCode == 200) {
      console.log(body);
      res.send(body);
    }
  });
}

function allowCorsMiddleware(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}
