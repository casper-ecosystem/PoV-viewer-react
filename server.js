const express = require("express")
const app = express() // create express app
var cors = require('cors')
const { CasperClient, Contracts, CLPublicKey } = require('casper-js-sdk')
const path = require("path")

const client = new CasperClient("http://35.180.42.211:7777/rpc") ///SHOULD PROBABLY BE DYNAMIC
const contract = new Contracts.Contract(client)
contract.setContractHash("hash-1bbb4b8801e8409a4a10cd2d53d6dfaea89cb97770e716946ae13b97f5326c8b") ///NEED A LIST OF VALID CONTRACT ADDRESSES TO ENUMERATE

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')))

async function getPoVs(pubKey) {
    return contract.queryContractDictionary("owned_tokens", CLPublicKey.fromHex(pubKey).toAccountHashStr().substring(13, CLPublicKey.fromHex(pubKey).toAccountHashStr().length))
}

async function getMetadata(tokenId) {
    return contract.queryContractDictionary("metadata_custom_validated", `${tokenId}`)
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get("/owned_tokens", (req, res) => {
    const pubKey = req.query.pubKey;
    if (req.query.pubKey == null || req.query.pubKey == '') {
        res.status(400).send("Public key not provided")
        return
    }
    getPoVs(pubKey).then(poVs => {
        console.log(poVs)
        res.send(poVs)
        return
    }).catch(error => {
        console.log(error.message)
        res.status(400).send(error.message)
        return
    })

});

app.get("/metadata", (req, res) => {
    const tokenId = req.query.tokenId;
    if (req.query.tokenId == null || req.query.tokenId == '') {
        res.status(400).send("Token ID not provided")
        return
    }
    getMetadata(tokenId).then(metadata => {
        console.log(metadata)
        res.send(metadata)
        return
    }).catch(error => {
        console.log(error.message)
        res.status(400).send(error.message)
        return
    })

});


app.listen(443, () => {
  console.log("server started on port 443")
});
