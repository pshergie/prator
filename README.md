# review-comments-action

![action example](https://raw.githubusercontent.com/pshergie/pull-request-auto-reviewer/main/img/example.jpg)

## Usage

This GitHub action post comments based on pull request changes.

## Setup

⚠️ **Important**: in order for action to work you need to give GitHub actions a permission to write, otherwise it will throw `RequestError [HttpError]: Resource not accessible by integration`. The permission can be granted in the [yaml config](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#permissions) or in the repository settings: `Settings` -> `Actions` -> `General` -> `Workflow permissions`

This action receives 2 required params:

- `token`: your GitHub token
- `datapath`: a path to a yaml file with a config that contains `prependMsg` and `checks` props. `prependMsg` is a message that prepends to every message of the bot. Keep empty if not needed. **By default** it's `🗯️ [pull-request-auto-reviewer]:` (as per screenshot). `checks` props consists of pairs of `paths` and `message` keys. `paths` dedicated to specify path(s) of changes that would trigger posting of followed `message` as a pull request comment. In case of multiple `paths` they should be separated by a comma. `message` could be a simple string or a markdown. [Example](https://github.com/pshergie/pull-request-auto-reviewer/blob/main/docs/data.yml)

A typical setting may look like this:

```yaml
on:
  pull_request:
    branches:
      - main

jobs:
  review:
    name: Post review comments
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: pull-request-auto-reviewer
        uses: pshergie/pull-request-auto-reviewer@1.4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          datapath: docs/data.yml
```
