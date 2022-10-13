const fs = require("fs")
const util = require("util")
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

class PortfolioService{
    constructor (dataFile){
        this.dataFile = dataFile
    }

    async getAboutInfo(){
        const data = await this.getData()

        return data.about
    }

    async getResume(){
        const data = await this.getData()

        return data.resume
    }

    // fetches data from the filepath provided in the constructor
    async getData(){
        const data = await readFile(this.dataFile, "utf8")
        if(!data) return[]
        return JSON.parse(data) 
    }
}

module.exports = PortfolioService