import React, {useState, useContext} from 'react'
import Modal from 'react-bootstrap/Modal'
import {DayBulletsContext} from './DayView'
import {WeekBulletsContext} from './WeekView'

function BulletModal2(props) {

    const [form, setForm] = useState({})

    const currBulletsContext = props.view === 'day' ? 
    DayBulletsContext : WeekBulletsContext
    const bulletsContext = useContext(currBulletsContext)
    console.log('BulletsContext', bulletsContext)
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <select
                    defaultValue={'DEFAULT'}
                    onChange={e => setForm({...form, category: e.target.value})}
                >
                    <option value="DEFAULT" disabled>Select Category</option>
                    <option value="work">Work</option>
                    <option value="casual">Casual</option>
                </select> <br />
                <textarea type="text" placeholder="Description" 
                    onChange={e => setForm({...form, text: e.target.value})}
                />

            </Modal.Body>
            <Modal.Footer>
                <button onClick={() => {
                    bulletsContext.dispatch({
                        type: 'add',
                        date: '07/01/2020',
                        category: form.category,
                        text: form.text
                    });
                    props.onHide();
                }}>Save</button>
            </Modal.Footer>
        </Modal>
    )
}

export default BulletModal2
