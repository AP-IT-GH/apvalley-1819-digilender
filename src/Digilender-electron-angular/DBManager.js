const Sequelize = require('sequelize');


class DBManager{
  constructor(){
    var me = this;
    var initialised = false;
    this.sequelize = new Sequelize({
      database: 'Digilender',
      dialect: 'sqlite',
      username: 'root',
      password: '',
      storage: 'Digilender.sqlite',
      define: { timestamps: false}
    });

    me.User = me.sequelize.define('User', {
      id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true}, 
      name: Sequelize.STRING, // display name
      calType: Sequelize.INTEGER, // type of calendar, 0=purely local, 1=google
      login: Sequelize.STRING, // login for third party calendars?
      pass: Sequelize.STRING // possible key for third party calendars?
    });

    me.Event = me.sequelize.define('Event', {
      id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
      UserId: Sequelize.STRING,   // ID of owning user
      startDate: Sequelize.STRING,// datetime event starts
      stopDate: Sequelize.STRING, // datetime event stops
      Description: Sequelize.TEXT // description of event
    });

    me.Event.belongsTo(me.User);

    me.Event.drop().then(() => {
      return me.User.sync({force: true})
    }).then(() => { 
      return me.Event.sync({force:true})
    }).then(() => {
      me.User.create({name: "Antoinne", calType: 0, login: 'antun', pass: 'antpw'});
      me.User.create({name: "Mohammed",  calType: 0 , login: 'mohun', pass: 'mohpw'});
      me.User.create({name: "Reno", calType: 0, login: 'renun', pass: 'renpw'});
      me.User.create({name: "Coralie", calType: 0, login: 'corun', pass: 'corpw'});
      return me.User.create({name: "Elke", calType: 0, login: 'elkun', pass: 'elkpw'})
    }).then((user) => {
      console.log(user);
      console.log(user.name);
      me.Event.create({UserId: user.id, startDate: '2018-11-28T08:00:00', stopDate: '2018-11-28T08:00:00', Description: 'wash my spaceship'});
      me.Event.create({UserId: user.id, startDate: '2018-11-29T08:00:00', stopDate: '2018-11-29T08:00:00', Description: 'wash my spaceship'});
      me.Event.create({UserId: user.id, startDate: '2018-11-30T08:00:00', stopDate: '2018-11-30T08:00:00', Description: 'wash my spaceship'});
      me.Event.create({UserId: user.id, startDate: '2018-12-01T08:00:00', stopDate: '2018-12-01T08:00:00', Description: 'wash my spaceship'});
      me.Event.create({UserId: user.id, startDate: '2018-12-02T08:00:00', stopDate: '2018-12-02T08:00:00', Description: 'wash my spaceship'});
      me.Event.create({UserId: user.id, startDate: '2018-12-03T08:00:00', stopDate: '2018-12-03T08:00:00', Description: 'wash my spaceship'});
      me.Event.create({UserId: user.id, startDate: '2018-12-04T08:00:00', stopDate: '2018-12-04T08:00:00', Description: 'wash my spaceship'});
      me.Event.create({UserId: user.id, startDate: '2018-12-05T08:00:00', stopDate: '2018-12-05T08:00:00', Description: 'wash my spaceship'});
      me.initialised = true;
    });

    me.sequelize.authenticate()
      .then(() => console.log('authed'));
  }

  getUsers(){
    return this.User.findAll(); 
  }

  getEvents(userId){
    if(user == undefined){
      return this.Event.findAll();
    }   
    else {
      return this.Event.findAll({ where: { UserId: userId } });
    }
  }
}

module.exports = DBManager;
