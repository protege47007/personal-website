const fs = require("fs")
const util = require("util")
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

class PortfolioService{
    constructor (dataFile){
        this.dataFile = dataFile
    }

    async getPortfolio(){
        try {
            const data = await this.getData()

            return data.projects
        } catch (error) {
            return next(error)
        }
    }

    async setPortfolio({name, desc, imageUrl, imageAlt, Url}){
        try {
            const data = await this.getData()
            data.projects.unshift({name, desc, imageUrl, imageAlt, Url})
            return writeFile(this.dataFile, JSON.stringify(data))
        } catch (error) {
            return next(error)
        }
    }

    // fetches data from the filepath provided in the constructor
    async getData(){
        try {
            const data = await readFile(this.dataFile, "utf8")
            
            if(!data) return[]
            
            return JSON.parse(data)
        } catch (error) {
            return next(error)
        } 
    }
}

module.exports = PortfolioService