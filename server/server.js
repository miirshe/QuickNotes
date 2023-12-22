const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const QuickNotesDB = require('./model/QuickNotesDB');
const userRoute = require('./routes/userRoute');
const dotenv = require('dotenv');
const noteRoutes = require('./routes/noteRoutes');
dotenv.config();
const PORT = process.env.port | 3000
const app = express();
app.use(express.json());

app.use(cors());

app.use(cookieParser());

QuickNotesDB();

app.use('/api', userRoute)
app.use('/api', noteRoutes)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})