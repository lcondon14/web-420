/*
==================================
; Title: condon-person-routes.js
; Author: Laurel Condon
; Date: 09/09/2023
; Description: person-routes.js
===============================
*/


const express = router('express');
const router = express.Router();
const Person = require('../models/condon-person');

router.get('/api/persons', async (req, res) => {
    try {
        const persons = await Person.find();
        res.status(200).json(persons);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/api/persons', async (req, res) => {
    try {
        const newPerson = new Person({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            roles: req.body.roles,
            dependents: req.body.dependents,
            birthDate: req.body.birthDate,
        });
        const createdPerson = await newPerson.save();
        res.status(201).json(createdPerson);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;