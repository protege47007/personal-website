require("dotenv").config()
const path = require("path")

module.exports = {
    development: {
        siteName: "Protege! [Development]",
        data: {
            about: path.join(__dirname, "../data/about.json"),
            portfolio:  path.join(__dirname, "../data/portfolio.json"),
            auth: path.join(__dirname, "../data/auth.json")
        },
        mailing_agent: {
            key_1: `${process.env.JET_ONE}`,
            key_2: `${process.env.JET_TWO}`
        },
    },
    production: {
        siteName: "Adewumi David A.",
        data: {
            about: path.join(__dirname, "../data/about.json"),
            portfolio:  path.join(__dirname, "../data/portfolio.json")
        },
        mailing_agent: {
            key_1: `${process.env.JET_ONE}`,
            key_2: `${process.env.JET_TWO}`
        }
    }
}