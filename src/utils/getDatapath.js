const getDatapath = (core) => {
  const datapath = core.getInput("datapath");

  if (!datapath) {
    throw new Error("The datapath variable is empty, please provide it.");
  }

  return datapath;
};
