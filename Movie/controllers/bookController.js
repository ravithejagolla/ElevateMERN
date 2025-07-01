import Book from "../models/bookSchema.js";


export const getbooks = async (req, res) => {
  try {
    const { title, author, genre, minPrice, maxPrice, page = 1, limit = 10, sort } = req.query;

    const filter = {};

    if (title) filter.title = { $regex: title, $options: 'i' };
    if (author) filter.author = author;
    if (genre) filter.genre = genre;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sortOption = {};
    if (sort === 'asc') sortOption.price = 1;
    if (sort === 'desc') sortOption.price = -1;

    const books = await Book.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Book.countDocuments(filter);

    res.json({
      page: Number(page),
      limit: Number(limit),
      total,
      data:books
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


