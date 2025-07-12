const express = require('express');
const router = express.Router();
const Person = require('../model/person.js');

router.post('/', async (req, res) => {
   try{
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('Data saved successfully', response);
        res.status(201).json({response});
   }
   catch(error){
    console.log('Error in saving data', error);
    res.status(500).json({error: 'Internal Server Error'})
   }
});

router.get('/', async (req, res) => {
    try{
        const data = await Person.find();
        console.log('data fetched successfully');
        res.status(200).json({data});
    }
    catch(error){
        console.log('Error in saving data', error);
        res.status(500).json({error: 'Internal Server Error'}) 
    }
});

router.get('/:workType', async (req, res) => {
    try{
        const workType = req.params.workType;
        if(workType == "chef" || workType == "waiter" || workType == "manager"){
            const data = await Person.find({work: workType});
            console.log('Data fetched successfully');
            res.status(200).json({data});
        }else{
            res.status(404).json({message: 'Work type invalid'});
        }
    }
    catch(error){
        console.log('Error in saving data', error);
        res.status(500).json({error: 'Internal Server Error'}) 
    }
});

router.put('/:id', async(req, res) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;

        const data = await Person.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true
        })

        if(!data){
            console.log('Person not found');
            res.status(404).json({message: "Person not found"})
        }else{
            console.log('Data updated successfully');
            res.status(200).json({data});
        }

    }catch(error){
        console.log('Error in saving data', error);
        res.status(500).json({error: "Internal Server Error"})
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const personId = req.params.id;
        const data = await Person.findByIdAndDelete(personId);
        if(!data){
            console.log('Person not found');
            res.status(404).json({message: 'Person not found'});
        }else{
            console.log('Data deleted successfully');
            res.status(200).json({message: 'Data deleted successfully'});
        }
    }catch(error){
        console.log('Error in saving data', error);
        res.status(500).json({error: "Internal Server Error"})
    }
});

module.exports = router;