const DatabaseHelper = require('../Helpers/DatabaseHelper');

class ItemRepository {
    static async getItem(itemID) {
        try {
            return await DatabaseHelper.getData('SELECT * FROM items WHERE id = ?', itemID, true);
        } catch (error) {
            console.log(error);
        }
    }

    static async getBundles(itemID) {
        try {
            return await DatabaseHelper.getData(
                "SELECT bundles.* FROM bundles \
                 INNER JOIN bundle_items ON bundle_items.bundle_id = bundles.id \
                 AND bundle_items.item_id = ?"
            , itemID);
        } catch (error) {
            console.log(error);
        }
    }
}
  
module.exports = ItemRepository;