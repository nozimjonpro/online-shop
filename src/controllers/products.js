import { read, write } from "../utils/model.js";
import { InternalServerError, AuthorizationError } from "../utils/errors.js";

const GET = (req, res, next) => {
  try {
    let { productId, model, price, color, search } = req.query;
    let data = read("products");
    let foundData = data.filter((item) => {
      let byProductId = productId ? productId == item.product_id : true;
      let byModel = model ? model == item.model : true;
      let byPrice = price ? price == item.price : true;
      let byColor = color ? color == item.color : true;
      let bySearch = search
        ? item.product_name.toLowerCase().includes(search.toLowerCase())
        : true;

      return byProductId && byModel && byPrice && byColor && bySearch;
    });

    res.status(200).send(foundData);
  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};

const POST = (req, res, next) => {
  try {
    let data = read("products");
    let { subCategoryId, productName, price, color, model } = req.body;
    let newProduct = {
    product_id: data.length ? data.at(-1).product_id+1 : 1,
      sub_category_id: subCategoryId,
      model: model,
      product_name: productName,
      color: color,
      price: price,
    };

    data.push(newProduct)
    write('products', data)
  } catch (error) {
    return  next(new ValidationError(401, error.message))
  }
};

export default {
  GET,
  POST,
};
