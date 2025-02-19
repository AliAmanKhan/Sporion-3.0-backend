const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const dbConfig = require('./app/config/db.config');
const db = require('./app/models');
require('dotenv').config();
db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
    // await db.mongoose.connect(process.env.MONGODB_URI)
    .then(console.log('Connected to MongoDB', `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`))
    .catch(async (err) => {
        console.log('Error connecting to MongoDB', err);
    });
process.on('uncaughtException', async (err, data) => {
    try {
        console.log('Caught uncaught exception: ', err, data);
    } finally {
        process.exit(1);
    }
});

app.use(cors())
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: "Welcome to the application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/cricket.routes')(app);
require('./app/routes/basketball.routes')(app);
require('./app/routes/volleyball.routes')(app);
require('./app/routes/kabaddi.routes')(app);
require('./app/routes/khokho.routes')(app);
require('./app/routes/notice.routes')(app);

const PORT = 3000;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}.`);
});