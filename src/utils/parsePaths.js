import splitPaths from "./splitPaths";

// configs не массив
const parsePaths = config => {
  if (!config.allCasesPaths && !config.modifiedOnlyPaths && !config.addedOnlyPaths && !config.deletedOnlyPaths) {
    throw new Error(`The config should have at least one path. Config #${i + 1}.${config.message ? ' Message:' + config.message : ''} `);
  };

  return {
    allCasesPaths: splitPaths(config.allCasesPaths),
    modifiedOnlyPaths: splitPaths(config.modifiedOnlyPaths),
    addedOnlyPaths: splitPaths(config.addedOnlyPaths),
    deletedOnlyPaths: splitPaths(config.deletedOnlyPaths),
  }
}

export default parsePaths;
