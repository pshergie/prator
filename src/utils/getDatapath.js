const getDatapath = (core) => {
  core.getInput("datapath");

  if (!datapath) {
    throw new Error("The datapath variable is empty, please provide it.");
  }
};
