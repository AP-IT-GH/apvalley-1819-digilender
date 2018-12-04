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
      start: Sequelize.STRING,    // datetime event starts
      stop: Sequelize.STRING, // datetime event stops
      title: Sequelize.STRING,    //
      description: Sequelize.TEXT // description of event
    });

    me.Event.belongsTo(me.User);

    /*
    me.User.sync()
    .then(() => { 
      return me.Event.sync();
    }).then(() => {
      me.User.create({name: "Antoinne", calType: 0, login: 'antun', pass: 'antpw'});
      me.User.create({name: "Mohammed",  calType: 0 , login: 'mohun', pass: 'mohpw'});
      me.User.create({name: "Reno", calType: 0, login: 'renun', pass: 'renpw'});
      me.User.create({name: "Coralie", calType: 0, login: 'corun', pass: 'corpw'});
      return me.User.create({name: "Elke", calType: 0, login: 'elkun', pass: 'elkpw'})
    }).then((user) => {
      me.Event.create({UserId: user.id, start: '2018-11-28T08:00:00', stop: '2018-11-28T08:00:00', description: 'wash my spaceship', title: 'wash ship'});
      me.Event.create({UserId: user.id, start: '2018-11-29T08:00:00', stop: '2018-11-29T08:00:00', description: 'wash my spaceship', title: 'wash ship'});
      me.Event.create({UserId: user.id, start: '2018-11-30T08:00:00', stop: '2018-11-30T08:00:00', description: 'wash my spaceship', title: 'wash ship'});
      me.Event.create({UserId: user.id, start: '2018-12-01T08:00:00', stop: '2018-12-01T08:00:00', description: 'wash my spaceship', title: 'wash ship'});
      me.Event.create({UserId: user.id, start: '2018-12-02T08:00:00', stop: '2018-12-02T08:00:00', description: 'wash my spaceship', title: 'wash ship'});
      me.Event.create({UserId: user.id, start: '2018-12-03T08:00:00', stop: '2018-12-03T08:00:00', description: 'wash my spaceship', title: 'wash ship'});
      me.Event.create({UserId: user.id, start: '2018-12-04T08:00:00', stop: '2018-12-04T08:00:00', description: 'wash my spaceship', title: 'wash ship'});
      me.Event.create({UserId: user.id, start: '2018-12-05T08:00:00', stop: '2018-12-05T08:00:00', description: 'wash my spaceship', title: 'wash ship'});
      me.initialised = true;
    });
    */
    me.sequelize.authenticate()
      .then(() => console.log('authed'));
  }

  getUsers(){
    return this.User.findAll(); 
  }

  addUser(user){
    console.log('adding user');
    console.log(user);
    if(user.id == undefined){
      return this.User.build(user).save(); //return promise of new user
    }
    else{
      return this.User.findById(user.id)
        .then((oldUser)=>{
          return oldUser.update(user);
        });
    }
  }

  addEvent(newEvent){
    console.log('adding event');
    console.log(newEvent);
    if(newEvent.id == undefined){
      return this.Event.build(newEvent).save(); //return promise of new event
    }
    else{
      return this.Event.findById(event.id)
        .then((oldEvent)=>{
          return oldEvent.update(newEvent);
        });
    }
  }

  getEvents(userId){
    if(userId == undefined){
      return this.Event.findAll();
    }   
    else {
      return this.Event.findAll({ where: { UserId: userId } });
    }
  }
}

module.exports = DBManager;
