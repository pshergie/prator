const getRulesPath = (core) => {
  const rulesPath = core.getInput("rules-path");

  if (!rulesPath) {
    throw new Error("The rulesPath variable is empty, please provide it.");
  }

  return rulesPath;
};

export default getRulesPath;
