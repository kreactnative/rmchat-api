import {
  DB
} from './config'

import models from './models';

import Sequelize from 'sequelize'

export default callback => {
  const sequelize = new Sequelize(DB.DB_NAME, DB.USERNAME, DB.PASSWORD, {
    host: DB.SERVER,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    logging: console.log,
    define: {
      timestamps: false
    }
  });

	sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.')
    callback(models(sequelize))
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
    callback(null)
  });
}
