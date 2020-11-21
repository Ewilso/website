// Borrowed code for typing onto the terminal screen

function pause(s = 1) {
	return new Promise(resolve => setTimeout(resolve, 1000 * Number(s)));
}
function getChar(char) {
	let result;
	if (typeof char === "string") {
		if (char === "\n") {
			result = document.createElement("br");
		} else if (char === "\t") {
			let tab = document.createElement("span");
			tab.innerHTML = "&nbsp;&nbsp;&nbsp;";
			result = tab;
		} else if (char === " ") {
			let space = document.createElement("span");
			space.innerHTML = "&nbsp;";
			space.classList.add("char");
			result = space;
		} else {
			let span = document.createElement("span");
			span.classList.add("char");
			span.textContent = char;
			result = span;
		}
	}
	return result;
}
function type(
	text,element,
	{
		wait = 35, // Time (ms) to wait between each character
		initialWait = 250, // Time (ms) to wait before typing starts
		finalWait = 250, // Time (ms) to wait when typing is finished
		typerClass = "", // Class to add to the typing container, in order to style is with CSS
		useContainer = false, // If true, types text into the container element (3rd parameter). If false, creates a new div
		stopBlinking = false, // Stop blinking when typing is done
		processChars = true, // Whether to preprocess spaces, tabs and newlines to &nbsp; (3x&nbsp;) and <br>
		clearContainer = false // Clear container before typing
	} = {},
	container = document.querySelector(element) // DOM element where text will be typed
) {
	let interval;
	return new Promise(async (resolve) => {
		if (interval) {
			clearInterval(interval);
			interval = null;
		}
		let typer = useContainer ? container : document.createElement("div");
		typer.classList.add("typer", "active");

		if (typerClass) {
			typer.classList.add(typerClass);
		}
		// Handy if reusing the same container
		if (clearContainer) {
			container.innerHTML = "&nbsp;";
		}

		if (!useContainer) {
			container.appendChild(typer);
		}

		if (initialWait) {
			await pause(initialWait / 1000);
		}

		let queue = text;
		if (processChars) {
			if (Array.isArray(text)) {
				text = text.join("\n");
			}
			queue = text.split("");
		}

		let prev;

		interval = setInterval(async () => {
			if (queue.length) {
				let char = queue.shift();
				if (prev) {
					prev.remove();
					if (
						prev.firstChild &&
						prev.firstChild.nodeType === Node.TEXT_NODE
					) {
						typer.innerText += prev.innerText;
					} else {
						typer.appendChild(prev);
					}
				}
				let element = true ? getChar(char) : char;
				if (element) {
					typer.appendChild(element);

					if (element.nodeName === "BR") {
						scroll(container);
					}
				}
				prev = element;
			} else {
				// When the queue is empty, clean up the interval
				clearInterval(interval);
				await pause(finalWait / 1000);
				if (stopBlinking) {
					typer.classList.remove("active");
				}
				resolve();
			}
		}, wait);
	});
}

export {type};
