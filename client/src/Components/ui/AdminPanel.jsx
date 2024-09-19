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
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import Modal from './ModalForm';

export default function AdminPanel({ isOpen, onClose, onOpen }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axiosInstance.get('/users').then((response) => setUsers(response.data));
  }, []);
  return (
    <>
      <Flex mt={5} p={5}>
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
                  {role !== 'admin' && (
                    <Button>
                      <DeleteIcon />
                    </Button>
                  )}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
