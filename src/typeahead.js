import React, { useState, useRef, useEffect} from "react";
import PropTypes from 'prop-types';
// import {colorsList} from "./index"

export const Typeahead = (props) => {

    const [display, setDisplay] = useState(false);
    const [search, setSearch] = useState("");
    const options = props.list;
    // let optionsLow = options.map((i)=>i.toLowerCase())

    const setColorTab  = (color) => {
        setSearch(color);
        setDisplay(false);
    }

    const boxAroud = useRef(null);
    
    useEffect(()=>{
        document.addEventListener("mousedown", handleClickOutside)
        return (()=>{
            document.removeEventListener("mousedown", handleClickOutside)
        })
    },[])

    const handleClickOutside = (e) =>{
        const {current: wrap} = boxAroud;
        if (wrap && !wrap.contains(e.target)){
            setDisplay(false);
        }
    }

    return(
            <div className="wrap" >
                <h3>Typeahead input component</h3>
                <p>Programming Task from Blockchains</p>
                <input id="searchField" value={search}  onChange={(e)=>setSearch(e.target.value)} onClick={()=>setDisplay(!display)} placeholder="Start typing color name.."></input>
                {display && (
                    <div className="typeAheadContainer" ref={boxAroud}>
                        {options.filter((i)=>i.indexOf(search) > 0).map((i)=>{
                            return <div onClick={()=> setColorTab(i)} tabIndex="0">
                                        <span>{i}</span>
                                    </div>
                        })}
                    </div>
                )}
            </div>
    )
}
Typeahead.propTypes = {
    list : PropTypes.array
};