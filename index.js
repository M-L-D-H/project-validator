const core = require('@actions/core');
const github = require('@actions/github');
const Ajv2020 = require('ajv/dist/2020');
const fs = require('fs');
const path = require('path');

try {
  const ajv = new Ajv2020();
  const workspace = core.getInput('workspace');
  const folder = `${workspace}/PROJECTS`;
  const schema_path = `${workspace}/SCHEMATA`;

  const schema_file = fs.readFileSync(`${schema_path}/project.schema.json`, {
    encoding: 'utf-8',
    flat: 'r'
  });
  const schema_json = JSON.parse(schema_file);
  const validate = ajv.compile(schema_json);

  const data = fs.readdirSync(folder);
  data.map((dirname) => {
    const dir_files = fs.readdirSync(`${folder}/${dirname}`);
    let target = '';
    dir_files.forEach((file) => {
      if (path.extname(file) === '.json') {
        target = fs.readFileSync(`${folder}/${dirname}/${file}`);
        const valid = validate(JSON.parse(target));

        if (!valid) {
          let errmsg = `Error found in: "/PROJECTS/${dirname}/${file}"`;
          validate.errors.map((err) => {
            errmsg += `\n- ${err.instancePath} : "${err.message}"`
          });
          core.setFailed(errmsg);
        } else {
          core.setOutput('Everything fine!');
        }
      }
    });
  });
} catch (error) {
  core.setFailed(error.message);
}