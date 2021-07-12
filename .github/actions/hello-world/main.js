const core = require("@actions/core");
const github = require('@actions/github');

const firstGreeting = core.getInput("first-greeting");
const secondGreeting = core.getInput("second-greeting");
const thirdGreeting = core.getInput("third-greeting");

const client = github.getOctokit(
	core.getInput('input', {required: true});
);

console.log(`Hello ${firstGreeting}`);
console.log(`Hello ${secondGreeting}`);
if (thirdGreeting) {
    console.log(`Hello ${thirdGreeting}`);
}

if (github.context.eventName === 'push') {
    console.log(`${github.context.payload}`);
    console.log(`${github.context.payload.before}`);
	console.log(`${github.context.payload.after}`);
} else if (github.context.eventName === 'push_request') {
    console.log(`${github.context.payload}`);
    console.log(`${github.context.payload.pull_request.base}`);
	console.log(`${github.context.payload.pull_request.head}`);

	const response = await client.rest.repos.compareCommitsWithBasehead( {
		owner: github.context.repo.owner,
		repo: github.context.repo.repo,
		basehead: `${github.context.payload.pull_request.base.sha}..${github.context.payload.pull_request.head.sha}`
	});

	console.log(`${response}`);
}
