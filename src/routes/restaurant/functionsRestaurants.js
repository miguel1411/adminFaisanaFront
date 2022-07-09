import { httpAxios } from '../../main';

export const restaurantFunc = {
  async getRestaurant() {
    try {
      let result = [];
      const request = await httpAxios.get('/restaurant/getallrestaurants');
      if (request.data) {
        result.push(...request.data);
        return result;
      }
      return null;
    } catch (err) {
      console.log(err);
    }
  }
}

export const categoryFunc = {
  async getCategory(restaurantId) {
    try {
      const request = await httpAxios.get(`/category/getCategories/${restaurantId}`);
      console.log(request);
      return request;
    } catch (err) {
      console.log(err);
    }
  }
}

export const subcategoryFunc = {
  async getSubategory(restaurantId, categoryId) {
    try {
      const request = await httpAxios.get(`/subcategories/getSubcategories/${restaurantId}/${categoryId}`);
      console.log('subcategoria', request);
      if (request.data) {
        return request;
      }
      return null;
    } catch (err) {
      console.log(err);
    }
  }
}
export const productAddFunc = {
  async getSubategory(restaurantId, categoryId) {
    try {
      const request = await httpAxios.get(`/subcategories/getSubcategories/${restaurantId}/${categoryId}`);
      console.log('subcategoria', request);
      if (request.data) {
        return request;
      }
      return null;
    } catch (err) {
      console.log(err);
    }
  }
}