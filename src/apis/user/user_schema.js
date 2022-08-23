const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    first: {
      type: String,
      required: true,
      trim: true,
    },
    last: {
      type: String,
      required: true,
      trim: true,
    },
  },
  interests: [
    {
      type: String,
      trim: true,
    },
  ],
  geolocation: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
