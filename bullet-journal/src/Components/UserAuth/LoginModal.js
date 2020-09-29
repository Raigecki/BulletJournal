import React, {useState} from "react";
import {Modal, Form, Button} from 'react-bootstrap'
import {Auth} from 'aws-amplify'
import {useHistory} from 'react-router-dom'

function LoginModal(props) {

  const {auth, setAuth} = props;

  const [error, setError] = useState(null)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  let history = useHistory()

  const signIn = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const user = await Auth.signIn(email, password)
      localStorage.setItem('bulletJournalUser', JSON.stringify(user))
      history.push('/dayview')
      auth.setAuthStatus(true)
      auth.setUser(user)
      console.log('User:', user)
    }
    catch(err) {setError(err); console.log(err)}
  }

  return (
    <Modal show={true} size="md" aria-labelledby="contained-modal-title-vcenter" centered>

      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Control as="input" placeholder="E-mail or phone" 
            onChange={e => setEmail(e.target.value)}/>
          <Form.Control type="password" placeholder="Password" 
            onChange={e => setPassword(e.target.value)}/>
        </Form>

        { error ? <p style={{color: "red"}}>{error.message}</p> : null }       
      </Modal.Body>

      <Modal.Footer>
        <Button
            variant="primary"
            onClick={e => signIn(e)}
        >Sign In
        </Button>
      </Modal.Footer>
      
    </Modal>
  );
}

export default LoginModal;