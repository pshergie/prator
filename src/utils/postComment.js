import checkDiff from "./checkDiff.js";
import compareMarkdown from "./compareMarkdown.js";

const postComment = async (
  prependMsg,
  paths,
  message,
  pullNumber,
  diffFilesPaths,
  comments,
  context,
  octokit,
) => {
  let areTargetPathsChanged = checkDiff(paths, diffFilesPaths);
  const body = prependMsg ? `${prependMsg}\n\n` + message : message;

  console.log('comments', comments);

  if (areTargetPathsChanged) {
    const isCommentExisting = comments.some(
      (comment) =>
        comment.user === "github-actions[bot]" &&
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
