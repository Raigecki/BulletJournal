import React, {useState, useContext} from 'react'
import {DayBulletsContext} from './DayView'
import {WeekBulletsContext} from './WeekView'

function Bullet(props) {

    const [options, setOptions] = useState(false)
    const {id, date, category, text, completed} = props.bullet
    const [actionBar, setActionbar] = useState({})

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

    const toggleActionBar = (e, toggle) => {
        if (toggle == true) {
            setActionbar({          
                show: true
                ,overlayStyle: {
                    width:'100%', height:'100%'
                    ,position: 'fixed'
                    ,top: '0px'
                    ,left: '0px'
                    ,zIndex:"1"
                }
                ,actionBarStyle : {
                    position: "fixed"
                    ,left: (e.clientX - 10) 
                    ,top: (e.clientY - 30)
                    ,display:"block"   
                    ,zIndex:"1"
                    ,padding: "2px 3px 3px 3px"
                    ,border: "solid 2px #e8e3e3"
                    ,borderRadius: "5px"
                    ,backgroundColor: "white"
                }
            })
        }
        else {
            setActionbar({...actionBar
                ,show: false                
            })
        }
    }


    return (
        <div>
            {/*Action bar*/}  
            {actionBar.show ?
                <div 
                    style={actionBar.overlayStyle} 
                    onClick={e => {toggleActionBar(e, false); console.log('clicked')}}>

                    <div style={actionBar.actionBarStyle}>
                        <span style={{left:"0px"}}>&#9200;</span>
                        <span style={{right:"0px"}}
                            onClick={() => bulletsContext.dispatch({
                                type: 'remove', 
                                id : id,
                                indices: props.indices
                            })}
                        >&#10060;</span>
                    </div>
                </div>
            : null }

            <div style={{
                borderWidth: "5px", 
                padding:"3px 5px",
                backgroundColor: options ? "#faf5fa" : "transparent"
            }}
                onMouseEnter={() => setOptions(true)}
                onMouseLeave={() => setOptions(false)}
            >    

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

                <span 
                    style={moreOptionsStyle}
                    onClick={e => toggleActionBar(e, true)}
                >&#8942;</span>
            </div>
        </div>
    )
}

export default Bullet
