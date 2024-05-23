const core = require("@actions/core");
const github = require("@actions/github");
const yaml = require("js-yaml");
const fs = require("fs");

import fetchComments from "./utils/fetchComments.js";
import postComment from "./utils/postComment.js";
import getDatapath from "./utils/getDatapath.js";

async function run() {
  try {
    console.log('starting...');
    const datapath = getDatapath(core);
    const [prependData, checksData] = yaml.load(
      fs.readFileSync(datapath, "utf8"),
    );
    const { prependMsg } = prependData;
    const checks = checksData?.checks?.map((config) => ({
      ...config,
      paths: config.paths.split(",").map((p) => p.trim()),
    }));
    const token = core.getInput("token");
    const octokit = github.getOctokit(token);
    const context = github.context;
    const pullNumber = context.payload.pull_request.number;
    const comments = await fetchComments(context, pullNumber, octokit);
    console.log('fetching diff...')
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
    console.log('prependMsg', prependMsg);
    console.log('checksData', checksData);
    console.log('checks', checks);
    console.log('paths', paths);
    console.log('checks', checks);
    console.log('message', message);
    console.log('pullNumber', pullNumber)
    console.log('diffFilesPaths', diffFilesPaths)

    core.setFailed(error.message);
  }
}

run();
