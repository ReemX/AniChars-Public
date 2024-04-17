const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      unique: [true, "There cannot be two countries with the same name!"],
    },
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

locationSchema.virtual("users", {
  ref: "User",
  foreignField: "location",
  localField: "_id",
});

locationSchema.pre("find", function (next) {
  this.populate({
    path: "users",
    select: "_id",
  });
  next();
});

locationSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  const geoReq = await fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${this.country}&apiKey=${process.env.GEOLOCATION_API_KEY}`,
  );
  const geoData = await geoReq.json();
  this.coordinates.lat = geoData.features[0].properties.lat;
  this.coordinates.lng = geoData.features[0].properties.lon;
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
