const Character = require("../models/characterModel");
const Series = require("../models/seriesModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { getAll, getOne, fetchAndCreateSeries } = require("./handlerFactory");

// middleware for checking and caching characters when necceccary
exports.cachedCharacter = catchAsync(async (req, res, next) => {
  // checking if character already exists in DB
  const cachedChara = await Character.findOne({ mal_id: req.params.malId });

  // if it is then it also 100% has a series accosiated with it so we can attack it to the req and go on
  if (cachedChara) {
    req.params.id = cachedChara._id;
    return next();
  }

  // if its not found then we fetch it from the jikan api
  const characterFetch = await fetch(
    `https://api.jikan.moe/v4/characters/${req.params.malId}/full`,
  );
  const { data: characterData } = await characterFetch.json();

  if (!characterData)
    return next(new AppError("No character with that ID found!", 404));

  const { mal_id: malIdChar, name, about, images, anime } = characterData;

  // getting the anime Mal ID in order to check if we already have the series in DB
  const animeId = `${anime[0].anime.mal_id}`;

  // checking if it exists in DB
  const cachedSeries = await Series.findOne({ mal_id: animeId });

  // if it is then create a new character without creating its relative series
  if (cachedSeries) {
    const newCharacter = {
      mal_id: malIdChar,
      name,
      about,
      image: images.jpg.image_url,
      series: cachedSeries._id,
    };
    const character = await Character.create(newCharacter);

    // getting the character DB ID for the next middleware in the stuck
    req.params.id = character._id;
    return next();
  }

  // if no series is found we use the mal ID in order to fetch it from the jikan api and create it in the database
  const seriesData = await fetchAndCreateSeries(animeId, Series);

  if (!seriesData)
    return next(new AppError("No series found with that ID", 404));

  // after the series is created we can safely create the character and give it its relative series ID
  const newCharacter = {
    mal_id: malIdChar,
    name,
    about,
    image: images.jpg.image_url,
    series: seriesData._id,
  };
  const character = await Character.create(newCharacter);
  req.params.id = character._id;
  next();
});

// factory handlers
exports.getCharacter = getOne(Character);
exports.getAllCharacters = getAll(Character);
