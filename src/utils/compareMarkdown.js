const compareMarkdown = (comment, message) =>
  comment.replaceAll("- [x]", "- [ ]") === message;

export default compareMarkdown;
