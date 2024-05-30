const core = require("@actions/core");
const github = require("@actions/github");
const yaml = require("js-yaml");
const fs = require("fs");

import postComment from "./utils/postComment.js";
import getDataPath from "./utils/getDataPath.js";

async function run() {
  try {
    const artifactPath = core.getInput("artifact-path");
    const dataPath = getDataPath(core);
    const [prependData, checksData] = yaml.load(
      fs.readFileSync(dataPath, "utf8"),
    );
    const { prependMsg } = prependData;

    if (!checksData?.checks) {
      console.log('checksData: ', checksData);

      throw new Error('The comments data is empty or incorrect');
    }

    const checks = checksData?.checks?.map((config) => ({
      ...config,
      paths: config.paths.split(",").map((p) => p.trim()),
    }));

    const token = core.getInput("token");
    const octokit = github.getOctokit(token);
    const context = github.context;
    const comments = JSON.parse(fs.readFileSync(artifactPath + 'pr_comments.json', "utf8"));
    const pullNumber = parseInt(fs.readFileSync(artifactPath + 'pr_number.txt', "utf8"), 10);
    const diffFilesPaths = fs.readFileSync(artifactPath + 'pr_files_diff.txt', "utf8")?.split('\n').filter(Boolean);

    checks?.map(
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
