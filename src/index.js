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
    console.log("token extracted");
    const octokit = github.getOctokit(token);
    console.log('oktokit extracted');
    const context = github.context;
    console.log('context extracted');
    const pullNumber = context?.payload?.pull_request?.number;
    console.log('pullNumber: ', pullNumber);

    const diffFilesPaths = fs.readFileSync('my_diff.txt', "utf8")?.split('\n').filter(Boolean);
    console.log('diffFilesPaths', diffFilesPaths);

    const comments = JSON.parse(fs.readFileSync('pr_comments.json', "utf8"));
    console.log('comments', comments);

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
