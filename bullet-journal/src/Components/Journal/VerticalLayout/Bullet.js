import React, {useState, useContext} from 'react'
import {DayBulletsContext} from './DayView'
import {WeekBulletsContext} from './WeekView'

function Bullet(props) {

    const [options, setOptions] = useState(false)
    const {id, date, category, text, completed} = props.bullet

    const currBulletsContext = props.view === 'day' ? 
        DayBulletsContext : WeekBulletsContext
    const bulletsContext = useContext(currBulletsContext)

    const moreOptionsStyle = {
        display: options ? 'inline-block' : 'none'
    }

    const bulletTextStyle = {
        display: "inline-block" 
        ,padding: "0px 10px 0px 3px"
        ,border: "0px"
        ,outline: "none"
        ,wordWrap: 'break-word'
        ,wordBreak: 'break-all'
        ,backgroundColor: options ? "#faf5fa" : "transparent"
        ,textDecoration: completed ? "line-through" : null
    }

    return (
        <div>
            
            <div style={{
                borderWidth: "5px", 
                padding:"3px 5px",
                backgroundColor: options ? "#faf5fa" : "transparent"
            }}
                onMouseEnter={() => setOptions(true)}
                onMouseLeave={() => setOptions(false)}
            >      
                {false ?
                    <div 
                        style={{
                            width:'100%', height:'100%'
                            ,position: 'fixed'
                            ,top: '0px'
                            ,left: '0px'
                        }}
                    >
                        <div>
                            <span style={{left:"0px"}}>&#9200;</span>
                            <span style={{right:"0px"}}
                                onClick={() => bulletsContext.dispatch(
                                    {type: 'remove', id : id}
                                )}
                            >&#10060;</span>
                        </div>
                    </div>
                : null }

                <input 
                    type="checkbox"
                    style={{margin:"2px 5px 2px 10px"}}
                    onClick={() => {
                        bulletsContext.dispatch({
                            type:'save', 
                            bullet: {...props.bullet, completed: !completed}, 
                            indices: props.indices
                        })
                    }}                  
                />

                <input 
                    type="text"
                    style={bulletTextStyle}
                    value={text}
                    onChange={e => {
                        bulletsContext.dispatch({
                            type:'save', 
                            bullet: {...props.bullet, text: e.target.value},
                            indices: props.indices 
                        })                 
                    }}
                >
                </input>

                <span style={moreOptionsStyle}
                >&#8942;</span>
            </div>
        </div>
    )
}

export default Bullet
