const githubQuery = {
    query: `
      {
  viewer {
    name
    repositories(first: 10) {
      nodes {
        name
        description
        url
        id
      }
    }
  }
}
    `,
};

export default githubQuery