const mongoose = require("mongoose");
const Character = require("./characterModel");

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  character: {
    type: mongoose.Schema.ObjectId,
    ref: "Character",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: (val) => val % 1 === 0,
      message: "A rating must be a whole number.",
    },
  },
});

ratingSchema.statics.calcAverageRatings = async function (characterId) {
  const stats = await this.aggregate([
    {
      $match: { character: characterId },
    },
    {
      $group: {
        _id: "$character",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0)
    await Character.findByIdAndUpdate(characterId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  else
    await Character.findByIdAndUpdate(characterId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
};

ratingSchema.index({ user: 1, character: 1 }, { unique: true });

ratingSchema.post("save", function (next) {
  this.constructor.calcAverageRatings(this.character);
});

ratingSchema.pre(/^findOneAnd/, async function (next) {
  this.doc = await this.clone().findOne();
  next();
});

ratingSchema.post(/^findOneAnd/, async function (next) {
  this.doc.constructor.calcAverageRatings(this.doc.character);
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
