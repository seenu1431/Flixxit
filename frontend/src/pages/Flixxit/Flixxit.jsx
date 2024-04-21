
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import backgroudImage from "../../assets/home.jpg";
import movieLogo from "../../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../../store";
import Slider from "../../components/Slider";
import "./Flixxit.css";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../utils/firebase-config";
import axios from "axios";

const Flixxit = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const genresLoaded = useSelector((state) => state.flixxit.genresLoaded);
  const movies = useSelector((state) => state.flixxit.movies);
  const [email, setEmail] = useState(undefined);
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

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setEmail(currentUser.email);
      } else navigate("/login");
    });
  }, [navigate]);

  const addToList = async () => {
    try {
      // Fetch data for the movie
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/66732?api_key=e79bfbb6fd29c514b77f7941a63cf423`
      );
      const movie = response.data;

      const movieGenres = [];

      movie.genres.forEach((genre) => {
        const name = movie.genres.find(({ id }) => id === genre.id);
        if (name) {
          movieGenres.push(name.name);
        }
      });

      const movieData = {
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        media_type: movie?.media_type,
        genres: movieGenres.slice(0, 3),
      };

      if (movieData) {
        await axios.post("https://flixxit-main.onrender.com/api/user/add", {
          email,
          data: movieData,
        });
      }
    } catch (error) {
      console.log(error);
    }
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
            <button className="flex j-center a-center" onClick={addToList}>
              <AiOutlinePlus /> Add to list
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </div>
  );
};

export default Flixxit;
