const express = require('express');
const router = express.Router()
const employeeModel = require('../schema/employeeSchema')

router.post('/', async(req,res)=>{
    const { deleteId } = req.body;
    console.log(deleteId)
    try{
        const emplyeeProfile = await employeeModel.deleteOne({uniqueId: deleteId})
    }catch (error) {
        console.error('Error deleting document:', error);
      } 
})

module.exports = router