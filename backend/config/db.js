import mongoose from 'mongoose';

const db = async ()=>{
    await mongoose.connect(`${process.env.MONGODB_URL}/authsys`).then(
        ()=>{
            console.log("database connected");
        }
    ).catch(
        ()=>{
            console.log("mongodb connection problem");
        }
    )
}

export default db;


// const db = async ()=>{
//     mongoose.connection.on("connected",()=>{
//         console.log("mongodb connected");
//     })

//     await mongoose.connect(`${process.env.MONGODB_URL}/authsys`)
// }