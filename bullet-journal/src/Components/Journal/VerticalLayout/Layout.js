import React, {useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import 'bootstrap/dist/css/bootstrap.min.css';

import Day from './Day';
import {mockData} from '../../../data/MockData1';

function Layout() {
    
    const testState = mockData();
    console.log(testState)

    const [view, setView] = useState('6')
    //need a list of sec

    const [rows, setRows] = useState(testState);
    
    return (
        <div>
            <Container>
                <Row>
                    {testState.days.map(day => {
                        return(
                            <Day day={day} />                       
                        )
                    })}
                </Row>
            </Container>
        </div>
    )
}

export default Layout
