import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  let [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "New repository",
      url: "https://alternativeagencia.com.br",
      techs: ["ReactJS", "NodeJS", "VueJS"],
      likes: "0",
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if (response.status === 400) {
      console.log("Repository not found");
    }

    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );

    repositories.splice(repositoryIndex, 1);

    setRepositories((repositories = [...repositories]));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
