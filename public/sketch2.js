function setup() {
  createCanvas(400, 400);
  console.log('running');
  var button = select('#submit');
  button.mousePressed(submitWord);
  var buttonA = select('#analyze');
  buttonA.mousePressed(analyzeThis);
}

function submitWord() {
  var word = select('#word').value();
  var score = select('#score').value();
  console.log(word, score);
  loadJSON('add/' + word + '/' + score, (data)=>{
    console.log(data);
  }); // get request
}

function analyzeThis() {
  var txt = select('#textInput').value();
  //console.log(txt);
  var data = {
    text: txt
  }
  httpPost('analyze/', data, 'json', (result) => {
    console.log(result);
  }, (err) =>{
    console.log(err);
  });

}
