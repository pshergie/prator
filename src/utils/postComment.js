import checkDiff from "./checkDiff.js";

const postComment = async (
  signature,
  paths,
  message,
  pullNumber,
  diffFilesPaths,
  comments,
  context,
  octokit,
) => {
  let areTargetPathsChanged = checkDiff(paths, diffFilesPaths);
  const signaturedMessage = signature ? `${signature}\n\n` + message : message;

  if (areTargetPathsChanged) {
    const isCommentExisting = comments.some(
      (comment) =>
        comment.user.login === "github-actions[bot]" &&
        comment.body === signaturedMessage,
    );

    if (!isCommentExisting) {
      await octokit.rest.issues.createComment({
        ...context.repo,
        issue_number: pullNumber,
        body: signaturedMessage,
      });
    }
  }
};

export default postComment;
