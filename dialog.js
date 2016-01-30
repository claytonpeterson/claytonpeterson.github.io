
var text = [
"doing art now",
"probably programming",
"i'm working on a new painting",
"looking for a job",
"most likely reading a book",
"thinking about artificial intelligence",
"currently producing music",
"day dreaming about the future"
];

function randomText() {
	var index = Math.floor(Math.random()*text.length);
    return text[index];        
}
