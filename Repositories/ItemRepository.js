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

    async findFull(itemId) {
        const item = await this.Item.findByPk(itemId, {
          include: this.Bundle
        });
        return item;
    }
}
  
module.exports = ItemRepository;