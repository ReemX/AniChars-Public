const sharp = require("sharp");
const AppError = require("../utils/AppError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");

// function for checking to see if a user is trying to modify other users resources, admin has no restrictions
const checkDocumentPermission = async (model, req, next) => {
  const doc = await model.findById(req.params.id);

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  if (req.user.role !== "admin" && doc.user && !doc.user.equals(req.user.id)) {
    return next(
      new AppError(
        "You cannot modify or delete the document of another user!",
        403,
      ),
    );
  }
};

// general function for deleting resources
exports.deleteOne = (model) =>
  catchAsync(async (req, res, next) => {
    await checkDocumentPermission(model, req, next);

    await model.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

// general function for updating resources
exports.updateOne = (model) =>
  catchAsync(async (req, res, next) => {
    await checkDocumentPermission(model, req, next);

    const updatedDoc = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: updatedDoc,
    });
  });

// general function for creating resources
exports.createOne = (model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await model.create(req.body);

    res.status(201).json({
      status: "success",
      data: newDoc,
    });
  });

// general function for getting resources
exports.getOne = (model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

// general function for getting all queries from recources
exports.getAll = (model) =>
  catchAsync(async (req, res, next) => {
    let filter;
    // if user for example searches for all comments by character ID then this is the most simple way of a achiving that without complicating things
    if (req.params.characterId) filter = { character: req.params.characterId };

    // attaching many features like filter, sort, limit, page to the get all function for better api use
    const features = new APIFeatures(model.find(filter), req.query)
      .filter()
      .sort()
      .limit()
      .page();
    const doc = await features.query;

    let totalPages;
    if (req.query?.limit) {
      const features = new APIFeatures(model.find(filter), req.query)
        .filter()
        .sort();
      const doc = await features.query;
      totalPages = Math.ceil(doc.length / req.query.limit);
    }

    res.status(200).json({
      status: "success",
      results: doc.length,
      totalPages,
      data: doc,
    });
  });

// function for fetching and caching a series when neccessary (needed to be used in multiple places)
exports.fetchAndCreateSeries = async (malId, seriesModel) => {
  const seriesFetch = await fetch(`https://api.jikan.moe/v4/anime/${malId}`);
  const { data: seriesData } = await seriesFetch.json();

  if (!seriesData) return;

  const {
    mal_id: malIdSeries,
    title,
    type,
    images: images2,
    aired,
    episodes,
    status,
    synopsis,
    background,
  } = seriesData;

  const newSeries = {
    mal_id: malIdSeries,
    title,
    type,
    image: images2.jpg.image_url,
    aired: aired.from,
    episodes,
    status,
    synopsis,
    background,
  };
  return seriesModel.create(newSeries);
};

// helper middleware for attaching user ID and character details for the next function to use
exports.linkToUserAndCharacter = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.character) {
    req.body.character = req.params.characterId;
  }
  next();
});

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadSinglePhoto = upload.single("photo");

exports.resizeSinglePhoto = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(750, 750)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`files/profilePhotos/${req.file.filename}`);

  req.body.photo = req.file.filename;

  next();
};
