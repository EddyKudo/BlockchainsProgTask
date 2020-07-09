import React, { useState, useRef, useEffect} from "react";
import PropTypes from 'prop-types';

export const Typeahead = (props) => {

    const [display, setDisplay] = useState(false);
    const [search, setSearch] = useState("");
    const options = props.list.map((i)=>i.toLowerCase());
    // let optionsLow = options.map((i)=>i.toLowerCase());
    const boxAroud = useRef(null);

    const setColorTab  = (color) => {
        setSearch(color);
        setDisplay(false);
    };

    useEffect(()=>{
        document.addEventListener("mousedown", handleClickOutside)
        return (()=>{
            document.removeEventListener("mousedown", handleClickOutside)
        })
    },[]);

    const handleClickOutside = (e) =>{
        const {current: wrap} = boxAroud;
        if (wrap && !wrap.contains(e.target)){
            setDisplay(false);
        }
    };

    return(
            <div className="wrap" >
                <h3>Typeahead input component</h3>
                <p>Programming Task from Blockchains</p>
                <input id="searchField" value={search}  onChange={(e)=>setSearch(e.target.value)} onClick={()=>setDisplay(!display)} placeholder="Start typing color name.."></input>
                {display && (
                    <div className="typeAheadContainer" ref={boxAroud}>
                        {options.filter((i)=>i.toLowerCase().indexOf(search.toLowerCase())>-1).map((i)=>{
                            return <div onClick={()=> setColorTab(i)} tabIndex="0">
                                        <div className ="colorsLine">{i}</div>
                                    </div>
                        })}
                    </div>
                )}
            </div>
    )
};
Typeahead.propTypes = {
    list : PropTypes.array
};