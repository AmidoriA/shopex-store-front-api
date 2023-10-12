const DatabaseHelper = require('../Helpers/DatabaseHelper');

class ItemRepository {
    constructor(ItemModel, BundleModel, BundleItemModel) {
        this.Item = ItemModel;
        this.Bundle = BundleModel;
        this.BundleItem = BundleItemModel;

        this.Item.belongsToMany(this.Bundle, { through: this.BundleItem,
            underscored: true });
        this.Bundle.belongsToMany(this.Item, { through: this.BundleItem,
            underscored: true });
    }

    async find(id) {
        return await this.Item.findByPk(id);
    }

    // static async getItem(itemID) {
    //     try {
    //         return await DatabaseHelper.getData('SELECT * FROM items WHERE id = ?', itemID, true);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    async findFull(itemId) {
        const item = await this.Item.findByPk(itemId, {
          include: this.Bundle
        });
        return item;
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