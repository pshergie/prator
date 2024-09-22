const fs = require("fs");
const core = require("@actions/core");
const github = require("@actions/github");

import postComment from "./utils/postComment.js";
import getAutoCommentData from "./utils/getAutoCommentData.js";
import fetchComments from "./utils/fetchComments.js";
import parsePaths from "./utils/parsePaths.js"
import fetchDiffFromFile from "./utils/fetchDiffFromFile.js"
import prepareMessages from "./utils/prepareMessages.js";

async function run() {
  try {
    const artifactPath = core.getInput("artifact-path");
    const { prependMsg, checks } = getAutoCommentData();
    const token = core.getInput("token");
    const octokit = github.getOctokit(token);
    const context = github.context;
    const pullNumber = parseInt(fs.readFileSync(artifactPath + 'pr_number.txt', "utf8"), 10);
    const comments = await fetchComments(context, pullNumber, octokit);
    const diffTypeList = ['all', 'mod', 'add', 'del'];
    const diffPathList = diffTypeList.map(type => fetchDiffFromFile(type, artifactPath));

    const allCasesMessages = checks.allCasesPaths.map(config => prepareMessages(config, 'all', comments, diffPathList[diffTypeList.indexOf(diffType)]));
    const modifiedOnlyMessages = checks.modifiedOnlyPaths.map(config => prepareMessages(config, 'mod', comments, diffPathList[diffTypeList.indexOf(diffType)], allCasesMessages));
    const addedOnlyMessages = checks.modifiedOnlyPaths.map(config => prepareMessages(config, 'mod', comments, diffPathList[diffTypeList.indexOf(diffType)], [...allCasesMessages, ...modifiedOnlyMessages]));
    const deletedOnlyMessages = checks.deletedOnlyPaths.map(config => prepareMessages(config, 'mod', comments, diffPathList[diffTypeList.indexOf(diffType)], [...allCasesMessages, ...modifiedOnlyMessages, ...addedOnlyMessages]));
    const messagesToPost = [...allCasesMessages, ...modifiedOnlyMessages, ...addedOnlyMessages, ...deletedOnlyMessages];

    if (messagesToPost.length > 0) {
      await postComment(prependMsg, messagesToPost, pullNumber, context, octokit);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
