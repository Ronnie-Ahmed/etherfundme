import { ethers } from "./ethers-5.2.esm.min.js"
import { abi, contractaddress } from "./constant.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundme")
connectButton.onclick = connect
fundButton.onclick = fund

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", [])
    connectButton.innerHTML = "Connected"
    console.log(ethers)
  } else {
    connectButton.innerHTML = "Please Install Metamask"
  }
}
async function fund(ethAmount) {
  ethAmount = document.getElementById("ethAmount").value
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    console.log(signer)
    const contract = new ethers.Contract(contractaddress, abi, signer)
    try {
      const tx = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      })
      // await listenForTransactionMine(tx, provider)
    } catch (error) {
      console.log(error)
    }
  }
}
