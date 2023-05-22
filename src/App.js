import github from "./db";
import {useEffect, useState, useCallback} from "react";
import githubQuery from "./Query";

function App() {

    const [name, setName] = useState(null)
    const fetchData = useCallback(() => {
        fetch(github.baseurl, {
            method: "POST",
            headers: github.headers,
            body: JSON.stringify(githubQuery),
        })
            .then((response) => response.json())
            .then((data) => {
                setName(data.data.viewer.name);
                console.log(data);
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
        </div>
    );
}

export default App;
