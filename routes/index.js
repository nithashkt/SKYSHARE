const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Student = require('../models/Student');
const User = require('../models/User');
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));



// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
{
  let id_user_value= [];
  const{_id} = req.user;
  global.id_user_value = _id;
  global.user_value_db = _id;
  //console.log(id_user_value);
 // console.log(_id,name);
  res.render('dashboard', {
    user: req.user,
  })
}

);



//Add shop
router.get('/dashboard/addstudent', ensureAuthenticated, (req, res) =>
  res.render('addstudent', {
    user: req.user
  })
);


//adding to new colelction SHOP Data
router.post('/addstudent', (req,res) => {
  //console.log("shop");
  console.log(id_user_value);
  console.log(req.body);
  const { code_title, code_desc, code_new, date } = req.body;

          let errors = [];

          if (!code_title || !code_new  ) {
    errors.push({ msg: 'Please enter all fields' });
  }

  console.log(errors);

  if (errors.length > 0) {
    console.log('Inside Value');
    console.log(id_user_value);
    res.render('addstudent', {
     errors,code_title,code_new
    });
  } else{
     const newStudent = new Student({
      id_user_value, code_title,code_desc,code_new, date
  });
 newStudent
 .save()
 .then(user => {
  req.flash(
    'success_msg',
    'Code saved sucessfully.'
  );
  res.render('addstudent', {
    id_user_value,code_title,code_desc,code_new,date
   });

})
.catch(err => console.log(err));
 
 
  console.log("Saved sucessfully");
  Student.find(function(err, response){
       console.log(response);
       
    });

  }
 
 });



 //Editing

 //List of datas
 router.get('/dashboard/editdata', ensureAuthenticated, (req, res)=> {
   console.log(id_user_value);
   //console.log('Testing inside this')
   
  Student.find({ 'id_user_value': user_value_db },(err, response)=>{
    // res.json(response);
     res.render('find',{
     myobject: response,
     user: req.user
     })
     
  });
});

//List of Student Marks
router.get('/studmarks', ensureAuthenticated, (req, res)=> {
  console.log(id_user_value);
  //console.log('Testing inside this')
  
 Student.find({ 'id_user_value': user_value_db },(err, response)=>{
   // res.json(response);
    res.render('stud_marks',{
    myobject: response,
    user: req.user
    })
    
 });
});

//List of Student Marks
router.get('/studentmarks', (req, res)=> {
  //console.log(id_user_value);
  //console.log('Testing inside this')
  
 Student.find((err, response)=>{
   // res.json(response);
    res.render('stud_marks',{
    myobject: response,
    user: req.user
    })
    
 });
});





//Search Page
router.get('/autocomplete/', function(req, res, next) {

  var regex= new RegExp(req.query["term"],'i');
 
  var employeeFilter =Shop.find({name_disp:regex},{'name_disp':1}).sort({"updated_at":-1}).sort({"created_at":-1}).limit(20);
  employeeFilter.exec(function(err,data){
console.log(data)

var result=[];
if(!err){
   if(data && data.length && data.length>0){
     data.forEach(user=>{
       let obj={
         id:user._id,
         label: user.name_disp
       };
       result.push(obj);
     });

   }
  
   res.jsonp(result);
}

  });

});



//Viewing Disrict Madrassa
router.get('/dist/:dist_name', (req, res)=> {
  console.log("inside this yeyy");
  console.log(req.params.dist_name);
  User.find({ 'dist': req.params.dist_name },(err, response)=>{
    // res.json(response);
    console.log(response)
     res.render('district',{
     dist_id: req.params.dist_name,
     dist_data: response
     }) 
  });
});

//Viewing Individual madarasa marks
router.get('/dist/:dist_name/:madrasa_id', (req, res)=> {
  console.log("inside this yeyy");
  var user_data_madr= [];
  User.find({'madrasa_id':req.params.madrasa_id},(err,response)=>{
    response.forEach(user=>{
      let obj={
        id:user._id,
        madrasa_id: user.madrasa_id
      };
      user_data_madr.push(obj);
      console.log(obj.id)
      Student.find({'id_user_value':obj.id},(err,response)=>{
        //res.json(response);
        res.render('stud_marks',{
          myobject: response
          })
      })
    });
  });
});

//Rendering result page
router.get('/result', (req, res)=> {
  res.render('result');
});

router.get('/home', (req, res)=> {
  res.render('subs/index');
});


//Viewing Individual Regno marks
router.post('/result/regno', (req, res)=> {

      Student.find({'reg_no': req.body.reg_no },(err,response)=>{
        //res.json(response);
        res.render('stud_marks',{
          myobject: response
          })
      })
    });


//Editing Form
router.get('/dashboard/editdata/edit/:_id', ensureAuthenticated, (req, res)=> {
  console.log("inside this yeyy");
  Student.findById(req.params._id, function(err, response){
    console.log(response);
    res.render('editdata',{
       per_id: response
     });
 });
});

//Posting the edited data
router.post('/editdata/edit/:_id', function(req, res){
  console.log("hello")
  Student.findByIdAndUpdate(req.params._id, req.body, function(err, response){
     Student.find(function(err, response){
      res.redirect('/dashboard/editdata');
       
     });
  }); 
});

router.get('/dashboard/settings', ensureAuthenticated, (req, res) =>
  res.render('settings', {
    user: req.user
  })
);

module.exports = router;
