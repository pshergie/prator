const compareMarkdown = (comment, message) => {
  console.log('comment', comment);
  console.log('message', message);
  console.log('=================================');

  return comment.replaceAll("- [x]", "- [ ]").includes(message);
};

export default compareMarkdown;
