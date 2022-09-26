import React, { FC, memo, useCallback, useState } from 'react';
import { Button, Col, Form, FormControl, Modal, Row } from 'react-bootstrap';

interface Props {
    close: () => void;
    submit: (name: string) => void;
}

export const CreateSubfolderModal : FC<Props> = memo(props => {
    const { close, submit } = props;
    const [name, setName] = useState<string>('');

    const onChange = useCallback((evt: any) => {
        setName(evt.target.value);
    }, []);

    const _submit = useCallback((evt: any) => {
        submit(name?.trim());
    }, [submit, name]);

    return (
        <Modal show={true} onHide={close}>
            <Modal.Header>Create Subfolder</Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="form-group">
                        <Col xs={4}>
                            <div>Subfolder Name:</div>
                        </Col>
                        <Col xs={8}>
                            <FormControl type="text" id={'subfolder-name'} name={'subfolder-name'} onChange={onChange} />
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Col xs={12}>
                        <Button onClick={close} className="pull-left">
                            Cancel
                        </Button>
                        <Button
                            className="pull-right"
                            bsStyle="success"
                            disabled={name?.trim().length === 0}
                            onClick={_submit}
                        >
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
});