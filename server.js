const express = require("express")
const app = express() // create express app
var cors = require('cors')
const { CasperClient, Contracts, CLPublicKey } = require('casper-js-sdk')
const http = require('http')
const https = require('https')
const path = require("path")
const fs = require('fs')

const client = new CasperClient("http://35.180.42.211:7777/rpc") ///SHOULD PROBABLY BE DYNAMIC
const contract = new Contracts.Contract(client)
contract.setContractHash("hash-1bbb4b8801e8409a4a10cd2d53d6dfaea89cb97770e716946ae13b97f5326c8b") ///NEED A LIST OF VALID CONTRACT ADDRESSES TO ENUMERATE

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')))

const privateKey = fs.readFileSync('/etc/letsencrypt/live/proofofvictory.com/privkey.pem', 'utf8')
const certificate = fs.readFileSync('/etc/letsencrypt/live/proofofvictory.com/cert.pem', 'utf8')
const ca = fs.readFileSync('/etc/letsencrypt/live/proofofvictory.com/chain.pem', 'utf8')

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
}

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

const httpsServer = https.createServer(credentials, app)

const httpApp = express()

httpApp.get('*', function(req, res) {  
    res.redirect('https://' + req.headers.host + req.url);
})

httpApp.listen(3001, () => {
	console.log('HTTPS Server running on port 3001 -> 80')
});

httpsServer.listen(3000, () => {
	console.log('HTTPS Server running on port 300 -> 443')
});
