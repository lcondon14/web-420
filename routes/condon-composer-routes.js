/*
==================================
; Title: condon-composer-routes.js
; Author: Laurel Condon
; Date: 09/03/2023
; Description: composer routes
===============================
*/

// Declares Variables
const express = require('express');
const router = express.Router();

const Composer = require('../models/condon-composer');

// Route to find composers
router.get('/composers', async (req, res) => {
    try {
        const composer = await Composer.find();
        res.status(200).json(composers);
    } catch (error) {
        res.status(500).json({ message: 'Server Exception' });
    }
});

// Route to find composer by id
router.get('/composers/:id', async (req, res) => {
    try {
        const composer = await Composer.findOne({ _id: req.params.id });
        if (composer) {
            res.status(200).json(composer);
        }
        return res.status(404).json({message: 'Composer not found.' });
        } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to create new composer
router.post('/composers', async (req, res) => {
    const composer = new Composer ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    try {
        await composer.save();
        res.status(201).json(composer);
    } catch (error) {
        res.status(500).json({ message: 'Server Error'});
    }
});

// Update Composer ID
router.put('/api/composers/:id', async (req, res) => {
    try {
        const composer = await Composer.findOne({ _id: req.params.id });
        if (composer) {
            composer.set(req.body);
            const savedComposer = await composer.save();
            res.status(200).json(savedComposer);
        } else {
            res.status(401).json({ message: 'Composer not found.'});
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.'})
    }
});

router.delete('/api/composers/:id', async (req, res) => {
    try {
        const deletedComposer = await Composer.findByIdAndDelete(req.params.id);
        if (deletedComposer) {
            res.status(200).json(deletedComposer);
        } else {
            res.status(401).json({ message: 'Composer not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Exports module
module.exports = router;
