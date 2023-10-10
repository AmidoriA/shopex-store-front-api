class ItemRepository {
    static async getItem(itemID) {
        // Fetch the item data from a database or other data source here.
        // For this example, we're returning hard-coded data.
        return {
            id: itemID,
            name: 'Sample Item',
            description: 'This is a sample item',
        };
    }

    static async getBundles(itemID) {
        // Fetch the item data from a database or other data source here.
        // For this example, we're returning hard-coded data.
        return [
            {
                id: 111,
                name: 'first bundle',
                description: 'This is a first sample bundle',
            },
            {
                id: 222,
                name: 'second bundle',
                description: 'This is a second sample bundle',
            }
        ]
    }
}
  
module.exports = ItemRepository;