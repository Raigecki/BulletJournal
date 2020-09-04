import React, {Fragment, useReducer, useRef, useState} from 'react'
import {v4 as uuid} from 'uuid'
import Bullet from './Bullet';
import BulletModal from './BulletModal2';
import { Container, Button, Link } from 'react-floating-action-button'

export const DayBulletsContext = React.createContext();

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
    date: '07/01/2020',
    categories: ['Work', 'Casual', 'Other']
}

const initialState = {
    day: mockDay,
    bullets: mockBullets
}

const bulletsReducer = (state, action) => {
        
    switch(action.type) {
        case 'add' :
            const newBullet = {
                id: uuid(),
                date: action.date,
                category: action.category,
                completed: false,
                text: action.text
            }
            return {...state, bullets: [...state.bullets, newBullet] }

        case 'save' :
            console.log('Index:', action.indices)
            const newBullets = [...state.bullets]
            newBullets.splice(action.indices, 1, action.bullet)
            return {...state, bullets: newBullets}

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
    const [showModal, setShowModal] = useState(false)
    const dragging = useRef({})
    
    const handleDragStart = (e, itemIndex, dragging) => {
        dragging.current.dragItem = itemIndex
        dragging.current.dragElem = e.target
        toggleDragStyle(e, dragging.current)
    }

    const handleDragEnd = (e, dragging) => {
        dragging.current = {}
        toggleDragStyle(e, dragging.current)
    }

    const handleDragEnter = (e, i) => {
        if (i !== dragging.dragItem) {
            dispatchBullets({
                type: 'drag', 
                enterIndex: i, 
                dragIndex: dragging.current.dragItem
            })
            dragging.current.dragItem = i;
        }
    }

    const toggleDragStyle = (e, dragging) => {
        
        if (dragging.current)
            e.target.style.backgroundColor = 'lightblue'
        else 
            e.target.style.backgroundColor = 'transparent'
    }

    return (
        <Fragment>
            {state.day.name} <br/>
            {state.day.date} <br/><br/>
            
            <DayBulletsContext.Provider value={{
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

                        <Bullet bullet={b} view='day' indices={0, i} />

                    </div>
                ))}

                <Container>
                    <Button
                        tooltip="Create new category"
                        icon="far fa-sticky-note" 
                        styles={{backgroundColor:"#4287f5"}}
                        className="fab-item btn btn-link btn-lg text-white"
                    >C</Button>
                    <Button onClick={() => setShowModal(true)}
                        tooltip="Create new bullet"
                        icon="fas fa-user-plus" 
                        className="fab-item btn btn-link btn-lg text-white"
                        styles={{backgroundColor:"#4287f5"}}
                    >&#10085;</Button>
                    <Button
                        tooltip="The big plus button!"
                        icon="fas fa-plus"
                        styles={{
                            fontSize: "2em"
                            ,paddingBottom: "0.2em"
                            ,backgroundColor:"#4287f5"
                            ,color:"white"
                        }}
                        rotate={true}
                    >+</Button>
                </Container>

                <BulletModal
                    show={showModal}
                    categories={state.day.categories}
                    onHide={() => setShowModal(false)}
                    view = "day"
                />    

            </DayBulletsContext.Provider>

        </Fragment>
    )
}


export default DayView
