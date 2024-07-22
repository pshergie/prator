const fs = require("fs");
const core = require("@actions/core");
const github = require("@actions/github");

import postComment from "./utils/postComment.js";
import getAutoCommentData from "./utils/getAutoCommentData.js";
import fetchComments from "./utils/fetchComments.js";
import shouldMessageBePosted from "./utils/shouldMessageBePosted.js"
import parsePaths from "./utils/parsePaths.js"
import fetchDiffFromFile from "./utils/fetchDiffFromFile.js"

async function run() {
  try {
    const artifactPath = core.getInput("artifact-path");
    const [prependData, checksData] = getAutoCommentData();
    const { prependMsg } = prependData;
    const checks = parsePaths(checksData.checks);
    const token = core.getInput("token");
    const octokit = github.getOctokit(token);
    const context = github.context;
    const pullNumber = parseInt(fs.readFileSync(artifactPath + 'pr_number.txt', "utf8"), 10);
    const comments = await fetchComments(context, pullNumber, octokit);
    const diffPathList = ['all', 'mod', 'add', 'del'].map(type => fetchDiffFromFile(type));
    const messagesToPost = [];

    checks.map(({ message, ...pathCases }) => pathCases.map((pathCase, i) => {
      if (shouldMessageBePosted(pathCase, message, diffPathList[i], comments, messagesToPost)) {
        messagesToPost.push(message);
      }
    }))

    if (messagesToPost.length > 0) {
      await postComment(prependMsg, messagesToPost, pullNumber, context, octokit);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
