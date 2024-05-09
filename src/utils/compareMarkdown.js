const compareMarkdown = (comment, message) => {
  return comment.replaceAll("- [x]", "- [ ]") === message;
};

export default compareMarkdown;
