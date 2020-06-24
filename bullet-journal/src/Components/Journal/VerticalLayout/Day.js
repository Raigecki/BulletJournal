import React from 'react'
import Section from './Section'
import Col from 'react-bootstrap/Col'

function Day(props) {

    return (
        <Col>
            <div>
                {props.day.day} <br />
                {props.day.date}
                {props.day.sections.map(section => {
                    return(
                        <Section section={section} />
                    )
                })}
            </div>
        </Col>
    )
}

export default Day
