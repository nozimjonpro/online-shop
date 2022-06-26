import { read, write } from "../utils/model.js";
import { InternalServerError, ValidationError } from "../utils/errors.js";

const GET = (req, res, next) => {
  try {
    let data = read("subcategories");
    let subData = read("products");

    data = data.map((subcategory) => {
      subcategory.subCategoryId = subcategory.sub_category_id;
      subcategory.subCategoryName = subcategory.sub_category_name;
      delete subcategory.sub_category_id;
      delete subcategory.sub_category_name;
      delete subcategory.category_id
      subcategory.products = subData.filter(
        (item) => item.sub_category_id == subcategory.subCategoryId
      );
      subcategory.products.map((item) => {
          item.productId = item.product_id;
          item.productName = item.product_name;
        delete item.sub_category_id;
        delete item.product_id;
        delete item.product_name;
        return item;
      });

      return subcategory;
    });

    res.status(200).send(data);
  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};

const POST = (req, res, next) => {
  try {
    let data = read("subcategories");
    let { subCategoryName, categoryId } = req.body;
    let newsubCategory = {
      sub_category_id: data.length ? data.at(-1).sub_category_id + 1 : 1,
      sub_category_name: subCategoryName,
      category_id: categoryId
    };
    data.push(newsubCategory);
    write("subcategories", data);
  } catch (error) {
    return next(new ValidationError(400, error.message));
  }
};

export default {
  GET,
  POST,
};
