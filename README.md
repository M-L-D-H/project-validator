[![Generic badge](https://img.shields.io/badge/Validator-v0.1.1-blue.svg)]()

# Project Validator

This validation script is used to validate the project `.json`-files in each first-level subfolder of the workspace against the Schema, using [Ajv JSON validator](https://ajv.js.org/json-schema.html#draft-2020-12).

## Usage

```yml
name: Project Validation

on:
  pull_request:
    branches:
      - master
  workflow_dispatch:
    branches:
      - master

jobs:
  validation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Validate JSON
        uses: Closing-the-Gap-in-NLS-DH/project-validator@main
        with:
          workspace: ${{ github.workspace }}
```
