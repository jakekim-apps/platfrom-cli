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
import {subCategoryService} from "../services/subCategory";
import CommonSelect from "../components/common/select/Select";

function SubCategory() {

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [modal, setModal] = useState(false);

    const [inputs, setInputs] = useState({
        name: '',
        description: '',
        categoryId: ''
    })

    const [selectedSubCategory, setSelectedSubCategory] = useState(null);


    const getCategories = async () => {
        try {
            const categories = await categoryService.getCategories();
            setCategories(categories.data);
        } catch (e) {
            console.log(e);
        }
    }

    const getSubCategories = async () => {
        try {
            const subCategories = await subCategoryService.getSubCategories();
            setSubCategories(subCategories.data);
        } catch (e) {
            console.log(e);
        }
    }

    const createSubCategory = async (data) => {
        try {
            const subCategory = await subCategoryService.createSubCategory(data);
        } catch (e) {
            console.log(e)
        } finally {
            getSubCategories();
        }
    }

    const updateSubCategory = async (data) => {
        try {
            const subCategory = await subCategoryService.updateSubCategory(data);
        } catch (e) {
            console.log(e);
        } finally {
            getSubCategories();
        }
    }

    const removeSubCategory = async (data) => {
        try {
            const subCategory = await subCategoryService.removeSubCategory(data);
        } catch (e) {
            console.log(e);
        } finally {
            getSubCategories();
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
        setSelectedSubCategory(null);
        setInputs({
            name: '',
            description: '',
            categoryId: ''
        })
    }

    const handleCreateSubCategory = () => {
        const data = {
            ...inputs
        }
        createSubCategory(data);
        closeModal()
    }

    const handleUpdateSubCategory = () => {
        const data = {
            ...inputs,
            id: selectedSubCategory._id
        };
        updateSubCategory(data);
        closeModal();
    }

    const handleRemoveSubCategory = () => {
        const data = {
            id: selectedSubCategory._id
        };
        removeSubCategory(data);
        closeModal();
    }

    const handleClickRow = (row) => {
        setSelectedSubCategory(row);
        setInputs({
            name: row.name,
            description: row.description,
            categoryId: row.categoryId
        });
        openModal();
    }

    const handleChangeCategory = (category) => {
        setInputs({
            ...inputs,
            categoryId: category._id
        })
    }

    useEffect(() => {
        getCategories();
    }, [])

    useEffect(() => {
        getSubCategories();
    }, [])

    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div>
                    Sub Category
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
                    type={'subCategory'}
                    data={subCategories}
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
                        Sub Category
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text mb='8px'>Category</Text>
                        <CommonSelect
                            data={categories}
                            onChange={handleChangeCategory}
                        />

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
                            selectedSubCategory &&
                            <Button onClick={handleRemoveSubCategory}>
                                Remove
                            </Button>
                        }
                        <Button onClick={closeModal}>
                            Close
                        </Button>
                        <Button onClick={selectedSubCategory ? handleUpdateSubCategory : handleCreateSubCategory}>
                            Apply
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default SubCategory