// import express in student.js
const express = require('express');

// importing Router function from express
const router = express.Router();

// importing nedb light weight Database
const Database = require('nedb');

// Creating Database folder and file, also initializing into a student variable
const student = new Database ({filename:'database/student.db', autoload:true});

router.get('/', async  (req,res) => {

    //Using Error_Handling
    try
    {   
       // Using await, which means waiting for promise from database
       await student.find({}).exec ( (err,data) => {
        if(err)
        {
          res.status(500).json({message:'Server Side Error'});
        }
        })
  
       res.status(200).json({message:'Everything is fine Sir!'});
    }

    catch
    {
      res.status(500).json({message:'Server Side Error'});
    }
})


router.get('/:user_id', async  (req,res) => {

    //Using Error_Handling
    try
    {   
       // Using await, which means waiting for promise from database  only for specified user id
       await student.findOne({_id: req.params.user_id} , (err,user_data) => {
        if(err)
        {
          res.status(500).json({message:'Server Side Error'});
        }
        if(user_data!=null)
        {
            res.status(200).send(user_data);
        }

        else
        {
            res.status(500).send("<h1>User Data doesn't exist!</h1>");
        }
        })
  
    }

    catch(Error)
    {
        res.status(500).json({message:'Server Side Error: ' + Error});

    }
})



router.post('/', async (req,res) => {

    //Using Error_Handling
    try
    { 
      //waiting and inserting json format data into database file student.db
      await student.insert(req.body);
      res.send(`<h1>Student Personal Data has been Added Successfully</h1>`);
    }

    catch(Error)
    {
       res.status(500).json({message:'Server Side Error: ' + Error});
    }
 
})



router.patch('/:user_id', async  (req,res) => {

  //Using Error_Handling
  try
  {   
     // Using await, which means waiting for promise from database  only for specified user id data to update
     await student.update({_id: req.params.user_id} , req.body , {upsert: false}, (err,updateUserData) => {
      if(err)
      {
        res.status(500).json({message:'Server Side Error'});
      }
      if(updateUserData==true)
      {   
          // Using Template Literals instead of Concatenation!
          res.status(200).json({message: (`User Name: ${req.body.name} Updated Successfully`)});
      }

      else
      {
          res.status(500).send("<h1>User Data doesn't exist!</h1>");
      }
      })

  }

  catch(Error)
  {
      res.status(500).json({message:'Server Side Error: ' + Error});

  }
})



router.delete('/:user_id', async  (req,res) => {

  //Using Error_Handling
  try
  {   
     // Using await, which means waiting for promise from database  only for specified user id data to delete
     await student.remove({_id: req.params.user_id} , req.body , (err,deleteUserData) => {
      if(err)
      {
        res.status(500).json({message:'Server Side Error'});
      }
      if(deleteUserData==true)
      {   
          // Using Template Literals instead of Concatenation!
          res.status(200).json({message: (`User Name: ${req.body.name} Deleted Successfully`)});
      }

      else
      {
          res.status(500).send("<h1>User ID doesn't exist!</h1>");
      }
      })

  }

  catch(Error)
  {
      res.status(500).json({message:'Server Side Error: ' + Error});

  }
})




// Executing router while using Module
module.exports = router;