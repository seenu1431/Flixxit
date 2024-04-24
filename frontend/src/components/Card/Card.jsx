/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../utils/firebase-config";
import { useDispatch } from "react-redux";
import { removeFromLikedMovies } from "../../store/index";
import "./Card.css";

export default React.memo(function Card({ index, movieData, isLiked = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);

  const location = useLocation();
  const isMovie = location.pathname === "/movies";

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setEmail(currentUser.email);
      } else navigate("/login");
    });
  }, [navigate]);

  const addToList = async () => {
    try {
      await axios.post("https://flixxit-main-x231.onrender.com/api/user/add", {
        email,
        data: movieData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getVideoUrl = () => {
    if (movieData.media_type) {
      return `
        https://api.themoviedb.org/3/${movieData.media_type}/${movieData.id}/videos`;
    } else {
      if (isMovie) {
        return `
        https://api.themoviedb.org/3/movie/${movieData.id}/videos`;
      } else {
        return `
        https://api.themoviedb.org/3/tv/${movieData.id}/videos`;
      }
    }
  };

  return (
    <div
      className="card-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="card"
        onClick={() =>
          navigate("/player", {
            state: {
              videoUrl: getVideoUrl(),
            },
          })
        }
      />

      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="card"
              onClick={() =>
                navigate("/player", {
                  state: {
                    videoUrl: getVideoUrl(),
                  },
                })
              }
            />
          </div>
          <div className="info-container flex column">
            <h3
              className="name"
              onClick={() =>
                navigate("/player", {
                  state: {
                    videoUrl: getVideoUrl(),
                  },
                })
              }
            >
              {movieData.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp
                  title="Play"
                  onClick={() =>
                    navigate("/player", {
                      state: {
                        videoUrl: getVideoUrl(),
                      },
                    })
                  }
                />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                {isLiked ? (
                  <BsCheck
                    title="Remove from List"
                    onClick={() =>
                      dispatch(
                        removeFromLikedMovies({ movieId: movieData.id, email })
                      )
                    }
                  />
                ) : (
                  <AiOutlinePlus title="Add to my list" onClick={addToList} />
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {movieData.genres.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});