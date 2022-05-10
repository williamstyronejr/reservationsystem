import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

interface OperationTimeAttributes {
  id: number;
  day: number;
  openTime: number;
  closeTime: number;
}

interface OperationTimeCreationAttributes
  extends Optional<OperationTimeAttributes, 'id'> {}

export default (sequelize: Sequelize): any => {
  class OperationTime extends Model<
    OperationTimeAttributes,
    OperationTimeCreationAttributes
  > {
    static associate(models: Record<string, any>) {
      OperationTime.belongsTo(models.Store, { foreignKey: 'storeId' });
      OperationTime.belongsTo(models.User, { foreignKey: 'creatorId' });
    }
  }

  OperationTime.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      day: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      openTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      closeTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    { sequelize, modelName: 'operation_time' },
  );

  return OperationTime;
};
