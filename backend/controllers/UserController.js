const User = require("../models/UserModel");

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
        return res.status(200).json({ message: "Movie added successfully" });
      } else {
        return res
          .status(400)
          .json({ message: "Movie already added to the liked list ..." });
      }
    } else {
      await User.create({ email, likedMovies: [data] });
      return res.status(200).json({ message: "Movie added successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error adding movie" });
  }
};

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json({
        message: "Successfully fetched movies",
        movies: user.likedMovies,
      });
    } else {
      return res
        .status(400)
        .json({ message: "User with given email not found!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching movies!" });
  }
};

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieIndex = likedMovies.findIndex(({ id }) => id === movieId);

      if (!movieIndex) {
        return res.status(400).json({ message: "Movie not found!" });
      }

      likedMovies.splice(movieIndex, 1);

      await User.findByIdAndUpdate(
        user._id,
        {
          likedMovies,
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "Movie removed successfully", movies: likedMovies });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error removing movie!" });
  }
};
