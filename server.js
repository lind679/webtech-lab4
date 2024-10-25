require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/Item');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then (()=> console.log('MongoDB connected'))
.catch (err => console.log(err));

//CREATE
app.post('/items', async (req, res) => {
    const item = new Item(req.body);
    try{
        await item.save();
        res.status(201).send(item);
    } catch (error) {
        res.status(400).send(error);
    }
});

//READ
app.get('/items', async (req, res) =>{
    try {
        const items = await Item.find();
        console.log('retrieved items', items);
        res.send(items);
    } catch(error) {
        res.status(500).send(error);
    }
});

//UPDATE
app.put('/items/:id', async (req, res) => {
    try{
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if (!item) return res.status(404).send('Item not found');
        res.send(item);
    } catch (error){
        res.status(400).send(error);
    }
});

//DELETE
app.delete('/items/:id', async(req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).send();
        res.send(item);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});