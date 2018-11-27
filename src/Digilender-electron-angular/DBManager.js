const Sequelize = require('sequelize');

class DBManager{

  sequelize = new Sequelize({
    database: 'Digilender',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: 'Digilender.sqlite'
  });

  User = sequelize.define('User', {
    name: {type: Sequelize.STRING, primaryKey: true},
    calType: Sequelize.INTEGER,
    login: Sequelize.STRING,
    pass: Sequelize.STRING
  });

  Event = sequelize.define('Event', {
    id: {type: Sequelize.UUID, primaryKey: true},
    userName: Sequelize.STRING,
    startDate: Sequelize.STRING,
    stopDate: Sequelize.STRING,
    Description: Sequelize.TEXT
  });

  constructor(){

  }

  getUsers(){

  }
}
module.exports = DBManager;
