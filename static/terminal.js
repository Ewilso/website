import { on, off } from "./util/power.js";

function togglePower() {
	let isOff = document.getElementById("crt").classList.contains("off");
	if (isOff) {
		on();
	} else {
		off();
	}
}
function theme(event) {
	let theme = event.target.dataset.theme;
	[...document.getElementsByClassName("theme")].forEach((b) =>
		b.classList.toggle("active", false)
	);
	event.target.classList.add("active");
	document.body.classList = "theme-" + theme;
	handleClick();
}

// Define some stuff on the window so we can use it directly from the HTML
Object.assign(window, {
	togglePower,
	theme,
});
