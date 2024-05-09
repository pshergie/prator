const fetchDiffFiles = async (context, pullNumber, octokit) => {
  let data = [];
  let pagesRemaining = true;
  let page = 1;

  while (pagesRemaining) {
    const response = await octokit.rest.pulls.listFiles({
      ...context.repo,
      pull_number: pullNumber,
      per_page: 100,
      page,
    });

    const parsedData = response.data.map((diff) => diff.filename);
    data = [...data, ...parsedData];
    const linkHeader = response.headers.link;
    pagesRemaining = linkHeader && linkHeader.includes(`rel=\"next\"`);
    page++;
  }

  return data;
};

export default fetchDiffFiles;
