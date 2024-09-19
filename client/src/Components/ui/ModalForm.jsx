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
import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance';

function ModalForm({
  isOpen,
  onClose,
  isEdit,
  editId,
  setIsEdit,
  setEditId,
  setHousings,
}) {
  const [content, setContent] = useState({
    title: '',
    desc: '',
    address: '',
    price: '',
    categoryId: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleContentChange = (e) => {
    const { name, value } = e.target;
    setContent((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleImageButtonClick = () => {
    document.getElementById('imageInput').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEdit) {
      if (
        !content.title ||
        !content.address ||
        !content.desc ||
        !content.price ||
        !content.categoryId
      ) {
        alert('All inputs are required');
        return;
      }
    }

    const { title, desc, address, price, categoryId } = content;

    console.log(title, desc, address, price, categoryId);

    const formData = new FormData();
    formData.append('title', content.title);
    formData.append('desc', content.desc);
    formData.append('address', content.address);
    formData.append('price', content.price);
    formData.append('categoryId', content.categoryId);
    if (image) {
      formData.append('image', image);
    }

    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      if (!isEdit) {
        const response = await axiosInstance.post(`/housings`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 200) {
          alert('Success');
          setContent({
            title: '',
            address: '',
            desc: '',
            categoryId: '',
            price: '',
          });
          setHousings((prev) => [...prev, response.data]);
          setImage(null);
          setImagePreview(null);
          onClose();
        }
      }
      if (isEdit) {
        const response = await axiosInstance.put(
          `/housings/${editId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        if (response.status === 200) {
          alert('Success');
          setContent({
            title: '',
            address: '',
            desc: '',
            categoryId: '',
            price: '',
          });
          setHousings((prev) =>
            prev.map((item) => (item.id === editId ? response.data : item))
          );
          setImage(null);
          setImagePreview(null);
          onCloseModal();
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onCloseModal = () => {
    setIsEdit(false);
    setEditId(null);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Fill the form</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  value={content.title}
                  onChange={handleContentChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  name="desc"
                  value={content.desc}
                  onChange={handleContentChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  name="address"
                  value={content.address}
                  onChange={handleContentChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  name="price"
                  value={content.price}
                  onChange={handleContentChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Category</FormLabel>
                <Input
                  type="number"
                  name="categoryId"
                  value={content.categoryId}
                  onChange={handleContentChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Image</FormLabel>
                <Input
                  type="file"
                  name="image"
                  id="imageInput"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <Button
                  onClick={handleImageButtonClick}
                  variant="ghost"
                  colorScheme="blue"
                >
                  Add Image
                </Button>
                {imagePreview && (
                  <div style={{ marginTop: '10px' }}>
                    <img
                      src={imagePreview}
                      alt="Selected Preview"
                      style={{ width: '100px', height: '100px' }}
                    />
                  </div>
                )}
              </FormControl>
              {isEdit ? (
                <Button type="submit" colorScheme="blue" mr={3}>
                  Edit
                </Button>
              ) : (
                <Button type="submit" colorScheme="blue" mr={3}>
                  Add
                </Button>
              )}
            </form>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onCloseModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalForm;
