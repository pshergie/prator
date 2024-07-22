import checkDiff from "./checkDiff.js";
import compareMarkdown from "./compareMarkdown.js";

const shouldMessageBePosted = (
  paths,
  message,
  diffFilesPaths,
  comments,
  messagesToPost,
) => {
  let areTargetPathsChanged = checkDiff(paths, diffFilesPaths);

  if (!pathCase || messagesToPost.includes(message)) {
    return false;
  }

  if (areTargetPathsChanged) {
    const isCommentExisting = comments.some(
      comment =>
        comment.user.login === "github-actions[bot]" &&
        compareMarkdown(comment.body, message),
    );

    return isCommentExisting ? false : true;
  };

  return false;
};

export default shouldMessageBePosted;
