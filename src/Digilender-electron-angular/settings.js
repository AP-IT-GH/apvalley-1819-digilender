const key = require('./digilender-222912-f45bf722645c.json').private_key
const SERVICE_ACCT_ID = 'digilender@digilender-222912.iam.gserviceaccount.com';
const TIMEZONE = 'UTC+08:00';
const CALENDAR_URL = 'https://calendar.google.com/calendar/embed?src=u173vs8lkd9i5tv172sm9ha25s%40group.calendar.google.com&ctz=Europe%2FBrussels';
const CALENDAR_ID = {
	'primary': 'antoinevmasure@gmail.com',
	'calendar-1': 'u173vs8lkd9i5tv172sm9ha25s@group.calendar.google.com',
};

module.exports.CALENDAR_ID;
module.exports.serviceAcctId = SERVICE_ACCT_ID;
module.exports.key = key;
module.exports.timezone = TIMEZONE;
module.exports.calendarId = CALENDAR_ID;




// Example for using json keys
// var key = require('./googleapi-key.json').private_key;
// module.exports.key = key;