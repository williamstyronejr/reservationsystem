import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

interface SeatReservedAttributes {
  id: number;
}

interface SeatReservedCreationAttributes
  extends Optional<SeatReservedAttributes, 'id'> {}

export default (sequelize: Sequelize): any => {
  class SeatReserved extends Model<
    SeatReservedAttributes,
    SeatReservedCreationAttributes
  > {
    static associate(models: Record<string, any>) {
      SeatReserved.belongsTo(models.Item, { foreignKey: 'seatId' });
      SeatReserved.belongsTo(models.Reservation, {
        foreignKey: 'reservationId',
      });
    }
  }

  SeatReserved.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      modelName: 'seatReserved',
    },
  );

  return SeatReserved;
};
