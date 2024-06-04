const fs = require("fs");
const yaml = require("js-yaml");
const core = require("@actions/core");

import getDataPath from "./getDataPath.js";

const getAutoCommentData = () => {
  const refMsg = 'Use the Setup config section of the action description as a reference.';
  const dataPath = getDataPath(core);
  const commentData = yaml.load(
    fs.readFileSync(dataPath, "utf8"),
  );

  if (!commentData) {
    console.log('Comment data: ', JSON.stringify(commentData, null, 4));

    throw new Error('The auto comments data is empty or incorrect. ' + refMsg);
  }

  if (!commentData[1]) {
    console.log('Comment data: ', JSON.stringify(commentData, null, 4));

    throw new Error('Checks data is not correct. ' + refMsg);
  }

  return commentData;
};

export default getAutoCommentData;
