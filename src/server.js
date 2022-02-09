const app = require('./configs/server.config');
require('dotenv').config();
app.listen(process.env.PORT);