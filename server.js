console.log('connected to server');

var fs = require('fs')
var additonaldata = fs.readFileSync('additional.json');
var afinndata = fs.readFileSync('public/afinn.json');
var additional = JSON.parse(additonaldata);
var afinn = JSON.parse(afinndata);

var express = require('express');
var app = express();
var server = app.listen(3000, ()=>{
  console.log('listening...');
});
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors());

app.get('/add/:word/:score?', (req, res) => {
  res.json({msg: 'This is CORS-enabled for all origins!'})
  
  var data = req.params;
  var word = data.word;
  var score = Number(data.score);
  var reply;

  if (!score) {
    reply = {
      msg: 'score is required!'
    }
  } else {
    additional[word] = score;
    var data = JSON.stringify(additional, null, 2);
    fs.writeFile('additional.json', data, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
      reply = {
        msg: 'thank you',
        status: 'success',
        word: word,
        score: score
      }
      res.send(reply);
    });
  }
});

app.get('/all', (req, res) => {
  var data = {
    additional: additional,
    afinn: afinn
  }
  res.send(data);
});

app.post('/analyze', (req, res) => {
  console.log(req.body);
  var txt = req.body.text;
  var words = txt.split(/\W+/);
  console.log(words);
  var totalScore = 0;
  var wordlist = [];
  var score = 0;
  var found = false;
  for (var i = 0; i < words.length; i++) {
    var word = words[i].toLowerCase();
    if (afinn.hasOwnProperty(word)) {
      found = true;
      score = Number(afinn[word]);
    } else if (additional.hasOwnProperty(word)) {
      found = true;
      score = Number(additional[word]);
    }
    totalScore += score;
    if (found) {
      wordlist.push({word: word, score: score});
    }
  }

  var reply = {
    msg: 'thank you',
    score: totalScore,
    comparative: totalScore / words.length,
    words: wordlist
  }
  res.send(reply);
});

app.get('/search/:word', (req, res) => {
  var word = req.params.word;
  var reply;
  if (words[word]) {
    reply = {
      status: 'found',
      word: word,
      score: words[word]
    }
  } else {
    reply = {
      status: 'not found',
      word: word
    }
  }
  res.send(reply);
});



// app.get('/search/:term/:num', sendFlower);
//
// function sendFlower(req, res) {
//   var data = req.params;
//   var num = data.num;
//   var reply = '';
//   for (var i = 0; i < num; i ++) {
//     reply += "I love " + data.term + " <br />";
//   }
//   res.send(reply);
// }
