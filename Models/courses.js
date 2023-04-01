/** @format */

const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [100, "Name should be under 100 characters"],
  },

  image: {
    type: String,
  },

  batch: {
    type: String,
    required: true,
  },

  details: [
    {
      id: Number,
      title: String,
      isFolder: Boolean,
      isVideo: Boolean,
      items: [
        {
          id: Number,
          subtitle: String,
          isFolder: Boolean,
          isVideo: Boolean,
          src: String,
          duration: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Course", courseSchema);
