import React, {useState, Fragment} from 'react'
import Bullet from './Bullet'

function DayView(props) {

    const mockBullets = [
        {
            date: '07/06/2020',
            category: 'Work', 
            text: 'Work on Bullet Journal'
        },
        {
            date: '07/06/2020',
            category: 'Work',
            text: '3 easy coding problems'
        },
        {
            date: '07/06/2020',
            category: 'Casual',
            text: 'Stream on Twitch'
        },
        {
            date: '07/06/2020',
            category: 'Casual',
            text: 'Practice piano'
        }
    ]
    
    const [bullets, setBullets] = useState(mockBullets);
    const [day, setDay] = useState({
        name: 'Wednesday',
        date: '07/01/2020'
    })

    const createBullet = () => {

    }

    const addBullet = (value) =>{

        const b = {
            date: '07/06/2020',
            text: ''
        }

        setBullets([...bullets, b])
    }

    return (       
        <Fragment>

            {day.name} <br/>
            {day.date}

            {bullets.map(b => {
                return (
                    <Bullet bullet={b} />
                )
            })}

            

            <button onClick={addBullet}>+</button>
        </Fragment>
    )
}

export default DayView
