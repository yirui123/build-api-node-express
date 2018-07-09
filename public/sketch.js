var afinn;

function preload() {
  afinn = loadJSON('afinn.json');
}

function setup() {
  noCanvas();
  var txt = select('#txt');
  txt.input(typing);
}

function typing() {
  var words = txt.value.split(/\W/);
  console.log(words);
  var scoredwords = [];
  var totalScore = 0;
  for (var i = 0; i < words.length; i++) {
    var word = words[i].toLowerCase();
    if (afinn.hasOwnProperty(word)) {
      var score = afinn[word];
      totalScore += Number(score);
      scoredwords.push(word + ': ' + score + " " );
    }
  }
  select('#score').html('score: ' + totalScore );
  select('#comparative').html('comparative: ' + totalScore / words.length);
  select('#wordlist').html(scoredwords);
}

function draw() {

}
