import React from 'react'
import "./helloWorld.scss";
import {Button, Form} from "react-bootstrap";

export class App extends React.PureComponent<any, any> {

    render() {
        return (
            // TODO: Adding a top level class will allow you to scope your bootstrap 4 css just to your application
            <div className='hello-world-main'>
                <span className='world-highlight'>Hello World!</span> This is a simple test page to show a LabKey HTML view built with React.

                {/*// TODO: Example copied from bootstrap 4 examples*/}
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}
