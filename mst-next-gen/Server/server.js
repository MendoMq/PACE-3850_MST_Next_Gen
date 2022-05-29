require('dotenv').config()
const app = require('./app')
const {dbURL} = require('./db/config')
const PORT = process.env.PORT || 3001
const mongoose = require('mongoose');

mongoose.connect(dbURL, { useNewUrlParser: true })
    .then(() => app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`)
	}));

