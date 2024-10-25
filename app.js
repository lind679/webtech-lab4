const express = require('express');
const app = express();
const port = 3002;

app.use(express.json());

app.get('/', (req, res) =>{
    res.send('Hello World');
});

app.listen(port, ()=>{
    console.log(`Server is listenig at http://localhost:${port}`);
})