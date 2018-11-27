const Sequelize = require('sequelize');

class DBManager {
  constructor(){
    this.sequelize = new Sequelize({
      database: 'Digilender',
      dialect: 'sqlite',
      username: 'root',
      password: '',
      storage: 'Digilender.sqlite'
    });
  }
}

module.exports = DBManager;
