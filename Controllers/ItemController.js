const ItemRepository = require('../Repositories/ItemRepository');

class ItemController {
    static async getItem(itemID) {
        // Fetch item data for three items in parallel
        const [itemData, relatedBundlesData] = await Promise.all([
            ItemRepository.getItem(itemID),
            ItemRepository.getBundles(itemID),
        ]);
        
        return {
            item: itemData,
            relatedBundles: relatedBundlesData
        };
    }
}
  
module.exports = ItemController;