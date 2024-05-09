const compareMarkdown = (comment, message) => {
  console.log("");
  console.log("comment replaced", comment.replaceAll("- [x]", "- [ ]"));
  console.log("message", message);
  console.log("replaced", comment.replaceAll("- [x]", "- [ ]") === message);
  console.log("not replaced", comment === message);
  console.log("");
  return comment.replaceAll("- [x]", "- [ ]") === message;
};

export default compareMarkdown;
