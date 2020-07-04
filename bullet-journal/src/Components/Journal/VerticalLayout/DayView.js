import React, {useState, Fragment, useReducer} from 'react'
import Bullet from './Bullet'

const mockBullets = [
    {
        id: 1,
        date: '07/06/2020',
        category: 'Work', 
        text: 'Work on Bullet Journal'
    },
    {
        id: 2,
        date: '07/06/2020',
        category: 'Work',
        text: '3 easy coding problems'
    },
    {
        id: 3,
        date: '07/06/2020',
        category: 'Casual',
        text: 'Stream on Twitch'
    },
    {
        id: 4,
        date: '07/06/2020',
        category: 'Casual',
        text: 'Practice piano'
    }
]

const mockDay = {
    name: 'Wednesday',
    date: '07/01/2020'
}

const initialState = {
    day: mockDay,
    bullets: mockBullets
}

const bulletsReducer = (bullets, action) => {
    
    const prevState = action.prevState;
    
    switch(action.type) {
        case 'add' :
            const b = {
                date: prevState.day.name,
                text: ''
            }
            return {...prevState, 
                bullets: [...prevState.bullets, b]
            }

        case 'remove' :
            return {...prevState, 
                bullets: bullets.filter(e => e.id == action.payload.id)
            }
    }
}

function DayView() {

    const [state, dispatchBullets] = useReducer(bulletsReducer, initialState);

    return (       
        <Fragment>

            {state.day.name} <br/>
            {state.day.date}

            {state.bullets.map(b => {
                return (
                    <Bullet key={b.id} bullet={b} />
                )
            })}         

            <button
                onClick={dispatchBullets({type: 'add', prevState: state})}
            >+</button>
        </Fragment>
    )
}

export default DayView
