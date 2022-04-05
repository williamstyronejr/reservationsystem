import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

interface ReservationAttributes {
  id: number;
  confirmation: boolean;
  startDate: Date;
  endDate: Date;
}

interface ReservationCreationAttributes
  extends Optional<ReservationAttributes, 'id'> {}

export default (sequelize: Sequelize): any => {
  class Reservation extends Model<
    ReservationAttributes,
    ReservationCreationAttributes
  > {
    static associate(models: Record<string, any>) {
      Reservation.belongsTo(models.User, { foreignKey: 'madeBy' });
      Reservation.belongsTo(models.Store, { foreignKey: 'storeId' });
    }
  }

  Reservation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      confirmation: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    { sequelize, modelName: 'reservation' },
  );

  return Reservation;
};
