/*
==================================
; Title: condon-customer.js
; Author: Laurel Condon
; Date: 09/17/2023
; Description: customer.js
===============================
*/

// Import Mongoose
const mongoose = require('mongoose');

// Defines Schema
const Schema = mongoose.Schema;

// Creates lineItemSchema
const lineItemSchema = new Schema({
    name: String,
    price: Number,
    quanity: Number,
});

const invoiceSchema = new Schema({
    subtotal: Number,
    tax: Number,
    dateCreated: Date,
    dateShipped: Date,
    lineItems: [lineItemSchema],
});

const customerSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    invoices: [invoiceSchema],
});

module.exports = mongoose.model("Customer", customerSchema);