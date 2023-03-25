const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');


router.post('/', controller.PostData);
router.get('/', controller.GetData);
router.delete('/', controller.DeleteData);
router.put('/', controller.updateData);


module.exports = router;