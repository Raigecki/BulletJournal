import React, {useState, useContext} from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import Select from 'react-select'
import {DayBulletsContext} from './DayView'
import {WeekBulletsContext} from './WeekView'

function BulletModal2(props) {

    const [form, setForm] = useState({})

    const currBulletsContext = props.view === 'day' ? 
    DayBulletsContext : WeekBulletsContext
    const bulletsContext = useContext(currBulletsContext)

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title>Add Bullet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control as="select">
                        <option value="DEFAULT" disabled>Select Category</option>
                        {props.categories.map(c => 
                            <option key={c} value={c}>{c}</option>
                        )}
                    </Form.Control>
                    <Form.Control as="textarea" placeholder="Description" />
                    <p></p>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={() => {
                        bulletsContext.dispatch({
                            type: 'add',
                            date: '07/01/2020',
                            category: form.category,
                            text: form.text
                        });
                        props.onHide();
                    }}
                >Save</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default BulletModal2
