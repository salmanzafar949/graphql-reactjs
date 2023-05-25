const githubQuery = (pageCount, queryString, paginationKeyWord, paginationString) => {
    return {
        query: `
        {
  viewer {
    name
  }
  search(
    query: "${queryString} user:salmanzafar949 sort:updated-desc"
    type: REPOSITORY
    ${paginationKeyWord}: ${pageCount}
    ${paginationString}
  ) {
    repositoryCount
    edges {
      cursor
      node {
        ... on Repository {
          name
          description
          id
          url
          viewerSubscription
          licenseInfo {
            spdxId
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
        `,
    }
};

export default githubQuery