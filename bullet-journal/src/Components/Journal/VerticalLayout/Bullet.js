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

    return (
        <div style={{borderWidth: "5px"}}
            onMouseEnter={() => setOptions(true)} 
            onMouseLeave={() => setOptions(false)}
        >
            
            {options ? 
                <div className={"bullet-header"} style={{textAlign: "right"}}>
                    <span style={{left:"0px"}}>&#10149;</span>
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
                style={{display:"inline-block", width:"80%"}}
            >            
                {state.text}
            </span>

            {options ?
                <div className={"bullet-footer"} style={{textAlign: "right"}}>
                    <span 
                        onClick={() => bulletsContext.dispatch(
                            {type: 'save', bullet: state}
                        )}>&#10004;</span>
                </div>
            : null }
        </div>
    )
}

export default Bullet
