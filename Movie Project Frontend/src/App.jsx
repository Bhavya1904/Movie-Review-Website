import { useState, useEffect } from 'react';
import api from './api/axiosConfig.js';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Home from './components/hero/Hero.jsx';
import Header from './components/header/Header.jsx';
import Trailer from './components/trailer/Trailer.jsx';
import Reviews from './components/reviews/Reviews.jsx';
import NotFound from './components/notFound/NotFound.jsx';

function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMovies = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await api.get("/api/v1/movies");
      console.log('API Response:', response.data);  // Add this line
      setMovies(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch movies');
      console.log(err);
    }
  };

  const getMovieData = async (movieId) => {
    try {
        const response = await api.get(`/api/v1/movies/${movieId}`);
        const singleMovie = response.data;
        setMovie(singleMovie);
        setReviews(singleMovie.reviewIds);
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    getMovies();
  }, [])

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />} />
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
          <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

