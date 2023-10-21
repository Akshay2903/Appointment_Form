const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const app = express();
const sequelize = require('./utils/database');
const routes = require('./routes/userRoutes')

app.use(bodyParser.urlencoded({ extended:false }));
app.use(cors());
app.use(bodyParser.json())

app.use(express.static('./public'));

app.use('/user',routes);


sequelize
    .sync()
    .then(() => {
        const port = 3000 || process.env.PORT;
        console.log(`server run on ${port}`);
        app.listen(port);
    })
    .catch((err) => {
        console.log(err);
    })