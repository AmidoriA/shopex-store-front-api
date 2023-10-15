const ItemModel = require('../Models/ItemModel');
const BundleModel = require('../Models/BundleModel');
const BundleItemModel = require('../Models/BundleItemModel');
const ItemFavoriteModel = require('../Models/ItemFavoriteModel');

const sequelize = require('../Helpers/Sequelize');

class ItemRepository {
    constructor(sequelize) {
        this.Item = ItemModel(sequelize);
        this.Bundle = BundleModel(sequelize);
        this.BundleItem = BundleItemModel(sequelize);
        this.ItemFavorite = ItemFavoriteModel(sequelize);

        this.Item.belongsToMany(this.Bundle, { through: this.BundleItem,
            underscored: true });
        this.Bundle.belongsToMany(this.Item, { through: this.BundleItem,
            underscored: true });

        this.Item.hasMany(this.ItemFavorite, { foreignKey: 'item_id' });
        this.ItemFavorite.belongsTo(this.Item, { foreignKey: 'item_id' });
    }

    async find(id) {
        return await this.Item.findByPk(id);
    }

    async findFull(itemId) {
        const item = await this.Item.findByPk(itemId, {
          include: this.Bundle
        });
        return item;
    }

    async favorited(userID, itemID) {
        return (await this.ItemFavorite.count({
            where: {user_id: userID, item_id: itemID}
        })) != 0;
    }

    async favorite(userID, itemID) {
        return await this.ItemFavorite.create({
            user_id: userID, item_id: itemID
        });
    }

    async unfavorite(userID, itemID) {
        return await this.ItemFavorite.destroy({
            where: {user_id: userID, item_id: itemID}
        });
    }

    async getFavoritedItems(userID) {
        return await this.Item.findAll({
            include: [{
                model: this.ItemFavorite,
                where: { 
                    user_id: userID
                },
                required: true
            }],
        });
    }
}

const itemRepository = new ItemRepository(sequelize);
module.exports = itemRepository;