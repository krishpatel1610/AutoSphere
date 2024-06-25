const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const mongoDB = require('./db');
require('dotenv').config();
const authRoutes = require('./Routes/Auths'); 
const brandRoutes = require('./Routes/brandRoutes');
const categoryRoutes = require('./Routes/categoryRoutes');
const vehicleRoutes = require('./Routes/vehicleRoutes');
const cityPriceRoutes = require('./Routes/cityPriceRoutes');
const allowedOrigins = [
  'http://localhost:3000',
  'https://frontend--autospherehub.netlify.app'
];

mongoDB();
// fcccccc
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', (req, res) => {
  res.send('hello kp!');
});

app.use(express.json());


app.use('/api', authRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/categories', categoryRoutes); 
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/cityprices', cityPriceRoutes);

app.listen(port, () => {
  console.log(`example is running on port ${port}`);
});
