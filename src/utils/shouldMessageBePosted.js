import checkDiff from "./checkDiff.js";
import compareMarkdown from "./compareMarkdown.js";

const postComment = (
  paths,
  message,
  diffFilesPaths,
  comments,
) => {
  let areTargetPathsChanged = checkDiff(paths, diffFilesPaths);

  if (areTargetPathsChanged) {
    const isCommentExisting = comments.some(
      (comment) =>
        comment.user === "github-actions[bot]" &&
        compareMarkdown(comment.body, message),
    );

    return isCommentExisting ? false : true;
  }

  return false;
};

export default postComment;
