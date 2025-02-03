import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const apiKey = "2936336f57a8803ef5409f3d6e14658d";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-block mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Kembali ke Beranda
        </Link>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="w-full md:w-2/3">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <p className="text-gray-400 text-lg mb-4">{movie.tagline}</p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-yellow-400 text-xl">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-400">{movie.runtime} menit</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Sinopsis</h2>
              <p className="text-gray-300">{movie.overview}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold">Tanggal Rilis</h3>
                <p className="text-gray-400">{movie.release_date}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Budget</h3>
                <p className="text-gray-400">
                  ${movie.budget.toLocaleString()}
                </p>
              </div>
            </div>

            {movie.homepage && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold">Website Resmi</h3>
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {movie.homepage}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;