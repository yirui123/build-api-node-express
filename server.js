var fs = require('fs')
var data = fs.readFileSync('words.json');
var words = JSON.parse(data);

console.log(words);

console.log('connected to server');

var express = require('express');
var app = express();
var server = app.listen(3000, listening);
app.use(express.static('public'));

function listening() {
  console.log('listening...');
}

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

app.get('/add/:word/:score?', addWord);

function addWord(req, res){
  var data = req.params;
  var word = data.word;
  var score = Number(data.score);
  var reply;

  if (!score) {
    reply = {
      msg: 'score is required!'
    }
  } else {
    words[word] = score;
    var data = JSON.stringify(words, null, 2);
    fs.writeFile('words.json', data, (err) => {
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
}

app.get('/all', sendAll);

function sendAll(req, res) {
  res.send(words);
}

app.get('/search/:word', searchWord);
function searchWord(req, res) {
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
}
