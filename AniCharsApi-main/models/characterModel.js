const mongoose = require("mongoose");

// function for generating a random stat number between 1 and 100
const randomStatGenerator = () => Math.floor(Math.random() * (100 - 1)) + 1;

const characterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A character must have a name"],
      unique: [true, "A character name must be unique"],
    },
    about: {
      type: String,
    },
    image: { type: String, default: "default-character.jpeg" },
    stats: {
      hp: { type: Number, default: () => randomStatGenerator() },
      attack: { type: Number, default: () => randomStatGenerator() },
      defense: { type: Number, default: () => randomStatGenerator() },
      speed: { type: Number, default: () => randomStatGenerator() },
      charisma: { type: Number, default: () => randomStatGenerator() },
    },
    series: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Series",
      required: [true, "A character must have a series"],
    },
    mal_id: {
      type: Number,
      required: [true, "A character must have a mal ID"],
      unique: [true, "A characters mal ID must be unique"],
    },
    searched: {
      type: Number,
      default: 0.5,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (value) => value.toFixed(2),
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

characterSchema.virtual("ratings", {
  ref: "Rating",
  foreignField: "character",
  localField: "_id",
});

characterSchema.pre("findOne", function (next) {
  this.populate({ path: "ratings", select: "rating" }).populate({
    path: "series",
    select: "mal_id title",
  });
  next();
});

const timesSearchedPerRequest = 2;
characterSchema.post("findOne", async function (doc, next) {
  if (!doc) return next();
  doc.searched += 1 / timesSearchedPerRequest;
  await doc.save();
  next();
});

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
