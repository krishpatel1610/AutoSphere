const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const mongoDB = require('./db');
require('dotenv').config();
mongoDB();

app.use(cors());

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

const authRoutes = require('./Routes/Auths'); // Ensure this imports the correct router
app.use('/api', authRoutes);

app.listen(port, () => {
  console.log(`example is running on port ${port}`);
});
