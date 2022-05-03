import React from 'react';

export function Popup(props){
    const [show, setShow] = useState(false)
    function showTrigger(){
        setShow(!show)
    }
    return (
        <div className="popup">
            <div className= "popuptext">
                <button className="close-btn" onClick = {showTrigger}>close</button>
                {props.children}
            </div>
        </div>
    )
}