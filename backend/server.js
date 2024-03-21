const express = require("express")
const mysql = require('mysql')
const cors = require('cors')
const http = require('http')
const {Server} = require('socket.io')

const app= express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"toan1234",
    database:"signup"
})

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: '*',
    }
  });

io.on('connection',(socket)=>{
    console.log('User Connected');
    socket.on('sendToServer' , data =>{
        const prizeObject = JSON.parse(data);
        console.log(prizeObject)
        io.emit('receivePrize', prizeObject)
    })
    socket.on('notifyToServer',data =>{
        console.log(data)
        io.emit('notifyToClient',data)
    })
    socket.on('server',()=>{
        io.emit('dataUpdated');
    }) 
})

app.post('/signup', (req,res)=>{
    const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql,[values],(err, data)=>{
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
})
app.post('/login', (req,res)=>{
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?"
    db.query(sql,[req.body.email, req.body.password],(err, data)=>{
        if(err){
            return res.json("Error");
        }
        if(data.length > 0)
        {
            const name = data[0].name;
            return res.json({ success: "Success", username: name });
        }else
        {
            return res.json("Failed");
        }
    })
})
app.get('/layso', (req, res) => {
    const sql = "SELECT * FROM sotrungthuong"; 
    db.query(sql, (err, data) => {
        if (err) {
            return res.json("Error");
        }
       
        return res.json(data);
    });
})
app.post('/change', (req, res) => {
    const id = req.body.id;
    const so = req.body.so;
    console.log(id);
    console.log(so);
    const sqlQuery = "UPDATE sotrungthuong SET `so` = ? WHERE `id` = ?";
    db.query(sqlQuery, [so,id], (err, data) => {
        
        if (err) {
            console.error('Error:', err);
            res.status(500).send('Internal server error');
        } else {
            console.log('Cập nhật thành công.');
            res.status(200).send('Cập nhật thành công');
        }
    });
});
app.get('/alo',(req,res)=>{
    res.send('alo')
})

server.listen(8081, () => {
    console.log("listening");
});
