import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React from 'react';

function ModalForm({ isOpen, onClose }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Fill the form</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input name="title" />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input name="desc" />
            </FormControl>

            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input name="address" />
            </FormControl>

            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input type="number" name="price" />
            </FormControl>

            <FormControl>
              <FormLabel>Category</FormLabel>
              <Input type="number" name="categoryId" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <Input type="file" name="image" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalForm;
