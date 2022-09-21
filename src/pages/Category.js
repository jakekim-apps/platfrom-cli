import React, {useEffect, useState} from 'react'
import {
    Button,
    Divider, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text
} from "@chakra-ui/react";
import {CommonTable} from "../components/common/table/Table";
import {categoryService} from "../services/category";

function Category() {

    const [categories, setCategories] = useState([]);
    const [modal, setModal] = useState(false);

    const [inputs, setInputs] = useState({
        name: '',
        description: '',
    })

    const [selectedCategory, setSelectedCategory] = useState(null);


    const getCategories = async () => {
        try {
            const categories = await categoryService.getCategories();
            setCategories(categories.data);
        } catch (e) {
            console.log(e);
        }

    }

    const createCategory = async (data) => {
        try {
            const category = await categoryService.createCategory(data);
        } catch (e) {
            console.log(e)
        } finally {
            getCategories();
        }
    }

    const updateCategory = async (data) => {
        try {
            const category = await categoryService.updateCategory(data);
        } catch (e) {
            console.log(e);
        } finally {
            getCategories();
        }
    }

    const removeCategory = async (data) => {
        try {
            const category = await categoryService.removeCategory(data);
        } catch (e) {
            console.log(e);
        } finally {
            getCategories();
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
        setSelectedCategory(null);
        setInputs({
            name: '',
            description: ''
        })
    }

    const handleCreateCategory = () => {
        const data = {
            ...inputs
        }
        createCategory(data);
        closeModal()
    };

    const handleUpdateCategory = () => {
        const data = {
            ...inputs,
            id: selectedCategory._id
        };
        updateCategory(data);
        closeModal();
    }

    const handleRemoveAccount = () => {
        const data = {
            id: selectedCategory._id
        };
        removeCategory(data);
        closeModal();
    }

    const handleClickRow = (row) => {
        setSelectedCategory(row);
        setInputs({
            name: row.name,
            description: row.description
        });
        openModal();
    }

    useEffect(() => {
        getCategories();
    }, [])

    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div>
                    Category
                </div>
                <div>
                    <Button colorScheme='teal' size='md' onClick={openModal}>
                        Button
                    </Button>
                </div>
            </div>
            <Divider p={3}/>
            <div style={{paddingTop: '30px'}}>
                <CommonTable
                    type={'category'}
                    data={categories}
                    onClickRow={handleClickRow}
                />
            </div>


            <Modal
                isOpen={modal}
                onClose={closeModal}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Category
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text mb='8px'>Name</Text>
                        <Input
                            value={inputs.name}
                            name={'name'}
                            onChange={handleChange}
                            placeholder='Name'
                            size='md'
                        />

                        <Text mb='8px'>Description</Text>
                        <Input
                            value={inputs.description}
                            name={'description'}
                            onChange={handleChange}
                            placeholder='Description'
                            size='md'
                        />
                    </ModalBody>
                    <ModalFooter>
                        {
                            selectedCategory &&
                            <Button onClick={handleRemoveAccount}>
                                Remove
                            </Button>
                        }
                        <Button onClick={closeModal}>
                            Close
                        </Button>
                        <Button onClick={selectedCategory ? handleUpdateCategory : handleCreateCategory}>
                            Apply
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Category