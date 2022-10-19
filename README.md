# Proof-of-Victory NFT Viewer

## Introduction

This React application was built for use by hackathon winners to view their Proof-of-Victory NFTs,

Proof-of-Victory (PoV) NFTs are on-chain certificates that allow for physical recognition of an individual's acheivement. While PoV's were created by the Casper Association to recognize hackathon winners, they may be used by other organizations and/or other events.

See the [Proof-of-Victory Design Spec](https://github.com/casper-ecosystem/PoV-design-spec) for more information.

## Visit the Site

[Proof-of-Victory NFT Viewer]()

## Install

Navigate to the working directory you'd like to use

Run:
```bash
git clone https://github.com/casper-ecosystem/PoV-viewer-react.git && cd PoV-viewer-react/
```

Install `npm` dependencies:
```bash
npm install
```

Start the server, which handles Casper Network requests to circumvent [cors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS):
```bash
node server.js
```

Open another terminal in the same directory and run:
```bash
npm start
```
to initialize the React app.

Visit [localhost:3000](http://localhost:3000)

## Future Work

The PoV Viewer app could benefit from an on-chain smart contract containing an ever growing list of authorized Proof-of-Victory NFTs.

The authorization authority will be determined either by voting or perhaps even more democratically.
