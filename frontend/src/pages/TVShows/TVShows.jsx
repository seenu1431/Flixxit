import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres } from "../../store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../utils/firebase-config";
import Navbar from "../../components/Navbar/Navbar";
import NotAvailable from "../../components/NotAvailable";
import Slider from "../../components/Slider";
import SelectGenre from "../../components/SelectGenre/SelectGenre";
import "./TVShows.css";

const TVShows = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const genresLoaded = useSelector((state) => state.flixxit.genresLoaded);
  const movies = useSelector((state) => state.flixxit.movies);
  const genres = useSelector((state) => state.flixxit.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "tv" }));
  }, [genresLoaded]);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    // if (currentUser) navigate("/");
  });

  return (
    <div className="tv-shows-container">
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        <SelectGenre genres={genres} type="tv" />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </div>
  );
};

export default TVShows;
