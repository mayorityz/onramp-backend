import mongoose from 'mongoose'

const deploymentSchema = new mongoose.Schema(
  {
    contractAddress: String,
    deployerAddress: String,
  },
  { timestamps: true },
)
const Deployment = mongoose.model('deployment', deploymentSchema)

const MintSchema = new mongoose.Schema(
  {
    toAddress: String,
    txHash: String,
    refContract: String,
  },
  { timestamps: true },
)

export const Mint = mongoose.model('mint', MintSchema)

export default Deployment
