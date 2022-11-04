const fs = require("fs")
const util = require("util")
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

class LogService{
    constructor (dataFile){
        this.dataFile = dataFile
    }

    async getLogData(){
        const data = await this.getData()

        return data.data
    }

    async saveLogData(log_data){
        try {
            const file = await this.getData()

            file.data.unshift(log_data)
            return writeFile(this.dataFile, JSON.stringify(data))
        } catch (error) {
            return next(error)
        }
    }

    // fetches data from the filepath provided in the constructor
    async getData(){
        const data = await readFile(this.dataFile, "utf8")
        if(!data) return[]
        return JSON.parse(data) 
    }
}

module.exports = LogService