
const express = require('express');

var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
const { query } = require('express');


var app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'airdrop'
});



connection.connect();
console.log("Connect");



//LOGIN apI
app.get('/login',async function (req,res){
    res.setHeader('Content-Type', 'application/json');
      connection.query(`SELECT * FROM register where email = '${req.query.email}' and password = '${req.query.password}'`, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
})

app.get('/chackuser',async function (req,res){
    res.setHeader('Content-Type', 'application/json');
      connection.query(`SELECT * FROM register where username = '${req.query.username}'`, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
})

app.get('/chackmail',async function (req,res){
    res.setHeader('Content-Type', 'application/json');
      connection.query(`SELECT * FROM register where email = '${req.query.email}'`, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
})

app.get('/refrellCode',async function (req,res){
  res.setHeader('Content-Type', 'application/json');
    connection.query(`SELECT * FROM register where 	refrellCode = '${req.query.Code}'`, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.get('/chackReferralParent',async function (req,res){
  console.log(req.query.referralParent);
  res.setHeader('Content-Type', 'application/json');
    connection.query(`SELECT * FROM register where 	referralParent = '${req.query.referralParent}'`, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

app.post('/register', function(req, res) {
    res.setHeader('Content-Type', 'application/json');


    let record = {
        name : req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        refrellCode : req.body.refrellCode,
        referralParent : req.body.referralParent,
    };
    let sql = "INSERT INTO register SET ?";
    console.log("successfully inserted");
    connection.query(sql, record, (err) => {
        if (err) throw err;
        res.end();
    }); 
})



app.post('/insaddress',async function(req,res) {
    res.setHeader('Content-Type', 'application/json');
  
    let record = {
      Address : req.body.adrs,
      email : req.body.email
    };
    
   console.log(record);
    let sql = await `UPDATE register SET address = "${req.body.adrs}" WHERE email = "${req.body.email}"`
    console.log("successfully inserted");
   
    connection.query(sql, record, (err) => {
        if (err) throw err;
        res.end();
    });
  
  
  })
  
app.post('/tokenhandle',async function(req,res) {

  let TokenData = {
    image: req.body.image,
    email: req.body.email
  }

  let sql = "INSERT INTO wallet_data SET ?";
  connection.query(sql, TokenData, (err) => {
    console.log("image sent");
  }) ;

  res.send("success");


})











// creating fatch api

app.get('/getdata',async function (req,res){
    res.setHeader('Content-Type', 'application/json');
      connection.query(`select * from laundty_data `, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  })
  



// var server = app.listen(8081, function() {
//     var host = server.address().address;
//     var port = server.address().port;
//     console.log("Example app listening at http://%s:%s", host, port);
// });















///////pls insert with id and name  form with post method 
///////pls insert with id and name  form with delet method 

// app.delete('/delete/:id',async function(req, res) {
//     var id= req.params.id;
//       var sql = 'DELETE FROM laundty_data WHERE id = ?';
//       connection.query(sql, [id], function (err, data) {
//       if (err) throw err;
//       console.log(data.affectedRows + " record(s) updated");
//     });
//     res.send('data deleted');
    
//   });


  app.get('/deletdata/:id',async function (req,res){
    res.setHeader('Content-Type', 'application/json');
      connection.query(`DELETE FROM laundty_data WHERE id = ${req.params.id}`, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  })
  

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});


  







///////pls insert with id and name  form with delet method 


///////creat login api------------
// app.post("/login",function(req,res){

//   var email_id = req.body.email_id;
//   var password = req.body.password;

//     connection.query("select * from admin where email_id = ? and password	= ?",[email_id,password],function(error,results,fields){
//       if (results.length > 0){
//         res.redirect("Laundry Admin Panel/admin.html");
//       }else{
//         res.redirect("/");
//       }
//     })
// })


// app.get("/admin",function(req,res){
//     res.sendFile(__dirname + "/")
// })

// app.listen(4000);


// app.get('/login',async function (req,res){
//   res.setHeader('Access-Control-Allow-Origin', '*');
//     connection.query(`select * from admin where email='${req.query.email}' and password='${req.query.password}'`, function (err, result) {
//     if (err) throw err;
//     res.send(result);

//   });
// })




{/* <script>			
								
async function addUser() {
    var name = document.getElementById("2341").value;
    var address =document.getElementById("2").value;
    var whatsnumber =document.getElementById("3").value;
    var native =document.getElementById("4").value;
    var shirt =document.getElementById("5").value;
    var trouser =document.getElementById("6").value;
    var cardigan =document.getElementById("a5").value;
    var aditional_fee =document.getElementById("a8").value;
    console.log(" "+name+address+whatsnumber+native+shirt+trouser+cardigan+aditional_fee);
// POST request using fetch()

 const url = 'http://localhost:8081/form';

    let data = {
        name: name,
        address: address,
        whatsnumber : whatsnumber,
        native:native, shirt:shirt,
        trouser :trouser,
        cardigan :cardigan,
        additional_fee :aditional_fee,
    }

    let request = new Request(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
        'Content-Type': 'application/json'
    })
    });

    await fetch(request)
    .then(function() {
        // Handle response you get from the API
        console.log("data transfer");
    });
    }
</script> */}