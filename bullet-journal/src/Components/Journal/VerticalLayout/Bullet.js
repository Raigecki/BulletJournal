import React, {useState, useContext} from 'react'
import {DayBulletsContext} from './DayView'
import {WeekBulletsContext} from './WeekView'

function Bullet(props) {

    const [options, setOptions] = useState(false);
    const [state, setState] = useState(
        {
            id: props.bullet.id,
            date: props.bullet.date,
            category: props.bullet.category, 
            text: props.bullet.text,
            completed: props.bullet.completed
        }
    )
    const currBulletsContext = props.view === 'day' ? 
        DayBulletsContext : WeekBulletsContext
    const bulletsContext = useContext(currBulletsContext)
    //console.log(bulletsContext)

    const bulletOptionStyle = {
        position: "fixed"
        ,display:"block"   
        ,zIndex:"1"                    
        ,padding: "2px 3px 3px 3px"
        ,transform: "translate(450%, -70%)"
        ,border: "solid 2px #e8e3e3"
        ,borderRadius: "5px"
        ,backgroundColor: "white"
    }
    
    const bulletTextStyle = {
        display: "inline-block" 
        ,padding: "0px 10px 0px 3px"
        ,border: "0px"
        ,outline: "none"
        ,backgroundColor: options ? "#faf5fa" : "transparent"
        ,textDecoration: state.completed ? "line-through" : null
    }

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
                        style={bulletOptionStyle}
                    >
                        <span style={{left:"0px"}}>&#9200;</span>
                        <span style={{right:"0px"}}
                            onClick={() => bulletsContext.dispatch(
                                {type: 'remove', id: state.id}
                            )}
                        >&#10060;</span>
                    </div>
                : null }

                <input 
                    type={"checkbox"} 
                    style={{margin:"2px 5px 2px 10px"}}
                    onClick={() => {
                        setState({...state, completed: !state.completed})
                        bulletsContext.dispatch({
                            type:'save', bullet: {...state, completed: !state.completed} 
                        })
                    }}
                    
                />
                <input 
                    type="text"
                    style={bulletTextStyle}
                    value={state.text}
                    onChange={e => {
                        setState({...state, text: e.target.value})                       
                        bulletsContext.dispatch({
                            type:'save', id: props.bullet.id, bullet: state 
                        })                 
                    }}
                >
                </input>

            </div>
        </div>
    )
}

export default Bullet
