const core = require('@actions/core');
const github = require('@actions/github');
const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');

try {
  const ajv = new Ajv();
  const folder = core.getInput('input_folder');
  const schema_path = core.getInput('schema');

  const schema_file = fs.readFileSync(schema_path, {
    encoding: 'utf-8',
    flat: 'r'
  });
  console.log(schema_file);
  const schema = ajv.compile(schema_file);
  console.log(schema);

  const data = fs.readdirSync(folder);
  console.log(data);
  data.map((dirname) => {
    const dir_files = fs.readdirSync(dirname);
    let target = '';
    dir_files.forEach((file) => {
      if (path.extname(file) === '.json') {
        target = fs.readFileSync(file);
        const valid = validate(target);

        if (!valid) {
          console.log(validate.errors);
          core.setFailed(validate.errors);
        } else {
          core.setOutput('Everything fine!');
        }
      }
    });
  });
} catch (error) {
  core.setFailed(error.message);
}