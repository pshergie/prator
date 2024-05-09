const { minimatch } = require("minimatch");

const checkDiff = (paths, diffFilesPaths) => {
  if (Array.isArray(paths)) {
    return paths.some((path) =>
      diffFilesPaths.some(
        (diffPath) => diffPath.includes(path) || minimatch(diffPath, path),
      ),
    );
  } else {
    throw new Error(
      `Wrong type for 'paths' variable (${typeof paths}). Make sure you followed the formatting rules.`,
    );
  }
};

export default checkDiff;
