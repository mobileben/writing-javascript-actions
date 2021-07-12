const core = require("@actions/core");
const github = require('@actions/github');

const firstGreeting = core.getInput("first-greeting");
const secondGreeting = core.getInput("second-greeting");
const thirdGreeting = core.getInput("third-greeting");

console.log(`Hello ${firstGreeting}`);
console.log(`Hello ${secondGreeting}`);
if (thirdGreeting) {
    console.log(`Hello ${thirdGreeting}`);
}

if (github.context.eventName === 'push') {
    console.log(`${github.context.payload}`);
    console.log(`${github.context.payload.base}`);
	console.log(`${github.context.payload.head}`);
}
