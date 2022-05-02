const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    const result = await mongodb.getDB().db().collection('contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req,res,next) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
    .getDB()
    .db()
    .collection('contacts')
    .find({ _id: userId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};


const addOne = async (req,res,next) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const result = await mongodb
    .getDB()
    .db()
    .collection('contacts')
    .insertOne(contact);
    if (result.acknowledged){
        res.status(201).json(result)
    } else {
        res.status(500).json(result.error || 'an error occured');
    }
};

const editOne = async (req,res,next) => {
    const userId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const result = await mongodb
    .getDB()
    .db()
    .collection('contacts')
    .replaceOne(
        
        { _id: userId },
        contact
        
        );
        if (result.modifiedCount > 0){
            res.status(204).json(result)
        } else {
            res.status(500).json(result.error || 'an error occured');
        }
};



const deleteOne = async (req,res,next) => {
    const userId = new ObjectId(req.params.id);
    
    const result = await mongodb
    .getDB()
    .db()
    .collection('contacts')
    .deleteOne(
        
        { _id: userId },
        
        );
        if (result.modifiedCount > 0){
            res.status(204).json(result)
        } else {
            res.status(500).json(result.error || 'an error occured');
        }
};


module.exports = { getAll, getSingle, addOne, editOne, deleteOne}