const express = require('express');
const app = express();

const port = 4000;

app.get('/', (req, res)=>{
    res.send("dashboard 123");
});

app.get('/usuario', (req, res)=>{
    res.send("Hi, user sda dasda");
});


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
}); 