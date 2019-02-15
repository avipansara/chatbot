const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

//imports routes from dialogFlowRoutes file
require('./routes/dialogFlowRoutes')(app);



const PORT = process.env.PORT || 3000;

app.listen(PORT);
