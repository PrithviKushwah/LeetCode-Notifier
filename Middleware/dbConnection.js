import mongoose from "mongoose";

const dataBaseConnection = () => {
    
    mongoose.connect('mongodb+srv://kushwahprithvi78:AuGl5qxXnWuaJK5v@cluster0.asemftj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(()=>{
console.log("Database Connected");
    }).catch(()=>{
        console.log("Failed to Connect with Database !");

    })
}

export default dataBaseConnection