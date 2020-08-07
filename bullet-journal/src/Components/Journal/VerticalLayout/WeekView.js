import React, {useState, useReducer, useRef, Fragment} from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Bullet from './Bullet'
import {v4 as uuid} from 'uuid'

export const WeekBulletsContext = React.createContext();

const getDayName = (day) => {
    switch(day) {
        case 0: return 'Monday'
        case 1: return 'Tuesday'
        case 2: return 'Wednesday'
        case 3: return 'Thursday'
        case 4: return 'Friday'
        case 5: return 'Saturday'
        case 6: return 'Sunday'
        default: return ''
    }
}

const getDate = (startDate, day) => {
    const date = new Date(startDate)
    date.setDate(date.getDate() + day)
    const dateString = ''
        + date.getMonth() + '/'
        + date.getDate() + '/'
        + date.getFullYear()

    return dateString
}

const findItemById = (arr, id) => {
    for (let i = 0; i < arr.length; i++) 
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j].id === id)  return [i, j]
    }   
}

const bulletsReducer = (state, action) => {
    
    const newBullets = JSON.parse(JSON.stringify(state))
    
    switch(action.type) {

        case 'add' :
            const b = {
                id: uuid(),
                date: state.day.date,
                category: 'Work',
                text: ''
            }
            return [...state.bullets, b]

        case 'save' :
            const [g, i] = findItemById(newBullets, action.bullet.id)
            newBullets[g].splice(i, 1, action.bullet)
            return newBullets

        case 'drag':
            const curr = {...state[action.dragging.current.dragGroup]
                    [action.dragging.current.dragItem]};
            console.log('Curr:', curr)
            newBullets[action.dragging.current.dragGroup]
                .splice(action.dragging.current.dragItem, 1)
            console.log('Copy before splice:', newBullets[action.dragging.current.dragGroup])
            newBullets[action.enterGroup].splice(action.enterItem , 0, curr);
            console.log('Copy after splice:', newBullets[action.dragging.current.dragGroup])
            return newBullets
                            
        case 'remove' :
            const [h, k] = findItemById(newBullets, action.bullet.id)
            newBullets[h].splice(k, 1)
            return newBullets
            
        default:
            return state
                
    }
}

function WeekView() {
    //Bullets assumed to be given starting Monday
    const mockWeek = {
        startDate: '07/06/2020',
        endDate: '07/12/2020'
    }
    const mockBullets = [     
        [
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
                text: 'Stream League',
                completed: false
            },
            {
                id: 4,
                date: '07/06/2020',
                category: 'Casual',
                text: 'Practice piano',
                completed: false
            },
        ],
        [
            {
                id: 5,
                date: '07/07/2020',
                category: 'Work', 
                text: 'Checkers with React',
                completed: false
            },
            {
                id: 6,
                date: '07/07/2020',
                category: 'Work',
                text: '2 medium coding problems',
                completed: false
            }
        ],
        [
            {
                id: 7,
                date: '07/08/2020',
                category: 'Casual',
                text: 'Make a Youtube video',
                completed: false
            },
            {
                id: 8,
                date: '07/08/2020',
                category: 'Casual',
                text: 'Practice guitar',
                completed: false
            },
            {
                id: 9,
                date: '07/08/2020',
                category: 'Casual',
                text: 'Play volleyball',
                completed: false
            }
        ],
        [
            {
                id: 10,
                date: '07/09/2020',
                category: 'Casual',
                text: 'Go surfing',
                completed: false
            },
            {
                id: 11,
                date: '07/09/2020',
                category: 'Casual',
                text: 'Practice 2-5-1',
                completed: false
            },
            {
                id: 12,
                date: '07/09/2020',
                category: 'Casual',
                text: 'Stream Civ 6',
                completed: false
            }
        ],
        [
            {
                id: 13,
                date: '07/10/2020',
                category: 'Casual',
                text: 'Make food',
                completed: false
            }
        ],
        [],
        [
            {
                id: 14,
                date: '07/12/2020',
                category: 'Casual',
                text: 'Get a burger',
                completed: false
            },
            {
                id: 15,
                date: '07/12/2020',
                category: 'Casual',
                text: 'Hang out with friend',
                completed: false
            }
        ]
    ]

    const dragging = useRef({});
    const week = useState(mockWeek)
    const [bullets, dispatchBullets] = useReducer(bulletsReducer, mockBullets)

    const createColumns = () => {
        const columns = []
        for (let g = 0; g < 7; g++) {
            const currDate = new Date(week[0].startDate)

            columns.push(
                <Col key={getDayName(currDate.getDay() + g - 1)}
                    onDragEnter={ !bullets[g].length ? e =>
                        handleDragEnter(e, g, 0) : null
                    }             
                >
                    {getDayName(currDate.getDay() + g - 1)} <br />
                    {getDate(currDate, g)} <br /> <br />
                    {bullets[g].map( (b, i) =>
                        <div key={b.id}
                            draggable
                            onDragStart={e => handleDragStart(e, g, i)}
                            onDragEnd={e => handleDragEnd(e)}
                            onDragEnter={e => handleDragEnter(e, g, i)}
                            style={{textAlign:"left", padding:"5px, 10px, 5px, 10px"}}
                        >
                            <Bullet key={b.id} bullet={b} view="week"/>
                        </div>
                    )}
                </Col>
            )
        }
        return <Row>{columns}</Row>
    }

    const handleDragStart = (e, g, i) => {
        dragging.current.dragItem = i
        dragging.current.dragGroup = g
        dragging.current.dragElem = e.target
        toggleDragStyle(e, g, i)
        console.log('Dragstart:', dragging)
    }

    const handleDragEnd = (e) => {
        dragging.current = {};
        toggleDragStyle(e, dragging)
        console.log('End drag', dragging)
    }

    const handleDragEnter = (e, g, i) => {
        if (g !== dragging.current.dragGroup || i !== dragging.current.dragItem) {
            console.log('Dragging', bullets[dragging.current.dragGroup][dragging.current.dragItem])
            console.log('Entered ( ', g, ',', i, ')')
            
            dispatchBullets({
                type: 'drag',
                enterGroup: g,
                enterItem: i,
                dragging: dragging
            })
            
            dragging.current.dragGroup = g;
            dragging.current.dragItem = i;
            console.log("here")
        }
    }

    const toggleDragStyle = (e, g, i) => {
        console.log('Toggle style')
        
        if (dragging.current.dragGroup == g && dragging.current.dragItem == i)
            e.target.style.backgroundColor = 'lightblue'
        else 
            e.target.style.backgroundColor = 'transparent'
    }

    return (
        <Fragment>
            <WeekBulletsContext.Provider value={{
                bullets: bullets, 
                dispatch: dispatchBullets
            }}>
                {createColumns()}
            </WeekBulletsContext.Provider>

        </Fragment>
    )
}

export default WeekView
