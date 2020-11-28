import { type } from "./typing.js";
var items = Array(
  ["The 'Net' is a waste of time, and that's exactly what's right about it."],
  ["If you ask 'Should we be in space?' you ask a nonsense question. We are in space. We will be in space."],
  ["That's the thing about people who think they hate computers...What they really hate are lousy programmers."],
  ["Those who believe in telekinetics, raise my hand."],
  ["I do feel that evolution is being controlled by some sort of divine engineer. I can't help thinking that. ", " ","And this engineer knows exactly what he or she is doing and why, and where evolution is headed. That's why we've got giraffes and hippopotami and the clap."],
  ["Ezekiel 25:17"," ","The path of the righteous man is beset on all sides by the inequities of the selfish and the tyranny of evil men.", " ",
  "Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of the darkness. For he is truly his brother's keeper and the finder of lost children.",
  " ", "And I will strike down upon thee with great vengeance and furious anger those who attempt to poison and destroy my brothers.",
  " ", "And you will know I am the Lord when I lay my vengeance upon you.", " "],
  ["Wake up, Neo...", "The matrix has you...", "Follow the white rabbit.", " ", "Knock, knock, Neo.", " "],
  ["If you're going to build a time machine into a car, why not do it with style.", " "],
  ["I'll be back.", " "],
  ["Time is an illusion.","Lunchtime doubly so.", " "],
  ["The ships hung in the sky, much the way that bricks don't", " "],
  ["I do not fear computers. I fear the lack of them.", " "],
  ["Type faster.", " "],
  ["I don't believe in astrology;","I'm a Sagittarius and we're skeptical."],
);

function add_element(type, classes, contained){
        var container = document.querySelector(contained) // DOM element where text will be typed
	let new_element = document.createElement(type);
        container.appendChild(new_element);
        new_element.classList.add(classes);
	if(type === "a"){
		new_element.href = "/porturia"
	}

}

window.onload = function() {
        var a = document.getElementById("continue");
	a.onclick = async function() {
            	screen = document.querySelector(".terminal")
            	screen.innerHTML = "";
            	add_element("div", "typedtext", ".terminal")
	    	await type("Welcome, welcome...", ".typedtext")
             	add_element("a", "porturia", ".terminal")
		await type(" ", ".typedtext")
	    	await type("Play a game", ".porturia")
		return false;
	}
}

async function boot(){
  var chosen_item = items[Math.floor(Math.random() * items.length)];
  await type(["proceed when ready"], "#continue")
  await type(chosen_item, ".typedtext");
}

boot();
