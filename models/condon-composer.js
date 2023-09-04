/*
==================================
; Title: condon-composer.js
; Author: Laurel Condon
; Date: 09/03/2023
; Description: composer.js
===============================
*/


// Requires Mongoose
const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Declares a new composer schema
const composerSchema = new schema ({
    firstName: String,
    lastName: String
});

// Exports the composer model
module.exports = mongoose.model('Composer', composerSchema);