import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import backgroudImage from "../../assets/home.jpg";
import movieLogo from "../../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../../store";
import Slider from "../../components/Slider";
import "./Flixxit.css";

const Flixxit = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const genresLoaded = useSelector((state) => state.flixxit.genresLoaded);
  const movies = useSelector((state) => state.flixxit.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded]);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className="flixxit-container">
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img
          src={backgroudImage}
          alt="background"
          className="background-image"
        />
        <div className="container">
          <div className="logo">
            <img src={movieLogo} alt="Movie logo" />
          </div>
          <div className="buttons flex">
            <button
              className="flex j-center a-center"
              onClick={() => navigate("/player")}
            >
              <FaPlay /> Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle /> More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </div>
  );
};

export default Flixxit;
