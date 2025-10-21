import React, { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  // Função que faz a requisição à API
  const fetchMovies = async (searchTerm) => {
    try {
      setError("");
      const res = await fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
      if (!res.ok) throw new Error("Erro ao buscar filmes.");
      const data = await res.json();

      if (data.length === 0) {
        setError("Nenhum filme encontrado.");
      }

      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro na busca.");
    }
  };

  // Busca manual quando o usuário clica no botão
  const handleSearch = () => {
    if (!query.trim()) {
      setError("Digite algo para buscar!");
      return;
    }
    fetchMovies(query);
  };

  return (
    <div className="app">
      <h1>Buscador de Filmes 🎬</h1>

      <div className="search-container">
        <div className="search">
          <input
            type="text"
            placeholder="Digite o nome do filme..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="movies">
        {results.length > 0 && results.map((item) => {
          const movie = item.show;
          return (
            <div key={movie.id} className="movie-card">
              {movie.image ? (
                <img src={movie.image.medium} alt={movie.name} />
              ) : (
                <div className="no-image">Sem imagem</div>
              )}
              <h2>{movie.name}</h2>
              <p><strong>Lançamento:</strong> {movie.premiered || "Não informado"}</p>
              <p><strong>Gêneros:</strong> {movie.genres.length > 0 ? movie.genres.join(", ") : "Não informado"}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
