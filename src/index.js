const core = require("@actions/core");
const github = require("@actions/github");
const yaml = require("js-yaml");
const fs = require("fs");

import fetchComments from "./utils/fetchComments.js";
import fetchDiffFiles from "./utils/fetchDiffFiles.js";
import postComment from "./utils/postComment.js";
import getDatapath from "./utils/getDatapath.js";

async function run() {
  try {
    const datapath = getDatapath(core);
    const settings = yaml.load(fs.readFileSync(datapath, "utf8"));
    console.log("settings", settings);
    const { prependMsg } = settings;
    const checks = settings?.checks.map((config) => ({
      ...config,
      paths: config.paths.split(",").map((p) => p.trim()),
    }));
    console.log("checks", checks);
    const token = core.getInput("token");
    const octokit = github.getOctokit(token);
    const context = github.context;
    const pullNumber = context.payload.pull_request.number;

    const comments = await fetchComments(context, pullNumber, octokit);
    const diffFilesPaths = await fetchDiffFiles(context, pullNumber, octokit);

    checks.map(
      async ({ paths, message }) =>
        await postComment(
          prependMsg,
          paths,
          message,
          pullNumber,
          diffFilesPaths,
          comments,
          context,
          octokit,
        ),
    );
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
