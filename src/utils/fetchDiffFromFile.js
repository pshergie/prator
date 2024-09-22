const fs = require("fs");

const fetchDiffFromFile = (type) => fs.readFileSync(`${artifactPath}pr_files_diff_${type}.txt`, "utf8").split('\n').filter(Boolean);

export default fetchDiffFromFile;
