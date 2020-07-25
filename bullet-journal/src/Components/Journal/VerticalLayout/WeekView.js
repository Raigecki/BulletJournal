import React, {useState, Fragment} from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Bullet from './Bullet'

const getDayName = (day) => {
    switch(day) {
        case 0: return "Monday"
        case 1: return "Tuesday"
        case 2: return "Wednesday"
        case 3: return "Thursday"
        case 4: return "Friday"
        case 5: return "Saturday"
        case 6: return "Sunday"
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
                text: 'Stream on Twitch',
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
                text: 'Work on Bullet Journal',
                completed: false
            },
            {
                id: 6,
                date: '07/07/2020',
                category: 'Work',
                text: '3 easy coding problems',
                completed: false
            }
        ],
        [
            {
                id: 7,
                date: '07/08/2020',
                category: 'Casual',
                text: 'Stream on Twitch',
                completed: false
            },
            {
                id: 8,
                date: '07/08/2020',
                category: 'Casual',
                text: 'Practice piano',
                completed: false
            },
            {
                id: 9,
                date: '07/08/2020',
                category: 'Casual',
                text: 'Stream on Twitch',
                completed: false
            }
        ],
        [
            {
                id: 10,
                date: '07/09/2020',
                category: 'Casual',
                text: 'Stream on Twitch',
                completed: false
            },
            {
                id: 11,
                date: '07/09/2020',
                category: 'Casual',
                text: 'Practice piano',
                completed: false
            },
            {
                id: 12,
                date: '07/09/2020',
                category: 'Casual',
                text: 'Stream on Twitch',
                completed: false
            }
        ],
        [
            {
                id: 13,
                date: '07/10/2020',
                category: 'Casual',
                text: 'Stream on Twitch',
                completed: false
            }
        ],
        [
            {
                id: 14,
                date: '07/12/2020',
                category: 'Casual',
                text: 'Stream on Twitch',
                completed: false
            },
            {
                id: 15,
                date: '07/12/2020',
                category: 'Casual',
                text: 'Stream on Twitch',
                completed: false
            }
        ]
    ]

    const bullets = useState(mockBullets)
    const week = useState(mockWeek)

    const createColumns = () => {
        const columns = []

        for (let i = 0; i < 7; i++)  { 
            const currDate = new Date(week[0].startDate)
            console.log('Bullet:', bullets[0][i])
            if (bullets[0][i])
                columns.push(
                    <Col>
                        {getDayName(currDate.getDay() + i - 1)} <br />
                        {getDate(currDate, i)} <br /> <br />              
                        {bullets[0][i].map(b => <Bullet bullet={b} />)}             
                    </Col>
                )
        }
    return <Row>{columns}</Row>
    }

    return (
        <div>
            {createColumns()}
            
        </div>
    )
}

export default WeekView
