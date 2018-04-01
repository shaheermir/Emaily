const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Hiii!')
})

const PORT = process.env.PORT || 3000
app.listen(3000, () => console.log('Server is running on port 3000.'))
