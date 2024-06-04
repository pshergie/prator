const compareMarkdown = (comment, message) => {
  return comment.replaceAll("- [x]", "- [ ]").includes(message);
};

export default compareMarkdown;
