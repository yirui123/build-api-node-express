function setup() {
  createCanvas(400, 400);
  console.log('running');
  drawData();
  var button = select('#submit');
  button.mousePressed(submitWord);
}

function drawData() {
  loadJSON('/all', gotData);
}

function submitWord() {
  var word = select('#word').value();
  var score = select('#score').value();
  console.log(word, score);
  loadJSON('add/' + word + '/' + score, (data)=>{
    console.log(data);
    drawData();
  }); // get request
}

function gotData(data) {
  background(0);
  console.log(data);
  var keys = Object.keys(data);
  for (var i = 0; i < keys.length; i++) {
    var word = keys[i];
    var score = data[word];
    fill(255);
    text(word + " : " + score, random(width), random(height));
  }
  console.log(keys);
}
