const Sequelize = require('sequelize');

class DBManager{
  constructor(){
    let sequelize = new Sequelize({
      database: 'Digilender',
      dialect: 'sqlite',
      username: 'root',
      password: '',
      storage: 'Digilender.sqlite'
    });

    let User = sequelize.define('User', {
      name: {type: Sequelize.STRING, primaryKey: true},
      calType: Sequelize.INTEGER,
      login: Sequelize.STRING,
      pass: Sequelize.STRING
    });

    let Event = sequelize.define('Event', {
      id: {type: Sequelize.UUID, primaryKey: true},
      userName: Sequelize.STRING,
      startDate: Sequelize.STRING,
      stopDate: Sequelize.STRING,
      Description: Sequelize.TEXT
    });
  }

  getUsers(){

  }
}
module.exports = DBManager;
