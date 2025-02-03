import { useState } from "react";
import { Link } from "react-router-dom";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const moviesPerPage = 8;
  const apiKey = "YOUR-API-KEY";

  const startIndex = (currentPage - 1) * moviesPerPage;
  const displayedMovies = movies.slice(startIndex, startIndex + moviesPerPage);

  const searchMovies = async (page = 1) => {
    if (!query) return;

    setIsLoading(true);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
      setCurrentPage(page);
      setTotalPages(Math.ceil(data.results.length / moviesPerPage));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Movie Search 🎥</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchMovies();
          }}
          className="flex justify-center"
        >
          <input
            type="text"
            placeholder="Cari film..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-64 px-4 py-2 rounded-l-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <i className="bx bx-search text-black text-xl font-bold"></i>
          </button>
        </form>
      </div>

      <div className="max-w-6xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : movies.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedMovies.map((movie) => (
                <Link
                  to={`/movie/${movie.id}`}
                  key={movie.id}
                  className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/500x750?text=No+Image"
                    }
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                    <p className="text-gray-400 text-sm line-clamp-3">
                      {movie.overview}
                    </p>
                    <p className="text-gray-300 mt-2">
                      Rating: {movie.vote_average}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-blue-700"
              >
                Previous
              </button>
              <span className="text-gray-400 self-center">
                Halaman {currentPage} dari {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-400">
            Tidak ada film yang ditemukan. Coba cari film lain!
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;