import ProductModel from "../models/productModel.js";

export async function getAllProductsStatic(_, res) {
  //test purpose
  //const search = 'a';
  const products = await ProductModel.find({ price: { $gt: 30 } })
    .sort("price")
    .select("name price");

  return res.status(200).json({
    success: true,
    message: "Product-Testing route 🛒🧪",
    numOfHits: products.length,
    data: products,
  });
}

export async function getAllProducts(req, res) {
  const { featured, company, name, sort, fields, numericFilters } = req.query; //we set this up
  const queryObj = {};
  if (featured) {
    queryObj.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObj.company = company;
  }

  if (name) {
    queryObj.name = {
      $regex: name,
      $options: "i",
    };
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      "<": "$lt",
      ">=": "$gte",
      "<=": "$lte",
      "=": "$eq",
    };

    const regEx = /\b(<|>|>=|=|<|<=)\b/g; //! copied from , don't sweat it
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObj[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log(queryObj); //{ price: { '$gt': 40 }, rating: { '$gte': 4 } }
  let result = ProductModel.find(queryObj);
  if (sort) {
    const sortedList = sort.split(",").join(" ");
    result = result.sort(sortedList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldsToInclude = fields.split(",").join(" ");
    result = result.select(fieldsToInclude);
  }

  const page = parseInt(req.query.page) || 1; //req.query => initially a string.
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit).select("name price rating -_id"); //! 23 / 7 = 7 7 7 2

  const products = await result;
  res.status(200).json({
    success: true,
    message: "Products fetched ✅",
    numOfHits: products.length,
    data: products,
  });
}
