/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rooms', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    tableName: 'rooms'
  });
};
