import Web3 from 'web3'
import { ethers } from 'ethers'

import { generateMnemonic } from 'bip39'
import { ABI } from '../ABI/contractAbi.js'

let mainContract = '0x2c176dfD1a27e8c3553d9DA369d16AC7d26A78dE'

export const GenerateWallet = async (req, res) => {
  let generateSeedPhrase = generateMnemonic()
  try {
    const hdNode = ethers.utils.HDNode.fromMnemonic(generateSeedPhrase)
    const newWallet = new ethers.Wallet(hdNode)
    return { publicKey: newWallet.address, privateKey: newWallet.privateKey }
  } catch (error) {
    throw error.message
  }
}

export const GetBalance = async (req, res) => {
  let { walletAddress } = req.body
  try {
    const web3 = new Web3('http://127.0.0.1:7545')
    let Contract = new web3.eth.Contract(ABI.abi, mainContract)

    Contract.methods.balanceOf(walletAddress).call((err, data) => {
      if (err) res.status(500).json({ error: err })
      else
        res
          .status(200)
          .json({ message: 'success', balance: web3.utils.fromWei(data) })
    })
  } catch (error) {
    console.log(error.message)
  }
}

/**
 * transfer value from the main account.
 * @param {*} req
 * @param {*} res
 */
export const OnRamp = async (req, res) => {
  let { walletAddress, amount } = req.body
  try {
    const web3 = new Web3('http://127.0.0.1:7545')
    let Contract = new web3.eth.Contract(ABI.abi, mainContract, {
      from: '0x60F7700CBE9FDCd4cFa31a60f0AEe40D7cd4EE30',
    })
    let _amount = web3.utils.toHex(web3.utils.toWei(amount))

    let data = Contract.methods.transfer(walletAddress, _amount).encodeABI()

    let txObj = {
      gas: web3.utils.toHex(100000),
      to: mainContract,
      value: '0x00',
      data: data,
      from: '0x60f7700cbe9fdcd4cfa31a60f0aee40d7cd4ee30',
    }

    web3.eth.accounts.signTransaction(
      txObj,
      '623b8cd4b894b7143bc7fa06b706babb0960db1b76a3efa8b78f2b7141650b6c',
      (err_, signedTx) => {
        if (err_) {
          return callback(err_)
        } else {
          console.log(signedTx)

          return web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            (err, res_) => {
              if (err) {
                console.log(err)
              } else {
                res.status(201).json({ message: 'successful', hash: res_ })
              }
            },
          )
        }
      },
    )
  } catch (error) {
    throw error.message
  }
}
