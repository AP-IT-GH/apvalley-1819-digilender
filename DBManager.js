const Sequelize = require('sequelize');

class DBManager {
  constructor() {
    var me = this;
    var initialised = false;
    this.sequelize = new Sequelize({
      database: 'Digilender',
      dialect: 'sqlite',
      username: 'root',
      password: '',
      storage: 'Digilender.sqlite',
      define: { timestamps: false }
    });


    me.User = me.sequelize.define('User', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      title: Sequelize.STRING,      // user name
      eventColor: Sequelize.STRING,   // colour asociated with user
      calType: Sequelize.INTEGER,   // type of calendar, 0=purely local, 1=google
      googleId: Sequelize.STRING,
      avatar: Sequelize.STRING,
      login: Sequelize.STRING,      // login for third party calendars?
      pass: Sequelize.STRING        // possible key for third party calendars?
    });

    me.Event = me.sequelize.define('Event', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      resourceId: Sequelize.INTEGER,   // ID of owning user
      start: Sequelize.STRING,    // datetime event starts
      startActual: Sequelize.STRING,    // datetime event actually starts
      stop: Sequelize.STRING, // datetime event stops
      title: Sequelize.STRING,    //
      description: Sequelize.TEXT // description of event
    });

    me.Event.belongsTo(me.User, { foreignKey: "resourceId" });

    me.Event.drop().then(() => {
      return me.User.sync({ force: true })
    }).then(() => {
      return me.Event.sync();
    }).then(() => {
      let avatarUrl = '../assets/svg/baseline-person.svg'
      me.User.create({ title: "Antoinne", eventColor: "#ff6600", googleId: null, avatar: avatarUrl, calType: 0, login: 'antun', pass: 'antpw' });
      me.User.create({ title: "Mohammed", eventColor: "#0066ff", googleId: null, avatar: avatarUrl, calType: 0, login: 'moun', pass: 'mopw' });
      me.User.create({ title: "Reno", eventColor: "#ff9999", googleId: null, avatar: avatarUrl, calType: 0, login: 'renun', pass: 'renpw' });
      me.User.create({ title: "Coralie", eventColor: "#ffcc00", googleId: null, avatar: avatarUrl, calType: 0, login: 'corun', pass: 'corpw' });
      return me.User.create({ title: "Elke", eventColor: "#99ccff", googleId: null, avatar: avatarUrl, calType: 0, login: 'elkun', pass: 'elkpw' })
    }).then((user) => {
      me.initialised = true;
    });
    me.sequelize.authenticate()
      .then(() => console.log('authed'));
  }

  getUsers(userId) {
    if (userId == undefined) {
      return this.User.findAll();
    }
    else {
      return this.User.find({ where: { id: userId } });
    }
  }

  addUser(user) {
    console.log('adding user');
    console.log(user);
    if (user.id == undefined) {
      console.log("new user");
      return this.User.build(user).save(); //return promise of new user
    }
    else {
      console.log("edit user");
      return this.User.findById(user.id)
        .then((oldUser) => {
          console.log("old user, new user:");
          console.log(oldUser);
          console.log(user);
          return oldUser.update(user);
        });
    }
  }

  deleteUser(id) {
    console.log('deleting user');
    console.log(id);
    if (id == undefined) {
      return; //no user to delete
    }
    else {
      return this.User.findById(id)
        .then((user) => {
          return user.destroy(); //delete user
        });
    }
  }

  addEvent(newEvent) {
    console.log('adding event');
    console.log(newEvent);
    console.log(newEvent.id);
    if (newEvent.id == undefined) {
      return this.Event.build(newEvent).save(); //return promise of new event
    }
    else {
      console.log("finding old event");
      return this.Event.findById(newEvent.id)
        .then((oldEvent) => {
          console.log("old event, new event:");
          console.log(oldEvent);
          console.log(newEvent);
          return oldEvent.update(newEvent);
        });
    }
  }

  deleteEvent(event) {
    console.log('deleting event');
    console.log(event.id);
    if (event.id == undefined) {
      return; //no event to delete
    }
    else {
      return this.Event.findById(event.id)
        .then((eventToDelete) => {
          return eventToDelete.destroy(); //delete event
        });
    }
  }

  getEvents(userId) {
    if (userId == undefined) {
      return this.Event.findAll();
    }
    else {
      return this.Event.findAll({ where: { resourceId: userId } });
    }
  }
}

module.exports = DBManager;
