# review-comments-action

![action example](https://raw.githubusercontent.com/pshergie/pull-request-auto-reviewer/main/img/example.jpg)

## Usage

This GitHub action post comments based on pull request changes

## Setup

The action expects you to provide 3 params:

- `token`: your GitHub token
- `signature` (optional): a message that prepends to every message of the bot. Keep empty if you don't want it. **By default** it's `🗯️ [pull-request-auto-reviewer]:` (as per screenshot).
- `datapath`: a path to a yaml file with pairs of `paths` and `message`. `paths` is to specify path(s) of changes that would trigger posting of followed `message` as a pull request comment. `message` could be a simple string or a markdown. [Example](https://raw.githubusercontent.com/pshergie/pull-request-auto-reviewer/main/docs/data.yml)

A typical setting may look like this:

```
- name: pull-request-auto-reviewer
  uses: pshergie/pull-request-auto-reviewer@1.1
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    datapath: docs/data.yml
```
