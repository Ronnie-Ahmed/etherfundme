const { ethers } = require("hardhat")

async function main() {
  const fundmefactory = await ethers.getContractFactory("FundMe")
  const fundme = await fundmefactory.deploy()
  await fundme.deployed()
  const provider = new ethers.providers.JsonRpcProvider(
    " http://127.0.0.1:8545/"
  )
  const signer = await provider.getSigner()
  // console.log(signer)
  const owner = await fundme.owner()
  console.log(owner)
  const addresstoamount = await fundme.addresstoamount(owner)
  const minimunusd = await fundme.minimum()
  console.log(ethers.utils.formatEther(addresstoamount))
  console.log(ethers.utils.formatEther(minimunusd))
  const privatekey =
    "0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba"
  const addressto = "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc"
  const signer1 = new ethers.Wallet(privatekey, provider)

  const tx = signer1.sendTransaction({
    to: owner,
    value: ethers.utils.parseEther("5"),
  })

  const tx2 = signer.sendTransaction({
    to: addressto,
    value: ethers.utils.parseEther("5"),
  })
  const balance = await provider.getBalance(owner)
  console.log(ethers.utils.formatEther(balance))
  const balance2 = await provider.getBalance(addressto)
  console.log(ethers.utils.formatEther(balance2))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
