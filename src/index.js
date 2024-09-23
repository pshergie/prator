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
    let messagesToPost = []

    messagesToPost = await checks.allCasesPaths.reduce((msgToPost, config) => [...msgToPost, ...prepareMessages(config, comments, diffPathList[diffTypeList.indexOf('all')], msgToPost)], messagesToPost);
    messagesToPost = await checks.modifiedOnlyPaths.reduce((msgToPost, config) => [...msgToPost, ...prepareMessages(config, comments, diffPathList[diffTypeList.indexOf('mod')], msgToPost)], messagesToPost);
    messagesToPost = await checks.addedOnlyPaths.reduce((msgToPost, config) => [...msgToPost, ...prepareMessages(config, comments, diffPathList[diffTypeList.indexOf('add')], msgToPost)], messagesToPost);
    messagesToPost = await checks.deletedOnlyPaths.reduce((msgToPost, config) => [...msgToPost, ...prepareMessages(config, comments, diffPathList[diffTypeList.indexOf('del')]), msgToPost], messagesToPost);

    // const modifiedOnlyMessages = checks.modifiedOnlyPaths.map(config => prepareMessages(config, comments, diffPathList[diffTypeList.indexOf('mod')], allCasesMessages));
    // const addedOnlyMessages = checks.addedOnlyPaths.map(config => prepareMessages(config, comments, diffPathList[diffTypeList.indexOf('add')], [...allCasesMessages, ...modifiedOnlyMessages]));
    // const deletedOnlyMessages = checks.deletedOnlyPaths.map(config => prepareMessages(config, comments, diffPathList[diffTypeList.indexOf('del')], [...allCasesMessages, ...modifiedOnlyMessages, ...addedOnlyMessages]));

    console.log('messages to post', messagesToPost);

    if (messagesToPost.length > 0) {
      await postComment(prependMsg, messagesToPost, pullNumber, context, octokit);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
