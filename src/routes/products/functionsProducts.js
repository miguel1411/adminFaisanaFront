
import { httpAxios } from '../../main';

export const productsFunc = {
  async getProducts(restaurant, category, subcategory) {
    try {
      const request = await httpAxios.get('/products');
      console.log('bueno:', request);
      if (request.data) {
        return request.data;
      }
      return null;
    } catch (err) {
      console.log(err);
    }
  }
}