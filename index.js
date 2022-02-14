const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {
  const folder = core.getInput('input_folder');
  console.log(`Input folder set to: ${folder}`);
  const data = fs.readdirSync(folder);
  console.log('Content', data);

} catch (error) {
  core.setFailed(error.message);
}