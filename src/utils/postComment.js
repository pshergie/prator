import checkDiff from "./checkDiff.js";
import compareMarkdown from "./compareMarkdown.js";

const postComment = async (
  prependMsg,
  messagesToPost,
  pullNumber,
  context,
  octokit,
) => {
  const message = messagesToPost.split().join('\n\n');
  const body = prependMsg ? `${prependMsg}\n\n` + message : message;

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
