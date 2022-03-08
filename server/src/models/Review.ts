import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

interface ReviewAttributes {
  id: number;
  message: string;
  rating: number;
}

interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'id'> {}

export default (sequelize: Sequelize): any => {
  class Review extends Model<ReviewAttributes, ReviewCreationAttributes> {
    static associate(models: Record<string, any>) {
      Review.belongsTo(models.User, { foreignKey: 'authorId' });
      Review.belongsTo(models.Store, { foreignKey: 'storeId' });
    }
  }

  Review.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
      },
    },
    { sequelize, modelName: 'review' },
  );

  return Review;
};
