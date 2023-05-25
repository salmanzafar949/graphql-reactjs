import github from "./db";
import {useEffect, useState, useCallback} from "react";
import githubQuery from "./Query";
import RepoInfo from "./RepoInfo";
import SearchBox from "./SearchBox";
import NavButton from "./NavButton";

function App() {

    const [name, setName] = useState(null)
    const [repos, setRepos] = useState(null)
    const [pageCount, setPageCount] = useState(10)
    const [queryString, setQueryString] = useState("")
    const [totalCount, setTotalCount] = useState(0)
    const [startCursor, setStartCursor] = useState(null)
    const [endCursor, setEndCursor] = useState(null)
    const [hasPreviousPage, setHasPreviousPage] = useState(false)
    const [hasNextPage, setHasNextPage] = useState(true)
    const [paginationKeyWord, setPaginationKeyWord] = useState("first")
    const [paginationString, setPaginationString] = useState("")

    const fetchData = useCallback(() => {
        let queryText = JSON.stringify(githubQuery(pageCount, queryString, paginationKeyWord, paginationString))

        fetch(github.baseurl, {
            method: "POST",
            headers: github.headers,
            body: queryText,
        })
            .then((response) => response.json())
            .then((data) => {
                const viewer = data.data.viewer
                const repos = viewer?.repositories?.nodes ?? data.data.search.edges
                const count = data.data.search.repositoryCount
                const pageInfo = data.data.search?.pageInfo

                setName(viewer.name);
                setRepos(repos)
                setTotalCount(count)
                setStartCursor(pageInfo?.startCursor)
                setEndCursor(pageInfo?.endCursor)
                setHasNextPage(pageInfo?.hasNextPage)
                setHasPreviousPage(pageInfo?.hasPreviousPage)

            })
            .catch((err) => {
                console.log(err);
            });
    }, [pageCount, queryString, paginationString, paginationKeyWord]);

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
            <NavButton
                start={startCursor}
                end={endCursor}
                next={hasNextPage}
                previous={hasPreviousPage}
                onPage={(myKeyword, myString) => {
                    setPaginationKeyWord(myKeyword);
                    setPaginationString(myString);
                }}
            />
            {
                repos && (
                    <ul className="list-group list-group-flush">
                        {
                            repos.map((repo, index) => <RepoInfo repo={repo.node} key={index}/>)
                        }
                    </ul>
                )
            }
            <NavButton
                start={startCursor}
                end={endCursor}
                next={hasNextPage}
                previous={hasPreviousPage}
                onPage={(myKeyword, myString) => {
                    setPaginationKeyWord(myKeyword);
                    setPaginationString(myString);
                }}
            />
        </div>
    );
}

export default App;
