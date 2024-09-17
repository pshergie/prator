import splitPaths from "./splitPaths";

const parsePaths = configs => configs.map((config, i) => {
  if (!config.allCasesPaths && !config.modifiedOnlyPaths && !config.addedOnlyPaths && !config.deletedOnlyPaths) {
    throw new Error(`The config should have at least one path. Config #${i + 1}.${config.message ? ' Message:' + config.message : ''} `);
  };

  return {
    allCasesPaths: splitPaths(config.allCasesPaths),
    modifiedOnlyPaths: splitPaths(config.modifiedOnlyPaths),
    addedOnlyPaths: splitPaths(config.addedOnlyPaths),
    deletedOnlyPaths: splitPaths(config.deletedOnlyPaths),
    message: config.message
  }
})

export default parsePaths;
