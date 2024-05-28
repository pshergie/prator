const getDataPath = (core) => {
  const dataPath = core.getInput("data-path");

  if (!dataPath) {
    throw new Error("The dataPath variable is empty, please provide it.");
  }

  return dataPath;
};

export default getDataPath;
