/*
==================================
; Title: condon-team-routes.js
; Author: Laurel Condon
; Date: 10/08/2023
; Description: Capstone Assignment
===============================
*/
const express = require('express');
const router = express.Router();
const Team = require('../models/condon-team');

// Find all teams
router.get('/teams', async (req, res) => {
    try { 
        const teams = await Team.find();
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: 'Server Exception' });
    }
});

// Post Players to a team
router.post('/teams', async (req, res) => {
    const { firstName, lastName, salary } = req.body;

    try {
        // Create a new player object
        const newPlayer = { firstName, lastName, salary };

        // Save the new player
        const player = await Team.create(newPlayer);

        // Respond with the new player as JSON
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ message: 'Server Exception' });
    }
});

// Find all players on a team
router.get('/teams/:id/players', async (req, res) => {
    const { id } = req.params;
    
    try {
        const team = await Team.findById(id);

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        res.status(200).json(team.players);
    } catch (error) {
        res.status(500).json({ message: 'Server Exception' });
    }
});

// Delete a team
router.delete('/teams/:id', async (req, res) => {
    const { id } = req.params;

    try { 
        const deleteTeam = await Team.findByIdAndRemove(id);
        if (!deleteTeam) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.status(200).json(deleteTeam);
    } catch (error) {
        res.status(500).json({ message: 'Server Exception' });
    }
});

// Export Module
module.exports = router;
