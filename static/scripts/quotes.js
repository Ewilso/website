import { type, clear } from "./typing.js";
var items = Array(
  ["Ezekiel 25:17"," ","The path of the righteous man is beset on all sides by the inequities of the selfish and the tyranny of evil men.", " ",
  "Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of the darkness. For he is truly his brother's keeper and the finder of lost children.",
  " ", "And I will strike down upon thee with great vengeance and furious anger those who attempt to poison and destroy my brothers.",
  " ", "And you will know I am the Lord when I lay my vengeance upon you."],
  ["Wake up, Neo...", " ", "The matrix has you...", " ", "Follow the white rabbit.", " ", "Knock, knock, Neo."],
  ["You talkin' to me...", " ", "Yeah you, you talkin' to me."],
  ["The greatest trick the devil ever pulled was convincing the world he didn't exist."],

);

async function boot(){
  var chosen_item = items[Math.floor(Math.random() * items.length)];

  await type(chosen_item, false);
  await type([" ","proceed -->"], true)
}
boot();
