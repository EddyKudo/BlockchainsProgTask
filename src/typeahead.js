import React, { useState, useRef, useEffect, useCallback} from "react";
import PropTypes from 'prop-types';
import "./styles.scss"

export const Typeahead = (props) => {

    const [display, setDisplay] = useState(false);
    const [search, setSearch] = useState("");
    const boxAroud = useRef(null);
    const options = props.list;

    const setColorTab  = (color) => {
        setSearch(color);
        setDisplay(false);
    };

    const handleClickOutside = (event) =>{
        const {current: wrap} = boxAroud;
        if (wrap && !wrap.contains(event.target)){
            setDisplay(false);
        }
    };
    useEffect(()=>{
        document.addEventListener("mousedown", handleClickOutside)
        return (()=>{
            document.removeEventListener("mousedown", handleClickOutside)
        })
    },[]);

    const escFunction = useCallback((event) => {
        if(event.keyCode === 27) {
        setDisplay(false);
        }
    }, []);
    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        return () => {
        document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction]);

    const handleEnterKey = (event, color) => {
        if(event.key === 'Enter') {
        setSearch(color);
        setDisplay(false);
        }
    };

    return(
            <div className="wrap" >
                <h3>TypeAhead Input Component</h3>
                <p>BLOCKCHAINS Programming Task</p>
                <input autoComplete="off" id="searchField" value={search} onChange={(event)=>setSearch(event.target.value)} onClick={()=>setDisplay(!display)} placeholder="Start typing color name.."></input>
                {display && search !== "" ?(
                    <div className="typeAheadContainer" ref={boxAroud}>
                        {options.filter((colorItem)=>colorItem.toLowerCase().indexOf(search.toLowerCase())>-1).map((colorItem)=>{                   
                            return <div onKeyDown={(event)=>handleEnterKey(event,colorItem)} onClick={()=> setColorTab(colorItem)} tabIndex="0">
                                        {<span dangerouslySetInnerHTML={{ __html: colorItem.replace(new RegExp(search, "gi"), (match) => `<b style="color:black;">${match}</b>`) }} />}
                                    </div>
                        })}
                    </div>
                ): null}
            </div>
    )
};
Typeahead.propTypes = {
    list : PropTypes.array
};