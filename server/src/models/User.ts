import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

interface UserAttributes {
  id: number;
  username: string;
  hash: string;
  email: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export default (sequelize: Sequelize): any => {
  class User extends Model<UserAttributes, UserCreationAttributes> {
    static associate(models: Record<string, any>) {
      //
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      username: {
        type: new DataTypes.STRING(36),
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, modelName: 'user' },
  );

  return User;
};
