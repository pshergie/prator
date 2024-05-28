# review-comments-action

![action example](https://raw.githubusercontent.com/pshergie/pull-request-auto-reviewer/main/img/example.jpg)

## Usage

This GitHub action post comments based on pull request changes.

## Setup

Since posting comments on GitHub requires write permission you need two create 2 yaml configurations. One to collect PR changes and upload as artifacts and one to download them and apply the script (executes from the main branch).

In the second config file you need to specify 2 params:

- `token`: your GitHub token
- `datapath`: a path to a yaml file with a config that contains `prependMsg` and `checks` props. `prependMsg` is a message that prepends to every message of the bot. Keep empty if not needed. **By default** it's `🗯️ [pull-request-auto-reviewer]:` (as per screenshot). `checks` props consists of pairs of `paths` and `message` keys. `paths` dedicated to specify path(s) of changes that would trigger posting of followed `message` as a pull request comment. In case of multiple `paths` they should be separated by a comma. `message` could be a simple string or a markdown. [Example](https://github.com/pshergie/pull-request-auto-reviewer/blob/main/docs/data.yml)

Known problems:

- If a main/master branch was updated, the action won't be working correctly until you rebase the branch where the action is triggered
