const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config/keys');

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, { useNewUrlParser: true });
require('./models/Registeration');

app.use(bodyParser.json());

//imports routes from dialogFlowRoutes file
require('./routes/dialogFlowRoutes')(app);



const PORT = process.env.PORT || 3000;

app.listen(PORT);
