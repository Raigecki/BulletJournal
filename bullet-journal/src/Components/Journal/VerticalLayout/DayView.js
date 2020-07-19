import React, {Fragment, useReducer, useEffect, useState} from 'react'
import {v4 as uuid} from 'uuid'
import Bullet from './Bullet';

export const BulletsContext = React.createContext();
export const TestContext = React.createContext();

const mockBullets = [
    {
        id: 1,
        date: '07/06/2020',
        category: 'Work', 
        text: 'Work on Bullet Journal',
        completed: false
    },
    {
        id: 2,
        date: '07/06/2020',
        category: 'Work',
        text: '3 easy coding problems',
        completed: false
    },
    {
        id: 3,
        date: '07/06/2020',
        category: 'Casual',
        text: 'Stream on Twitch',
        completed: false
    },
    {
        id: 4,
        date: '07/06/2020',
        category: 'Casual',
        text: 'Practice piano',
        completed: false
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

const bulletsReducer = (state, action) => {
        
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
            const i = state.bullets.findIndex(b => b.id == action.bullet.id)
            const newBullets = [...state.bullets]
            newBullets.splice(i, 1, action.bullet)
            return {...state,bullets: newBullets}

        case 'drag':
            const curr = {...state.bullets[action.dragIndex]};
            const copy = [...state.bullets]
            copy.splice(action.dragIndex, 1)
            copy.splice(action.enterIndex, 0, curr);
            return {...state, bullets: copy}
                            
        case 'remove' :
            return {...state, 
                bullets: state.bullets.filter(e => e.id !== action.id)
            }
            
        default:
            return state
                
    }
}


function DayView() {

    const [state, dispatchBullets] = useReducer(bulletsReducer, initialState);
    const [dragging, setDragging] = useState({})
    
    const handleDragStart = (e, itemIndex, dragging) => {
        dragging.dragItem = itemIndex
        dragging.dragElem = e.target
        toggleDragStyle(e, dragging)
        console.log('Begin dragging', dragging)
    }

    const handleDragEnd = (e, dragging) => {
        dragging = null
        toggleDragStyle(e, dragging)
        console.log('End drag', dragging)
    }

    const handleDragEnter = (e, i) => {
        if (i !== dragging.dragItem) {
            dispatchBullets({
                type: 'drag', 
                enterIndex: i, 
                dragIndex: dragging.dragItem
            })
            dragging.dragItem = i;
        }
    }

    const toggleDragStyle = (e, dragging) => {
        console.log('Toggle style')
        
        if (dragging)
            e.target.style.backgroundColor = 'lightblue'
        else 
            e.target.style.backgroundColor = 'transparent'
    }

    return (
        <Fragment>
            {state.day.name} <br/>
            {state.day.date} <br/><br/>
            
            <BulletsContext.Provider value={{
                bullets: state.bullets, 
                dispatch: dispatchBullets
            }}>

                {state.bullets.map((b, i) => (
                    <div
                        key={b.id}
                        draggable
                        onDragStart={e => handleDragStart(e, i, dragging)}
                        onDragEnd={e => handleDragEnd(e, dragging)}
                        onDragEnter={e => {handleDragEnter(e, i)}}
                        style={{textAlign:"left", padding:"5px, 10px, 5px, 10px"}}
                    >

                        <Bullet bullet={b} />

                    </div>

                ))}
            </BulletsContext.Provider>


        </Fragment>
    )
}


export default DayView
