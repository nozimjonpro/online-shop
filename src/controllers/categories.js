import { read, write } from "../utils/model.js";
import { InternalServerError,  ValidationError} from "../utils/errors.js";


const GET = (req, res, next) => {
  try {
    let data = read("categories");
    let subData = read("subcategories");

    data = data.map((category) => {
      category.categoryId = category.category_id;
      category.categoryName = category.category_name;
      delete category.category_id;
      delete category.category_name;
      category.subCategories = subData.filter(
        (item) => item.category_id == category.categoryId
      );
      console.log(category);
      category.subCategories.map((item) => {
        delete item.category_id;
        item.subCategoryId = item.sub_category_id;
        item.subCategoryName = item.sub_category_name;
        delete item.sub_category_id;
        delete item.sub_category_name;
        return item;
      });

      return category;
    });

    res.status(200).send(data);
  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};

const POST = (req, res, next) => {
  try {
    let data = read("categories");
    let { categoryName } = req.body;
    let newCategory = {
      category_id: data.length ? data.at(-1).category_id + 1 : 1,
      category_name: categoryName,
    };
    data.push(newCategory);
    write("categories", data);
  } catch (error) {
    return  next(new ValidationError(401, error.message))
  }
};


export default {
  GET,
  POST,
};
