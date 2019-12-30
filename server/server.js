const express = require('express');
const cors = require('cors');
const db = require('./db')
const tutorialRouter = require('./routes/tutorial-router')

const app = express();
const port = process.envPort || 5000;

app.use(cors());
app.use(express.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/v1', tutorialRouter)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})