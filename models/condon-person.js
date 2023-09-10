/*
==================================
; Title: condon-person.js
; Author: Laurel Condon
; Date: 09/09/2023
; Description: person.js
===============================
*/

// Declares variables
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema

const roleSchema = new Schema({
    text: String,
});

const dependentSchema = new Schema({
    firstName: String,
    lastName: String,
});

const personSchema = new Schema({
    firstName: String,
    lastName: String,
    roles: [roleSchema],
    dependents: [dependentSchema],
    birthDate: String,
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;