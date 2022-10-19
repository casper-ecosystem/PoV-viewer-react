import './css/PoVList.css';

function PoVList(props) {

  const images = props.list.map((metadata) => 
    <img src={metadata.image} key={metadata.tokenId} onClick={() => selectPoV()}/>
  )

  return (
    <div id="images">{images}</div>
  )
}

function selectPoV() {
  console.log("test")
}

export default PoVList;
