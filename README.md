[![Generic badge](https://img.shields.io/badge/IndexSchema-v0.1.0-blue.svg)](Version)

# Project Validator

This validation script is used to validate the project `.json`-files in each first-level subfolder of the workspace against the Schema.

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