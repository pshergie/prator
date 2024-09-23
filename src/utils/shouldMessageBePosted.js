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

  if (!paths || messagesToPost.includes(message)) {
    return false;
  }

  console.log('');
  console.log('messagesToPost', messagesToPost);
  console.log('message', message)
  console.log('');

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
