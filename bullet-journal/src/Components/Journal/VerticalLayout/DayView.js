import React, {Fragment, useReducer} from 'react'
import {v4 as uuid} from 'uuid'
import Bullet from './Bullet';

export const BulletsContext = React.createContext();
export const TestContext = React.createContext();

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

export const testFunction = (arg) => {
    console.log(arg);
}

const bulletsReducer = (state, action) => {
    
    //const prevState = action.prevState;
    
    switch(action.type) {
        case 'add' :
            const b = {
                id: uuid(),
                date: state.day.date,
                category: 'Work',
                text: ''
            }
            return {...state, 
                bullets: [...state.bullets, b]
            }

        case 'save' :
            console.log('inside save')
            console.log(action.bullet)
            let i = 0; 
            for (; i < state.bullets.length; i++) 
                if (state.bullets[i].id == action.bullet.id) break;
            
            console.log(i)
            const newBullets = JSON.parse(JSON.stringify(state.bullets))
            newBullets.splice(i, 1, action.bullet)
            return {...state,
                bullets: newBullets

            }

        case 'remove' :
            console.log('Action', action)
            console.log('state', state)
            return {...state, 
                bullets: state.bullets.filter(e => e.id != action.id)
            }
                
    }
}

function DayView() {

    const [state, dispatchBullets] = useReducer(bulletsReducer, initialState);
    console.log(state)

    return (
        <Fragment>

            {state.day.name} <br/>
            {state.day.date}

            {state.bullets.map(b => {
                return (
                    <Bullet key={b.id} bullet={b} />
                )
            })}

        </Fragment>
    )
}

export default DayView
