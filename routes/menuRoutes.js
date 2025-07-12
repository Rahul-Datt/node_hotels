const express = require('express');
const router = express.Router();
const MenuItem = require('../model/menu.js');

router.post('/', async (req, res) => {
    try{
        const data = req.body;

        const newMenuList = new MenuItem(data);
        const response = await newMenuList.save();
        console.log('Data saved successfully');
        res.status(201).json({response});

        
    }catch(error){
        console.log('Error in saving menu', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

router.get('/', async (req, res) => {
    try{
        const data = await MenuItem.find();
        console.log('Data fetched successfully');
        res.status(200).json({data})
    }catch(error){
        console.log('Error in saving menu', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

router.get('/:taste', async(req, res) => {
    try{
        const taste = req.params.taste;
        if(taste == "sweet" || taste == "sour" || taste || "spicy"){
            const data = await MenuItem.find({taste: taste});
            console.log("Data fetched successfully");
            res.status(200).json({data});
        }
    }catch(error){
        console.log('Error in saving menu', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

router.put('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const data = await MenuItem.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true
        });

        if(!data){
            console.log("Dish not found");
            res.status(404).json({message: "Dish not found"})
        }else{
            console.log("Data updated successfully");
            res.status(200).json({data});
        }

    }catch(error){
        console.log('Error in saving menu', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const data = await MenuItem.findByIdAndDelete(id);

        if(!data){
            console.log('Dish not found');
            res.status(404).json({message: 'Dish not found'});
        }else{
            console.log('Dish deleted successfully');
            res.status(200).json({message: "Dish deleted successfully"});
        }

    }catch(error){
        console.log('Error in saving menu', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
})

//comment added for testing purpose
module.exports = router;