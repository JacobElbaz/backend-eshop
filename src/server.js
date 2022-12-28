const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
require('dotenv').config({path:'./config/.env'});
require('../config/db');
const {checkClient, requireAuth} = require('./middleware/auth.middleware');
require('./routes/client.routes')
const app = express();
const clientRoutes = require("./routes/client.routes");
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const datesRoutes = require('./routes/dates.routes');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });

//jwt
app.get('*', checkClient);
app.get('/jwtid', requireAuth, (req, res) =>{
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.set('Access-Control-Allow-Credentials', 'true')
    res.status(200).send(res.locals.client._id)
});

//routes
app.use("/api/client", clientRoutes);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/dates', datesRoutes);

//server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})