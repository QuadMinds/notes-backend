require('dotenv').config();
const SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const SwaggerUI = require('swagger-tools/middleware/swagger-ui');
require('./api/models');
module.exports = app; // for testing

const config = {
    appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
    if (err) { throw err; }
    mongoose.connect(process.env.MONGODB);
    mongoose.connection.once('open', () => {
		    console.log('Connection Established...');
    });
    app.use(cors());
    app.use(
      new SwaggerUI(swaggerExpress.runner.swagger, {
          apiDocs: '/api-docs',
          swaggerUi: '/docs',
      })
    );
    swaggerExpress.register(app);
    const port = process.env.PORT || 10010;
    app.listen(port);

    console.log('Running in port', port);
});
