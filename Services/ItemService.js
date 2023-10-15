const itemRepository = require('../Repositories/ItemRepository');

class ItemService {
    constructor() {
      this.itemRepository = itemRepository;
    }

    async getItem(itemID) {
      return await this.itemRepository.find(itemID);
    }
}

const itemService = new ItemService();
module.exports = itemService;
