const fetchComments = async (context, pullNumber, octokit) => {
  let data = [];
  let pagesRemaining = true;
  let page = 1;

  while (pagesRemaining) {
    const response = await octokit.rest.issues.listComments({
      ...context.repo,
      issue_number: pullNumber,
      per_page: 100,
      page,
    });

    data = [...data, ...response.data];
    const linkHeader = response.headers.link;
    pagesRemaining = linkHeader && linkHeader.includes(`rel=\"next\"`);
    page++;
  }

  return data;
};

export default fetchComments;
