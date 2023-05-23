import github from "./db";
import {useEffect, useState, useCallback} from "react";
import githubQuery from "./Query";

function App() {

    const [name, setName] = useState(null)
    const [repos, setRepos] = useState(null)

    const fetchData = useCallback(() => {
        fetch(github.baseurl, {
            method: "POST",
            headers: github.headers,
            body: JSON.stringify(githubQuery),
        })
            .then((response) => response.json())
            .then((data) => {
                const viewer = data.data.viewer
                const repos = viewer.repositories.nodes
                setName(viewer.name);
                setRepos(repos)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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
            {
                repos && (
                    <ul className="list-group list-group-flush">
                        {
                            repos.map((repo, index) => (
                                <li className="list-group-item" key={index}>
                                    <a className="h5 mb-0 text-decoration-none" href={repo.url}>
                                        {repo.name}
                                    </a>
                                    <p className="small">{repo.description}</p>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </div>
    );
}

export default App;
