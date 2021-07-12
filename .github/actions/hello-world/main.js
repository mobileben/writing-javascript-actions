const core = require("@actions/core");
const github = require('@actions/github');

async function run() {
	try {
		const firstGreeting = core.getInput("first-greeting");
		const secondGreeting = core.getInput("second-greeting");
		const thirdGreeting = core.getInput("third-greeting");

		const client = github.getOctokit(core.getInput('token', {required: true}));

		console.log(`Hello ${firstGreeting}`);
		console.log(`Hello ${secondGreeting}`);
		if (thirdGreeting) {
			console.log(`Hello ${thirdGreeting}`);
		}

		let base = undefined;
		let head = undefined;

		if (github.context.eventName === 'push') {
			console.log(`${github.context.payload}`);
			base = github.context.payload.before;
			head = github.context.payload.after;
		} else if (github.context.eventName === 'pull_request') {
			console.log(`${github.context.payload}`);

			base = github.context.payload.pull_request.base.sha;
			head = github.context.payload.pull_request.head.sha;
		}

		console.log(`${base}`);
		console.log(`${head}`);
		console.log(Object.keys(github.context.payload));
		const response = await client.rest.repos.compareCommitsWithBasehead( {
			//base,
			//head,
			owner: github.context.repo.owner,
			repo: github.context.repo.repo
			, basehead: `${github.context.repo.owner}:${base}...${github.context.repo.owner}:${head}`
		});

		console.log(`${response}`);
		console.log(`${response.status}`);
		if (response.data.files) {
			for (const file of response.data.files) {
				core.info(`${file.filename}: ${file.status}`);
			}
		}
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
