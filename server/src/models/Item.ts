import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

interface ItemAttributes {
  id: number;
  type: number;
  level: number;
  length: number;
}

interface ItemCreationAttributes extends Optional<ItemAttributes, 'id'> {}

export default (sequelize: Sequelize): any => {
  class Item extends Model<ItemAttributes, ItemCreationAttributes> {
    static associate(models: Record<string, any>) {
      Item.belongsTo(models.Store, { foreignKey: 'storeId' });
      Item.belongsTo(models.User, { foreignKey: 'creatorId' });
    }
  }

  Item.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.INTEGER,
      },
      level: {
        type: DataTypes.INTEGER,
      },
      length: {
        type: DataTypes.INTEGER,
      },
    },
    { sequelize, modelName: 'Item' },
  );

  return Item;
};
