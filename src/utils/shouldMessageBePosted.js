import checkDiff from "./checkDiff.js";
import compareMarkdown from "./compareMarkdown.js";

const shouldMessageBePosted = (
  paths,
  message,
  diffFilesPaths,
  comments,
) => {
  console.log('comments', comments);
  let areTargetPathsChanged = checkDiff(paths, diffFilesPaths);

  if (areTargetPathsChanged) {
    const isCommentExisting = comments.some(
      (comment) =>
        comment.user === "github-actions[bot]" &&
        compareMarkdown(comment.body, message),
    );

    console.log('isCommentExisting', isCommentExisting);

    return isCommentExisting ? false : true;
  };

  return false;
};

export default shouldMessageBePosted;
