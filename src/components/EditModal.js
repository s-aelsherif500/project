import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const EditModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" onClick={toggle} className="btn"><i className="fa fa-pencil"></i>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Edit Member</ModalHeader>
        <ModalBody>
        <Form>
            <FormGroup>
                <Label for="Name">Name</Label>
                <Input type="text" name="name" id="Name" placeholder="Enter name" />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="Enter Email" />
            </FormGroup>
            <FormGroup>
                <Label for="Phone">Phone</Label>
                <Input type="number" name="phone" id="Phone" placeholder="Enter Phone" />
            </FormGroup>
            <FormGroup>
                <Label for="Group">Group</Label>
                <Input type="text" name="group" id="Group" placeholder="Enter Group" />
            </FormGroup>
            <FormGroup>
                <Label for="Start">Start Date</Label>
                <Input type="date" name="start" id="Start" placeholder="Start Date" />
            </FormGroup>
            <FormGroup>
                <Label for="End">End Date</Label>
                <Input type="date" name="end" id="End" placeholder="End Date" />
            </FormGroup>
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" style={{marginLeft:0}} onClick={toggle}>Confirm</Button>{' '}
          <Button color="danger" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default EditModal;