import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

interface StoreAttributes {
  id: number;
  name: string;
  location: string;
  tags: string;
  headerImage: string;
  icon: string;
  phone: string;
  public: boolean;
}

interface StoreCreationAttributes extends Optional<StoreAttributes, 'id'> {}

export default (sequelize: Sequelize): any => {
  class Store extends Model<StoreAttributes, StoreCreationAttributes> {
    static associate(models: Record<string, any>) {
      Store.belongsTo(models.User, { foreignKey: 'manager' });
    }
  }

  Store.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
      },
      headerImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      public: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tags: {
        type: DataTypes.STRING,
      },
    },

    { sequelize, modelName: 'store' },
  );

  return Store;
};
