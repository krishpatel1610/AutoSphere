const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Added name field
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
},{ collection: 'Admin' });

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
