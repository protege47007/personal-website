const fs = require("fs")
const util = require("util")
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

// logic for reading and writing feedback data

class AuthService{
    // constructor
    // @param {*} datafile path to json file that contains the feedback data

    constructor(dataFile){
        this.dataFile = dataFile
    }

    // to get all feedback items
    async getAuthData(){
        return (await this.getData)
    }

    async setAuthData(full_name, mail, password){
        try {
            const data = {full_name, mail, password}

            return writeFile(this.dataFile, JSON.stringify(data))

        } catch (error) {
            return next(error)
        }
    }

    // fetches data from the filepath provided in the constructor
    async getData(){
        try {
            const data = await readFile(this.dataFile, "utf8")
            
            if(!data) return {}
            return JSON.parse(data)
        } catch (error) {
            return next(error)
        } 
    }
}

module.exports = AuthService