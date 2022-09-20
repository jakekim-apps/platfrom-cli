import React, {useEffect, useState} from 'react'
import {cardService} from "../services/card";
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
import {accountService} from "../services/account";

function Account() {

    const [accounts, setAccounts] = useState([]);
    const [modal, setModal] = useState(false);

    const [inputs, setInputs] = useState({
        name: '',
        accountNumber: '',
        description: '',
        amount: 0
    })

    const [selectedAccount, setSelectedAccount] = useState(null);


    const getAccounts = async () => {
        try {
            const accounts = await accountService.getAccounts();
            setAccounts(accounts.data);
        } catch (e) {
            console.log(e);
        }

    }

    const createAccount = async (data) => {
        try {
            const account = await accountService.registerAccount(data);
        } catch (e) {
            console.log(e);
        } finally {
            getAccounts();
        }
    };

    const updateAccount = async (data) => {
        try {
            const account = await accountService.updateAccount(data);
        } catch (e) {
            console.log(e);
        } finally {
            getAccounts();
        }
    };

    const removeAccount = async (data) => {
        try {
            const account = await accountService.removeAccount(data);
        } catch (e) {
            console.log(e);
        } finally {
            getAccounts();
        }
    };

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
        setSelectedAccount(null);
        setInputs({
            name: '',
            accountNumber: '',
            description: '',
            amount: 0
        })
    }

    const handleCreateAccount = () => {
        const data = {
            ...inputs
        };
        createAccount(data);
        closeModal();
    };

    const handleUpdateAccount = () => {
        const data = {
            ...inputs,
            id: selectedAccount._id
        };
        updateAccount(data);
        closeModal();
    };

    const handleRemoveAccount = () => {
        const data = {
            id: selectedAccount._id
        };
        removeAccount(data);
        closeModal();
    };

    const handleClickRow = (row) => {
        setSelectedAccount(row);
        setInputs({
            name: row.name,
            accountNumber: row.accountNumber,
            description: row.description,
            amount: row.amount
        });
        openModal();
    };

    useEffect(() => {
        getAccounts();
    }, [])

    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div>
                    Account
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
                    type={'account'}
                    data={accounts}
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
                        Account
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

                        <Text mb='8px'>Account Number</Text>
                        <Input
                            value={inputs.accountNumber}
                            name={'accountNumber'}
                            onChange={handleChange}
                            placeholder='Account Number'
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

                        <Text mb='8px'>Amount</Text>
                        <Input
                            value={inputs.amount}
                            name={'amount'}
                            onChange={handleChange}
                            placeholder='Amount'
                            size='md'
                        />

                    </ModalBody>
                    <ModalFooter>
                        {
                            selectedAccount &&
                            <Button onClick={handleRemoveAccount}>
                                Remove
                            </Button>
                        }
                        <Button onClick={closeModal}>
                            Close
                        </Button>
                        <Button onClick={selectedAccount ? handleUpdateAccount : handleCreateAccount}>
                            Apply
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Account