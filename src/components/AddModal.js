import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const AddModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="success" onClick={toggle} className="add-member btn btn-success"><i className="fa fa-plus"></i>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>AddMember</ModalHeader>
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
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" style={{marginLeft:0}} onClick={toggle}>+ Add</Button>{' '}
          <Button color="danger" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddModal;