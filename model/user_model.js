const mongoose = require('mongoose');
const moment = require('moment');
const mongoSchema = mongoose.Schema({
	nama: String,
	username: String,
	email: String,
	role: String,
	password: String,
	alamat: String,
	phone: String,
	fotoProfile: {
		type: String,
		default: null,
	},
	created_at: {
		type: Date,
		default: new Date().toISOString()
	}
})
module.exports = mongoose.model('users', mongoSchema);
