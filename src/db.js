const github = {
    baseurl: process.env.REACT_APP_API_URL,
    username: "salmanzafar949",
    headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
    }
}

export default github