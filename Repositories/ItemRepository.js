const ItemModel = require('../Models/ItemModel');
const BundleModel = require('../Models/BundleModel');
const BundleItemModel = require('../Models/BundleItemModel');

const sequelize = require('../Helpers/Sequelize');

class ItemRepository {
    constructor(sequelize) {
        this.Item = ItemModel(sequelize);
        this.Bundle = BundleModel(sequelize);
        this.BundleItem = BundleItemModel(sequelize);

        this.Item.belongsToMany(this.Bundle, { through: this.BundleItem,
            underscored: true });
        this.Bundle.belongsToMany(this.Item, { through: this.BundleItem,
            underscored: true });
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
}

const itemRepository = new ItemRepository(sequelize);
module.exports = itemRepository;