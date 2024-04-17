const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// validator search query function
const isValidSearchQuery = (query) => {
  const regex = /^[a-zA-Z0-9\s]+$/;
  return regex.test(query);
};

// function for parsing series search data
const seriesSearchParser = (data) => {
  if (!data) return [];
  return data.map((series) => {
    const genres = series.genres.map((genre) => genre.name);
    return {
      malId: series.mal_id,
      title: series.title,
      genres,
      image: series.images.jpg.image_url,
      stats: {
        type: series.type,
        year: new Date(series.aired.from).getFullYear(),
      },
    };
  });
};

// function for parsing character search data
const characterSearchParser = (data) => {
  if (!data) return [];
  return data.map((chara) => {
    return {
      malId: chara.mal_id,
      name: chara.name,
      image: chara.images.jpg.image_url,
    };
  });
};

// function for making api endpoint links more easily
const getApiEndpoint = (type, query, page, limit) => {
  if (!isValidSearchQuery(query)) query = "";
  const orderField = type === "characters" ? "favorites" : "members";
  return `https://api.jikan.moe/v4/${type}?q=${query}&order_by=${orderField}&sort=desc&limit=${limit}&page=${page}`;
};

// function for getting both character and series search results
exports.getMixedResults = catchAsync(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;

  const charactersFetch = await fetch(
    getApiEndpoint("characters", req.params.query, page, limit),
  );

  const seriesFetch = await fetch(
    getApiEndpoint("anime", req.params.query, page, limit),
  );

  const { data: charactersRaw } = await charactersFetch.json();
  const { data: seriesRaw } = await seriesFetch.json();

  const series = seriesSearchParser(seriesRaw);
  const characters = characterSearchParser(charactersRaw);

  res.status(200).json({
    status: "success",
    data: {
      series,
      characters,
    },
  });
});

// general function for getting either characters or series search results seperatly
const getSearchResults = async (req, res, next, type) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  let data = {
    data: [],
    pagination: [],
  };

  const searchFetch = await fetch(
    getApiEndpoint(type, req.params.query, page, limit),
  );

  const { data: searchRaw, pagination: pages } = await searchFetch.json();
  data.data = searchRaw;
  data.pagination = pages;

  const results =
    type === "characters"
      ? characterSearchParser(data.data)
      : seriesSearchParser(data.data);

  res.status(200).json({
    status: "success",
    pagination: data.pagination,
    data: results,
  });
};

// function that use "getSearchResults" to get specific seperate data
exports.getCharacterResults = catchAsync(async (req, res, next) => {
  await getSearchResults(req, res, next, "characters");
});

exports.getSeriesResults = catchAsync(async (req, res, next) => {
  await getSearchResults(req, res, next, "anime");
});

// function for getting ALL characters from a certain series (mal ID)
exports.getCharacterBySeries = catchAsync(async (req, res, next) => {
  const fetchRes = await fetch(
    `https://api.jikan.moe/v4/anime/${req.params.SeriesMalId}/characters`,
  );
  const { data } = await fetchRes.json();

  if (!data) return next(new AppError("No anime with that mal ID found!", 404));

  data.sort((a, b) => b.favorites - a.favorites);

  const characters = data.map(({ character }) => {
    return {
      malId: character.mal_id,
      name: character.name,
      image: character.images.jpg.image_url,
    };
  });

  res.status(200).json({
    status: "success",
    results: data.length,
    data: characters,
  });
});
