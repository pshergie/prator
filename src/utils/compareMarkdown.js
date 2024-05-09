const compareMarkdown = (comment, message) => {
  conole.log("comment replaced", comment.replaceAll("- [x]", "- [ ]"));
  console.log("message", message);
  console.log(comment.replaceAll("- [x]", "- [ ]") === message);
  return comment.replaceAll("- [x]", "- [ ]") === message;
};

export default compareMarkdown;
