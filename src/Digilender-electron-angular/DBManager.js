const Sequelize = require('sequelize');

class DBManager {
  constructor(){
    this.db = new Sequelize('Digilender', 'username', password: null, {
      dialect: 'sqlite',
      storage: 'Digilender.sqlite'
    });
  }
}


module.exports = DBManager;
