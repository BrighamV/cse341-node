const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.addOne);

router.put('/:id', contactsController.editOne);

router.delete('/:id', contactsController.deleteOne);



module.exports = router;