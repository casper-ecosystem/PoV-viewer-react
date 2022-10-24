import './css/Viewer.css';
import { getPoVs, getMetadatas } from './casper/lib.js';
import PoVList from './PoVList'
import NFT from './NFT'
import Nav from './Nav'
import React from 'react';

function Viewer(props) {
  const [poVs, setPoVs] = React.useState(null);
  const [metadatas, setMetadatas] = React.useState(null);
  const [selected, setSelected] = React.useState(null);

  const noPoVsJSX = (
    <div id="viewer">
      <Nav setPubKey={(e) => props.setPubKey(e)} pubKey={props.pubKey} toggleTryUsingSigner={(e) => props.toggleTryUsingSigner(e)} metadatas={metadatas} poVs={poVs}/>
    </div>
  );

  if (selected != null) {
    return (
      <NFT metadata={findMetadata(selected, metadatas)} setSelected={setSelected}/>
    );
  }

  if (poVs == null) {
    getPoVs(props.pubKey).then(result => {
      setPoVs(result.data);
    }).catch(error => {
      console.error(error);
    })
  } else {
    if (metadatas == null) {
      getMetadatas(poVs).then(result => {
        console.log(result)
        setMetadatas(result)
      }).catch(error => {
        alert(`Error retrieving metadata for PoV NFTs: ${error.message}`)
      })
      return noPoVsJSX;
    }
  }

  if (metadatas == null) { // Need this again because poVs and metadatas could both be null
    return noPoVsJSX;
  } else {
    return (
      <div id="viewer">
        <Nav setPubKey={(e) => props.setPubKey(e)} pubKey={props.pubKey} toggleTryUsingSigner={(e) => props.toggleTryUsingSigner(e)} metadatas={metadatas} poVs={poVs}/>
        <PoVList list={metadatas} setSelected={setSelected}/>
      </div>
    );
  }
  
}

function findMetadata(selected, metadatas) {
  for (var i = 0; i < metadatas.length; i++) {
    if (metadatas[i].tokenId == selected) {
      return metadatas[i];
    }
  }
}

function truncate(key) {
  var s, f;
  s = key.substring(0, 5)
  f = key.substring(key.length - 6, key.length - 1)
  return s + "..." + f
}

export default Viewer;
