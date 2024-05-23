import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
const app = express();
const PORT = 8081;
const DATABASE = "formDB"
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
//DB connection
const dbConnection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:DATABASE
});

//API to get reasons from DB
app.get('/getReasons',(req, res)=>{
    const sql = "SELECT * FROM reasons_mast";
    dbConnection.query(sql, (err, result)=>{
        if(err)return res.json({"Message":"Error on Server side"});
        return res.json(result);
    })
});

//API to insert data into form
app.post('/insertFormData',(req, res)=>{
    const sql = "INSERT INTO form_data(`first_name`,`last_name`,`email`,`satisfied`) VALUES (?)";
    console.log(req);
    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.satisfied
    ]
    dbConnection.query(sql, [values], (err, result)=>{
        if(err)return res.json({"Message":"Error on Server side"+err});
        return res.json(result);
    })
    console.log(req);
});

//API to insert reason codes
app.post('/insertReasonCodes',(req, res)=>{
    console.log('In here');
    console.log(req.body.reasonCodes);
    const id = req.body.id;
    const reasonCodes = req.body.reasonCodes;
    reasonCodes.forEach((item)=>{
        const sql = "INSERT INTO form_reason_xref(`cust_id`,`reason_code`) VALUES (?)";
        console.log(req);
        const values = [
            id,
            item
        ]
        dbConnection.query(sql, [values], (err, result)=>{
            if(err)return res.json({"Message":"Error on Server side"+err});
            return res.json(result);
        })
    })

    console.log(req);
});




//Project 2

//API to insert user using sgnup
app.post('/insertUser',(req, res)=>{
    console.log('In here');
    console.log(req);
    const sql = "INSERT INTO users(`username`,`password`,`user_role`)VALUES(?)";
    const values = [
        req.body.username,
        req.body.password,
        req.body.role
    ];
    dbConnection.query(sql, [values], (err, result)=>{
        if(err)return res.json({"Message":"Error on Server side"+err});
        return res.json(result);
    });
});

//API to get User detaisl on Login
app.post('/getUser',(req, res)=>{
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    console.log(req.body);
    const values = [
        req.body.username,
        req.body.password
    ];
    dbConnection.query(sql, values, (err, result)=>{
        if(err)return res.json({"Message":"Error on Server side"+err});
        return res.json(result);
    });
});

//API to insert questions and answers and question types
app.post('/insertQues',(req,res)=>{
    const optionList = req.body.optionList;
    const sql = "INSERT INTO questions(`ques_no`,`ques_text`,`ques_type`) VALUES(?)";
    const values = [
        req.body.quesNo,
        req.body.quesText,
        req.body.quesType
    ]
    dbConnection.query(sql, [values],(err,result)=>{
    if(err)return res.json({"Message":"Error on Server side"});
    return res.json(result);
    });
})


//API to insert answers
app.post('/insertAns',(req,res)=>{
    const optionList = req.body.optionList;
    let id = req.body.quesId;
    let resultArr = [];
    optionList.forEach((element)=>{
        resultArr.push([ id, element.text])
    })
    console.log(optionList);
    console.log(resultArr);
        const sql = "INSERT INTO question_option(ques_id, option_text) VALUES ?";
        const values = resultArr;
        console.log([values]);
        dbConnection.query(sql, [values],(err,result)=>{
            if(err)
            {
                console.log(err);
                return res.json({"Message":"Error on Server side"});
            }
            
            return res.json(result);
        });
    });

//API to retrieve questions
app.get('/getQues',(req,res)=>{
    const sql = 'SELECT a.id, a.ques_no, a.ques_text, a.ques_type, b.id ans_no, b.option_text FROM questions a, question_option b WHERE a.id = b.ques_id ORDER BY ques_no';
    dbConnection.query(sql, (err, result)=>{
        if(err)return res.json({"Message":"Error on Server side"});
        return res.json(result);
    })
    });


//API to retrieve questions for delete
app.get('/getQuesForDelete',(req,res)=>{
const sql = 'SELECT * FROM questions ORDER BY ques_no';
dbConnection.query(sql, (err, result)=>{
    if(err)return res.json({"Message":"Error on Server side"});
    return res.json(result);
})
});


//API to delete questions
app.post('/deleteQues',(req,res)=>{
console.log(req.body[0].ids);
const sql = 'DELETE FROM questions WHERE id in ?';
const values = [
    req.body[0].ids
];
dbConnection.query(sql, [values], (err, result)=>{
    if(err)return res.json({"Message":"Error on Server side"});
    return res.json(result);
})
});

app.listen(PORT, (err)=>{
    if(err)console.log(err);
    console.log('Server is listening');
});