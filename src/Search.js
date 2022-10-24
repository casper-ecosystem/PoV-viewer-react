import './css/Search.css';
import Nav from './Nav'

function Search(props) {

  return (
    <>
        <Nav toggleSearch={() => props.toggleSearch(false)} />
        <div id="searchArea">
            <input type="text" placeholder="Public Key" onInput={validate}/>
            <button className="fancy" onClick={() => reroute(props)}>Use Public Key</button>
            <p className="notifier">Please enter a valid public key</p>
        </div>
        
    </>
  );
}

function validate() {
    const input = document.querySelector("#searchArea input[type=text]");
    const notifier = document.querySelector("#searchArea p.notifier");
    const regex = /^(?:01|02)[0-9a-fA-F]{64}$/
    if (input.value == null || input.value == "" || !regex.test(input.value)) {
        notifier.style.visibility = "visible";
        return false;
    } else {
        notifier.style.visibility = "hidden";
        return input.value;
    }
}

function reroute(props) {
    const input = validate();
    if (input) {
        props.setPubKey(input);
    }
}

export default Search;
