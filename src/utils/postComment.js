const postComment = async (
  prependMsg,
  messagesToPost,
  pullNumber,
  context,
  octokit,
) => {
  const message = messagesToPost.join('\n\n');
  const body = prependMsg ? `${prependMsg}\n\n` + message : message;

  await octokit.rest.issues.createComment({
    ...context.repo,
    issue_number: pullNumber,
    body,
  });
};

export default postComment;
