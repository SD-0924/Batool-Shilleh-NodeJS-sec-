const logRequist = (req, res, next) => {
    console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`)
    next()
}

const handle404 = (req, res) => {
    res.status(404).send("Page not found")
}

module.exports = {logRequist, handle404}