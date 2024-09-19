import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axiosInstance from '../../axiosInstance';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Button,
  Flex,
  Heading,
  Spacer,
  Divider,
  Input,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import Modal from './ModalForm';

export default function AdminPanel({
  isOpen,
  onClose,
  onOpen,
  housings,
  setHousings,
}) {
  const [users, setUsers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  useEffect(() => {
    axiosInstance.get('/users').then((response) => setUsers(response.data));
  }, []);

  const onEditModal = (id) => {
    setIsEdit(true);
    setEditId(id);
    onOpen();
  };

  const onDeleteHousing = async (id) => {
    const areYouSure = confirm('Are you sure you want to remove this item? ');
    try {
      if (areYouSure) {
        const response = await axiosInstance.delete(`/housings/${id}`);
        if (response.status === 200) {
          setHousings((prev) => prev.filter((item) => item.id !== id));
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Flex p={5}>
        <Heading>Admin Panel</Heading>
        <Spacer></Spacer>
        <Button
          leftIcon={<AddIcon />}
          onClick={onOpen}
          variant="outline"
          colorScheme="blue"
        >
          Add Housing
        </Button>
      </Flex>
      <Divider />
      <TableContainer p={7}>
        <Text
          fontSize="19px"
          color="blue.400"
          fontWeight="700"
          textAlign="center"
        >
          Users
        </Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>User ID</Th>
              <Th>User name</Th>
              <Th>User Email</Th>
              <Th>User Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map(({ id, username, role, email }) => {
              return (
                <Tr key={id}>
                  <Td>{id}</Td>
                  <Td>{username}</Td>
                  <Td>{email}</Td>
                  <Td>{role}</Td>
                  <Td>
                    {role !== 'admin' && (
                      <Button>
                        <DeleteIcon />
                      </Button>
                    )}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Housings table */}

      {housings.length > 0 && (
        <TableContainer p={7}>
          <Text
            fontSize="19px"
            color="blue.400"
            fontWeight="700"
            textAlign="center"
            mb={5}
          >
            Housings
          </Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>Image</Th>
                <Th>Address</Th>
                <Th>Price $</Th>
                <Th>CategoryId "1:room, 2:flat, 3: house"</Th>
              </Tr>
            </Thead>
            <Tbody>
              {housings.map(
                ({ id, title, desc, image, address, price, categoryId }) => {
                  return (
                    <Tr key={id}>
                      <Td>{id}</Td>
                      <Td>{title}</Td>
                      <Td>{desc}</Td>
                      <Td>{image}</Td>
                      <Td>{address}</Td>
                      <Td>{price}</Td>
                      <Td>{categoryId}</Td>

                      <Td>
                        <Button onClick={() => onEditModal(id)}>
                          {isEdit ? <CloseIcon /> : <EditIcon />}
                        </Button>
                        <Button onClick={() => onDeleteHousing(id)}>
                          <DeleteIcon />
                        </Button>
                      </Td>
                    </Tr>
                  );
                }
              )}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      <Modal
        setEditId={setEditId}
        editId={editId}
        isEdit={isEdit}
        isOpen={isOpen}
        onClose={onClose}
        setIsEdit={setIsEdit}
        setHousings={setHousings}
      />
    </>
  );
}
