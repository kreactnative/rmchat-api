import fs from 'fs'
import path from 'path'
import lodash from 'lodash'
import Sequelize from 'sequelize'


export default (sequelize) => {
  let db = {}
  fs.readdirSync(__dirname).filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  }).forEach(function(file) {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
    // extend auto mapper db vs viewmodel
    /*
    db[model.name].mapCreate = function(attrs, viewModel) {
      return mapper.createMapper(model.name, attrs, viewModel)
    }
    db[model.name].mapUpdate = function(attrs, viewModel) {
      return mapper.updateMapper(model.name, attrs, viewModel)
    }
    */
  });

  Object.keys(db).forEach(function(modelName) {
    if (db[modelName].options.hasOwnProperty('associate')) {
      db[modelName].options.associate(db)
    }
  })

  const dbBuild = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
  }, db)

  return db
}
