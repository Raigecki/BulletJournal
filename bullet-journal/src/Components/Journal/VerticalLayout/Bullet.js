import React, {useState, useContext} from 'react'
import {BulletsContext, TestContext} from './DayView'

function Bullet(props) {

    const [options, setOptions] = useState(false);
    
    const [state, setState] = useState(
        {
            id: props.bullet.id,
            date: props.bullet.date,
            category: props.bullet.category, 
            text: props.bullet.text
        }
    )

    const bulletsContext = useContext(BulletsContext);
    console.log(bulletsContext)

    return (
        <div>
            
            <div style={{
                borderWidth: "5px", 
                padding:"3px 5px 3px 5px",
                backgroundColor: options ? "#faf5fa" : "transparent"
            }}
                onMouseEnter={() => setOptions(true)}
                onMouseLeave={() => setOptions(false)}
            >
                
                {options ? 
                    <div 
                        className={"bullet-options"}
                        style={{
                            position: "fixed",
                            display:"block",   
                            zIndex:"1",                    
                            padding: "1 1 1 1",
                            transform: "translate(600%, -40%)",
                            border: "solid 2px #e8e3e3",
                            borderRadius: "7px"
                        }}
                    >
                        <span style={{left:"0px"}}>&#9200;</span>
                        <span style={{right:"0px"}}
                            onClick={() => bulletsContext.dispatch(
                                {type: 'remove', id: state.id}
                            )}
                        >&#10060;</span>
                    </div>
                : null }

                <input type={"checkbox"} style={{margin:"2px 5px 2px 10px"}}></input>
                <span 
                    contentEditable={"true"}
                    onChange={e => setState({...state, text: e.target.value})}
                    onBlur={() => bulletsContext.dispatch(
                        {type: 'save', bullet: state}
                    )}
                    style={{display:"inline-block", padding:"0px 3px 0px 3px"}}
                >            
                    {state.text}
                </span>
            </div>
        </div>
    )
}

export default Bullet
