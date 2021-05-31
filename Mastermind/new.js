function output(text){
  container = document.getElementById('output');
  container.innerHTML += text + '<br>';
  container.scrollTop = container.scrollHeight;
}

function setup(){
  window.possible = ["W","B","WW","BW","BB","WWW","BWW","BBW","BBB","WWWW","BWWWW","BBWW","BBBW","BBBB"]
  window.s = []
  window.orig = []
  window.input = false
  var first = 1, second = 1, third = 1, fourth = 1
  for (var i = 0; i < 1296; i++){
    window.s.push([first,second,third,fourth])
    window.orig.push([first,second,third,fourth])
    if (fourth === 6 && third === 6 && second == 6){
      second = 1; third = 1; fourth = 0; first += 1
    }
    else if (fourth  === 6 && third === 6){
      third = 1; fourth = 0; second += 1
    }
    else if (fourth === 6){
      fourth = 0; third += 1
    }
    fourth += 1
  }
  window.input = true
  window.guess = [1, 1, 2, 2]
  window.orig.splice(window.orig.indexOfForArrays(window.guess), 1)
  output("First Guess: 1,1,2,2")
}

function enter(response, event){
  if (event.keyCode === 13){
    document.getElementById('input').innerHTML = null
    event.preventDefault()
    if (window.input === true){
      if (response === "REL"){
        window.location.reload();
      }
      else if (response === 'BBBB'){
        output('Program Terminated.')
      }
      else {
        window.s = calc(response, window.guess, window.s)
        scores = []
        for (var i = 0; i < window.orig.length; i++){
          for (var j = 0; j < window.possible.length; j++){
            score = calc(window.possible[j], window.orig[i], window.s).length
            scores.push([score, window.orig[i]])
          }
        }
        guess = [0, []]
        for (var i = 0; i < scores.length; i++){
         if (scores[i][0] > guess[0]){
          guess = [scores[i][0], scores[i][1]]
         }
        }
        window.guess = guess[1]
        output('Guess: ' + window.guess)
        window.orig.splice(window.orig.indexOfForArrays(window.guess), 1)
      }
    }
  }
}

function calc(response, guess, array){
  result = []
  for (var i = 0; i < array.length; i++) {
    score = []
    equal = []
    compare = [guess[0], guess[1], guess[2], guess[3]]
    current = [array[i][0], array[i][1], array[i][2], array[i][3]]
    for (var j = 0; j < array[i].length; j++) {
      if (guess[j] === array[i][j]) {
        score.push("B")
        equal.push(j)
      }
    }
    for (var j = 0; j < equal.length; j++) {
      current.splice(equal[j] - j,1)
      compare.splice(equal[j] - j,1)
    }
    for (var j = 0; j < current.length; j++) {
      if (compare.includes(current[j]) === true) {
        score.push("W")
        current.splice(j,1)
      }
    }
    result.push([score, array[i], guess])
  }
  split = response.split('')
  split.sort()
  matching = []
  for (var i = 0; i < result.length; i++) {
    if (arraysEqual(split,result[i][0]) === true){
      matching.push(result[i][1])
    }
  }
  return matching;
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
   if (a[i] !== b[i]) return false;
  }
  return true;
}

Array.prototype.indexOfForArrays = function(search)
{
  var searchJson = JSON.stringify(search); // "[3,566,23,79]"
    var arrJson = this.map(JSON.stringify); // ["[2,6,89,45]", "[3,566,23,79]", "[434,677,9,23]"]

    return arrJson.indexOf(searchJson);
};
