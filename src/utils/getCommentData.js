const yaml = require("js-yaml");

import getDataPath from "./utils/getDataPath.js";

const getCommentData = (dataPath) => {
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
    console.log('prepend data: ', prependData);

    throw new Error('Prepend data is not correct. ' + refMsg);
  }

  if (!commentData.checksData) {
    console.log('Comment data: ', commentData);
    console.log('checks data: ', checksData);

    throw new Error('Checks data is not correct. ' + refMsg);
  }

  return commentData;
};

export default getCommentData;
