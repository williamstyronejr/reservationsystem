import { Sequelize, Options } from 'sequelize';
import User from './User';
import Store from './Store';

const { DATABASE_URL } = process.env;

const options: Options = {};

const sequelize = new Sequelize(DATABASE_URL || '', options);

const models: any = {
  User: User(sequelize),
  Store: Store(sequelize),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) models[key].associate(models);
});

const db: {
  Sequelize: any;
  sequelize: Sequelize;
  models: any;
} = {
  models,
  sequelize,
  Sequelize,
};

export default db;
