const itemRepository = require('../Repositories/ItemRepository');

class ItemService {
    constructor() {
      this.itemRepository = itemRepository;
    }

    async getItem(itemID) {
      return await this.itemRepository.find(itemID);
    }

    async favorite(user, itemID) {
      if (await this.itemRepository.favorited(user.id, itemID)) {
        return true;
      }

      return await this.itemRepository.favorite(user.id, itemID);
    }
}

const itemService = new ItemService();
module.exports = itemService;
