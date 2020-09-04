import React, {useState, useContext} from 'react'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select'
import {DayBulletsContext} from './DayView'
import {WeekBulletsContext} from './WeekView'

function BulletModal2(props) {

    const [form, setForm] = useState({})

    const currBulletsContext = props.view === 'day' ? 
    DayBulletsContext : WeekBulletsContext
    const bulletsContext = useContext(currBulletsContext)
    console.log('Categories', props.categories)
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
                <select
                    defaultValue={'DEFAULT'}
                    onChange={e => setForm({...form, category: e.target.value})}
                >
                    <option value="DEFAULT" disabled>Select Category</option>
                    {props.categories.map(c => 
                        <option key={c} value={c}>{c}</option>
                    )}
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
