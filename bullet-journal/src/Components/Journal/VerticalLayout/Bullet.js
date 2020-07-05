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
        <div 
            onMouseEnter={() => setOptions(true)} 
            onMouseLeave={() => setOptions(false)}>
            {options ? 
                <div>
                    <span 
                        onClick={() => bulletsContext.dispatch({type: 'remove', id: state.id})}
                    >x</span> 
                </div>        
            : null }

            <textarea onChange={e => setState({...state, text: e.target.value})}>            
                {state.text}
            </textarea>
        </div>
    )
}

export default Bullet
