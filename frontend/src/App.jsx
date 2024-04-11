import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Flixxit from "./pages/Flixxit/Flixxit";
import Player from "./pages/Player/Player";
import Movies from "./pages/Movies/Movies";
import TVShows from "./pages/TVShows/TVShows";
import UserLiked from "./pages/UserLiked/UserLiked";
import Pricing from "./pages/Pricing/Pricing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/tv" element={<TVShows />} />
        <Route exact path="/mylist" element={<UserLiked />} />
        <Route exact path="/pricing" element={<Pricing />} />
        <Route exact path="/" element={<Flixxit />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
