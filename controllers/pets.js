const express = require('express');
const Pet = require('../models/pet.js');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
        // Create a new pet with the data from req.body
        const createdPet = await Pet.create(req.body);
        res.status(201).json(createdPet); // 201 Created
    } catch (error) {
        // Setup for error handling
        res.status(500).json({ error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const foundPets = await Pet.find();
        res.status(200).json(foundPets);
    } catch (error) {
        res.status(500).json({ error: error.message }); // 500 Internal Server Error
    }
});

router.get('/:petId', async (req, res) => {
    try {
      const foundPet = await Pet.findById(req.params.petId);
      if (!foundPet) {
        res.status(404);
        throw new Error('Pet not found.');
      }
      res.status(200).json(foundPet);
    } catch (error) {
      if (res.statusCode === 404) {
        res.json({ error: error.message });
      } else {
        // Add else statement to handle all other errors
        res.status(500).json({ error: error.message });
      }
    }
  });





module.exports = router;