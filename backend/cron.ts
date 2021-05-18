var cron = require('node-cron');

var task = cron.schedule('0-59/5 * * * * *', () =>  {
  console.log('stopped task');
}, {
  scheduled: false
});

task.start();