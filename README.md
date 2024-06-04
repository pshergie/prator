# review-comments-action

![action example](https://raw.githubusercontent.com/pshergie/pull-request-auto-reviewer/main/img/example.jpg)

## Usage

Use this action in order to auto post comments in pull requests based on the changes

## Setup

Since posting comments on GitHub requires write permission you need two create 2 yaml configurations. One to collect PR changes and upload as artifacts and one to download them and apply the script (executes from the main branch).

In the first config you need to prepare some data to be uploaded as an artifact:

```yml
name: Auto-review Diff Prepare
on:
  pull_request:
    branches:
      - main
jobs:
  prepare:
    name: Prepare
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 2
      - name: Save PR number
        run: echo "${{ github.event.pull_request.number }}" > pr_number.txt
      - name: Generate Diff
        run: |
          git fetch origin ${{ github.event.pull_request.base.ref }}
          git diff origin/${{ github.event.pull_request.base.ref }}..${{ github.sha }} > pr_files_diff.txt
      - name: Create artifact folder
        run: mkdir -p pr_diff && mv pr_number.txt pr_files_diff.txt pr_diff/
      - name: Upload PR details as artifact
        uses: actions/upload-artifact@v4
        with:
          name: pr-diff
          path: pr_diff/
```

In the second config file you need to specify 2 params:

- `token`: your GitHub token
- `data-path`: a path to a yaml file with a config that contains `prependMsg` and `checks` props. `prependMsg` is a message that prepends to every message of the bot. Keep empty if not needed. **By default** it's `🗯️ [pull-request-auto-reviewer]:` (as per screenshot). `checks` props consists of pairs of `paths` and `message` keys. `paths` dedicated to specify path(s) of changes that would trigger posting of followed `message` as a pull request comment. In case of multiple `paths` they should be separated by a comma. `message` could be a simple string or markdown. An example of such a file:

```yml
- prependMsg: ""
- checks:
    - paths: "**/*.*"
      message: |
        ### Please tick the following checkboxes:

        - [ ] the code is tested
        - [ ] files are compressed
        - [ ] files contain no errors
```

There's also an optional `artifact-path`  parameter if you want a different path to artifacts (make sure that you have updated the upload artifacts config as well). The default value is `pr_diff/`
