const ItemRepository = require('../Repositories/ItemRepository');

class ItemService {
    static async getItem(itemID) {
      return await ItemRepository.getItem(itemID);
    }
}
  
module.exports = ItemService;
  