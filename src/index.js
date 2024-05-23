const core = require("@actions/core");
const github = require("@actions/github");
const yaml = require("js-yaml");
const fs = require("fs");

import fetchComments from "./utils/fetchComments.js";
import postComment from "./utils/postComment.js";
import getDatapath from "./utils/getDatapath.js";

async function run() {
  try {
    const diffData = fs.readFileSync('my_diff.txt', "utf8");
    console.log('');
    console.log('data type:', typeof diffData);
    console.log('diff data: ', diffData);
    console.log('');
    const datapath = getDatapath(core);
    console.log('datapath', datapath);

    const [prependData, checksData] = yaml.load(
      fs.readFileSync(datapath, "utf8"),
    );
    console.log('prependData', prependData);
    console.log('checksData', checksData);

    const { prependMsg } = prependData;
    console.log('prependMsg', prependMsg);
    const checks = checksData?.checks?.map((config) => ({
      ...config,
      paths: config.paths.split(",").map((p) => p.trim()),
    }));
    console.log('checks', checks);

    const token = core.getInput("token");
    const octokit = github.getOctokit(token);
    const context = github.context;
    const pullNumber = context.payload.pull_request.number;
    const comments = fs.readFileSync('pr_comments.txt', "utf8");
    console.log('comments', comments);
    const diffFilesPaths = fs.readFileSync('my_diff.txt', "utf8")?.split('\n').filter(Boolean);
    console.log('diffFilesPaths', diffFilesPaths);

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
