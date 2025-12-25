import mongoose from "mongoose";


const Get_db_connection_string = async ()=> {
    const APP_STAGE = process.env.APP_STAGE;
    // console.log("APP STAGE " , APP_STAGE);
    if(APP_STAGE=='local' || APP_STAGE == 'dev' || APP_STAGE == 'prod'){
        return process.env.db_connection_string
    }
    if(APP_STAGE == 'TDD-LOCAL' || APP_STAGE == 'TDD-CICD'){
        return process.env.db_connection_string_for_TDD
    }
}

export const initDBConnection = async ()=> {
    let connectionInstance = null
    if(connectionInstance) return connectionInstance
    const DatabaseConnectionString = await Get_db_connection_string() || ''
    try {
        connectionInstance = mongoose.connect(DatabaseConnectionString)
        return connectionInstance
    } catch(error){
        console.log(`Database connection error ${err}`)
        return null
    }
}