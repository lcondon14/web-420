/*
==================================
; Title: condon-user.js
; Author: Laurel Condon
; Date: 09/17/2023
; Description: user.js
===============================
*/


// Variables for creating Schema and importing mongoose
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Defines new schema
let userSchema = new Schema({
  "userName": { type: String },
  "password": { type: String },
  "emailAddress": { type: String },
});

module.exports =  mongoose.model('User', userSchema)