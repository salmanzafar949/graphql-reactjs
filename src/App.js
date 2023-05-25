import github from "./db";
import {useEffect, useState, useCallback} from "react";
import githubQuery from "./Query";
import RepoInfo from "./RepoInfo";
import SearchBox from "./SearchBox";

function App() {

    const [name, setName] = useState(null)
    const [repos, setRepos] = useState(null)
    const [pageCount, setPageCount] = useState(10)
    const [queryString, setQueryString] = useState("")
    const [totalCount, setTotalCount] = useState(0)

    const fetchData = useCallback(() => {
        let queryText = JSON.stringify(githubQuery(pageCount, queryString))

        fetch(github.baseurl, {
            method: "POST",
            headers: github.headers,
            body: queryText,
        })
            .then((response) => response.json())
            .then((data) => {
                const viewer = data.data.viewer
                const repos = viewer?.repositories?.nodes ?? data.data.search.nodes
                const count = data.data.search.repositoryCount
                setName(viewer.name);
                setRepos(repos)
                setTotalCount(count)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [pageCount, queryString]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="App container mt-5">
            <h1 className="text-primary">
                <i className="bi bi-diagram-2-fill"/> Repos
            </h1>
            <p>
                Hey there, {name}
            </p>
            <SearchBox onQueryStringChange={setQueryString} queryString={queryString} onTotalChange={setPageCount} pageCount={pageCount} totalCount={totalCount}/>
            {
                repos && (
                    <ul className="list-group list-group-flush">
                        {
                            repos.map((repo, index) => <RepoInfo repo={repo} key={index}/>)
                        }
                    </ul>
                )
            }
        </div>
    );
}

export default App;
