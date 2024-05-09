import checkDiff from "./checkDiff.js";
import compareMarkdown from "./compareMarkdown.js";

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
  const body = signature ? `${signature}\n\n` + message : message;

  if (areTargetPathsChanged) {
    const isCommentExisting = comments.some(
      (comment) =>
        comment.user.login === "github-actions[bot]" &&
        compareMarkdown(comment.body, body),
    );

    if (!isCommentExisting) {
      await octokit.rest.issues.createComment({
        ...context.repo,
        issue_number: pullNumber,
        body,
      });
    }
  }
};

export default postComment;
