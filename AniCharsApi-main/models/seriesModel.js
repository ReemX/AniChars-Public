const mongoose = require("mongoose");

const seriesSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "A series must have a title"],
    unique: [true, "A series title must be unique"],
  },
  type: {
    type: String,
    default: "TV",
    enum: ["TV", "OVA", "Movie", "Special", "ONA", "Music", "PV"],
  },
  image: { type: String, default: "default-series.jpeg" },
  aired: Date,
  episodes: { type: Number, default: 1 },
  status: {
    type: String,
    enum: ["Finished Airing", "Currently Airing", "Not yet aired"],
  },
  synopsis: String,
  background: String,
  mal_id: {
    type: Number,
    required: [true, "A series must have a mal ID"],
    unique: [true, "A series mal ID must be unique"],
  },
});

const Series = mongoose.model("Series", seriesSchema);

module.exports = Series;
