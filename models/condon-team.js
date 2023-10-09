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

// Finds all teams
router.get('/teams', asynce(req, res) => {
    try{ 
        const teams = await Team.find();
        res.satus(200).json(teams);
        } catch (error) {
            res.status(500).json({ message: 'Server Exception'});
        }
    }
);

// Post Players to a team
router.post('/teams', async (req, res) => {
const { firstName, lastName, salary } = req.body;

try {
    // Find the team by its ID
    const team = await Team.findById(id);

    if (!team) {
        return res.status(401).json({ message: 'Invalid teamId' });
    }

    // Create a new player object
    const newPlayer = { firstName, lastName, salary };

    // Push the new player into the team's players array
    team.players.push(newPlayer);

    // Save the entire team (including the updated players array)
    const savedTeam = await team.save();

    // Respond with the updated team as JSON
    res.status(200).json(savedTeam);
} catch (error) {
    res.status(500).json({ message: 'Server Exception' });
}
});

// Finds all players on a team
router.get('/teams/:id/players', async (req, res) => {
    const { id } + req.params;
    try {
        const team = await Team.findById(id);

        if (!team) {
            return res.status(401).json({ message: 'Invalid teamId' })
        }
        res.status(200).json(team.players);
    } catch (error) {
        res.status(500).json({ message: 'Server Exception' })
    }
});

// Deletes a team

router.delete('/teams/:id', async (req, res) => {
    const { id } = req.params;

    try { 
        const deleteTeam = await Team.findByIdAndRemove(id);
        if (!deleteTeam) {
            return res.status(401).json({ message: 'Invalid teamId' })
        }
        res.status(200).json(deleteTeam);
    } catch (error) {
        res.status(500).json({ message: 'Server Exception' });
    }
});

// Export Module
module.exports = router;

