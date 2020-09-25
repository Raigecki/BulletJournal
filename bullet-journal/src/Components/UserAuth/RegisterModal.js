import React, {useState} from 'react';
import {Modal, Form, Button} from 'react-bootstrap'
import {Auth} from 'aws-amplify'

function LoginModal() {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const register = async (e) => {
    e.preventDefault()
    setError(null);

    if (password != confirmPassword) {
      setError({ message: 'Your passwords do not match'})
      return
    }

    try {
      const signUpRes = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email
        }
      })
    }
    catch (err) { setError(err); console.log(err) }
  }

  return (
    <Modal show={true} size="md" aria-labelledby="contained-modal-title-vcenter" centered>

      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Control as="input" placeholder="Enter e-mail" 
            onChange={(e) => setEmail(e.target.value)}/>
          <Form.Control type="password" placeholder="Enter password" 
            onChange={(e) => setPassword(e.target.value)}/>
          <Form.Control type="password" placeholder="Confirm password" 
            onChange={(e) => setConfirmPassword(e.target.value)}/>
        </Form>

        {error ? <span style={{color: "red"}}>{error.message}</span> : null}   
      </Modal.Body>

      <Modal.Footer>
        <Button
            variant="primary"
            onClick={(e) => register(e)}
        >Register
        </Button>
      </Modal.Footer>
      
    </Modal>
  );
}

export default LoginModal;