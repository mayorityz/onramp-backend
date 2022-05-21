import mongoose from 'mongoose'

let connection

try {
  connection = mongoose.connect('mongodb://localhost/nft', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
} catch (error) {
  console.log(error)
}

export default connection
