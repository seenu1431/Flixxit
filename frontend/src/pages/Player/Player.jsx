
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";
import { API_KEY } from "../../utils/constants";
import "./Player.css";

const Player = () => {
  const [movieVideos, setMovieVideos] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  let videoUrl = "";

  // Retrieve the video URL
  if (location.state) {
    videoUrl = location.state.videoUrl;
  } else {
    videoUrl = `https://api.themoviedb.org/3/tv/66732/videos`;
  }

  let video = {};

  // Get trailer for a movie
  const getVideo = async (videoUrl) => {
    try {
      if (videoUrl) {
        await axios.get(`${videoUrl}?api_key=${API_KEY}`).then((res) => {
          setMovieVideos(res.data.results);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Get trailer for a movie
    if (videoUrl) {
      getVideo(videoUrl);
    }
  }, [videoUrl]);

  // Get official trailer
  const getOfficialTrailer = () => {
    if (movieVideos) {
      return movieVideos.find((vid) => {
        video = vid.name === "Official Trailer";
        if (video) {
          return video;
        } else {
          return vid.type === "Trailer";
        }
      });
    }
  };

  return (
    <div className="player-container">
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        {movieVideos ? (
          <YouTube
            videoId={getOfficialTrailer()?.key}
            className="youtube"
            opts={{
              width: "100%",
              height: "100%",
            }}
          />
        ) : (
          <video src={video} autoPlay loop controls muted></video>
        )}
      </div>
    </div>
  );
};

export default Player;
