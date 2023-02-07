import  dotenv  from 'dotenv';
import app from './src/app.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

app.get('*',(req,res)=>{
    res.status(404).end("404 - page not found ");
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
}); 