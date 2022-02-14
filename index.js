const core = require('@actions/core');
const github = require('@actions/github');

try {
  const folder = core.getInput('input_folder');
  console.log(`Input folder set to: ${folder}`);
} catch (error) {
  core.setFailed(error.message);
}