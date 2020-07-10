import React, { useState, useRef, useEffect} from "react";
import PropTypes from 'prop-types';
import "./styles.scss"

export const Typeahead = (props) => {

    const [display, setDisplay] = useState(false);
    const [search, setSearch] = useState("");
    const options = props.list;
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
                                        {<span dangerouslySetInnerHTML={{ __html: i.replace(new RegExp(search, "gi"), (match) => `<b>${match}</b>`) }} />}
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