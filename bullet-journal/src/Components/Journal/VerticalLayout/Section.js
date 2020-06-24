import React, {useState, useReducer} from 'react'
import Bullet from './Bullet'
import Row from 'react-bootstrap/Row'

function Section(props) {

    const initialState = {
        category: '',
        startDate: '',
        endDate: ''
    }

    const state = [];
    const [counter, setCounter] = useState(0);

    /*
    const reducer = (state, action) => {
        switch(action.type) {
            case 'addBullet':

                return [...state].push(action.)
            case 'deleteBullet':
                return [...state].filter(b => b.id != action.id)
        }
    }
    */

    return (
        <Row>
            {props.section.bullets.map(bullet => {
                return(
                    <Bullet bullet={bullet}/>
                )
            })}
        </Row>
    )
}

export default Section
