const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://celiaS:X9piAz7xNYpwAVGn@myfirstdatabase.sg15s5u.mongodb.net/weatherapp-part3';


mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
