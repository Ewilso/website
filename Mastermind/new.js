function output(text) {
  container = document.getElementById('output');
  container.innerHTML += text + '<br>';
  container.scrollTop = container.scrollHeight;
}

function setup() {
  window.possible = ["W","B","WW","WB","BB","WWW","WWB","WBB","BBB","WWWW","WWWWB","WWBB","WBBB","BBBB"]
  window.s = []
  window.orig = []
  window.input = false
  var first = 1, second = 1, third = 1, fourth = 1
  for (var i = 0; i < 1296; i++) {
    window.s.push([first,second,third,fourth])
    window.orig.push([first,second,third,fourth])
    if (fourth === 6 && third === 6 && second == 6) {
      second = 1; third = 1; fourth = 0; first += 1
    }
    else if (fourth  === 6 && third === 6) {
      third = 1; fourth = 0; second += 1
    }
    else if (fourth === 6) {
      fourth = 0; third += 1
    }
    fourth += 1
  }
  window.input = true
}

function enter(response, event) {
  if (event.keyCode === 13) {
    document.getElementById('input').innerHTML = null
    event.preventDefault()
    if (window.input === true){
      console.log('success!')
    }
  }
}
