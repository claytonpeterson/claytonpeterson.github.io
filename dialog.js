
var text = [
"looking for another job",
"i work at mcnally jackson",
"I buy books for a living",
"I make music 4 fun",
"I paint pictures",
"hire me for freelance stuff",
"I can make video games",
"I wish I had a pet",
"I like math now",
"people tell me i'm a robot",
"I used to build virtual reality",
"I had an interview at google once",
"I want to move",
];

function randomText() {
	var index = Math.floor(Math.random()*text.length);
    return text[index];        
}
