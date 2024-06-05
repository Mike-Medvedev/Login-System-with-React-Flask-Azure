const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')



app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/post', (req, res) => {
    res.json(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})