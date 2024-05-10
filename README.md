# review-comments-action

![action example](https://raw.githubusercontent.com/pshergie/pull-request-auto-reviewer/main/img/example.jpg)

## Usage

This GitHub action post comments based on pull request changes

## Setup

This action receives 3 params (2 of them are required):

- `token`: your GitHub token
- `datapath`: a path to a yaml file with pairs of `paths` and `message` keys. `paths` dedicated to specify path(s) of changes that would trigger posting of followed `message` as a pull request comment. `message` could be a simple string or a markdown. [Example](https://github.com/pshergie/pull-request-auto-reviewer/blob/main/docs/data.yml)
- `signature` (optional): a message that prepends to every message of the bot. Keep empty if not needed. **By default** it's `🗯️ [pull-request-auto-reviewer]:` (as per screenshot).

A typical setting may look like this:

```yaml
- name: pull-request-auto-reviewer
  uses: pshergie/pull-request-auto-reviewer@1.2
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    datapath: docs/data.yml
```
