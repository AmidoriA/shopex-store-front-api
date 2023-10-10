// Services/ItemService.js

class ItemService {
    static async getItemById(itemID) {
      // Fetch the item data from a database or other data source here.
      // For this example, we're returning hard-coded data.
      return {
        id: itemID,
        name: 'Sample Item',
        description: 'This is a sample item',
      };
    }
  }
  
  module.exports = ItemService;
  