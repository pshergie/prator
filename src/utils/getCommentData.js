const fs = require("fs");
const yaml = require("js-yaml");
const core = require("@actions/core");

import getDataPath from "./getDataPath.js";

const getCommentData = () => {
  const refMsg = 'Use the Setup config section of the action description as a reference.';
  const dataPath = getDataPath(core);
  const commentData = yaml.load(
    fs.readFileSync(dataPath, "utf8"),
  );

  if (!commentData) {
    console.log('Comment data: ', commentData);

    throw new Error('The comments data is empty or incorrect. ' + refMsg);
  }

  if (!commentData.prependData) {
    console.log('Comment data: ', commentData);
    console.log('Prepend data: ', commentData.prependData);

    throw new Error('Prepend data is not correct. ' + refMsg);
  }

  if (!commentData.checksData) {
    console.log('Comment data: ', commentData);
    console.log('Checks data: ', commentData.checksData);

    throw new Error('Checks data is not correct. ' + refMsg);
  }

  return commentData;
};

export default getCommentData;
