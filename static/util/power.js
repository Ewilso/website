import { boot } from "./screens.js";
import { stopSpeaking } from "./speak.js";
import pause from "./pause.js";

/** Turn on the terminal */
async function on() {
	await power();
}

/** Turn off the terminal */
function off() {
	stopSpeaking();
	power(false);
}

async function power(on = true) {
	// @FIXME use a single class on the #monitor to detect on/off
	document.querySelector("#slider").classList.toggle("on", on);
	document.querySelector("#switch").checked = !on;
	await pause(0.1);

	document.getElementById("crt").classList.toggle("turn-off", !on);
	document.getElementById("crt").classList.toggle("off", !on);
	return;
}

export { power, on, off };
