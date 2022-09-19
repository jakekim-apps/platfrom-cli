import React, {useEffect, useState} from 'react'
import {CommonTable} from "../components/common/table/Table";
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
import {cardService} from "../services/card";

function Card() {

    const [cards, setCards] = useState([]);
    const [modal, setModal] = useState(false);

    const [inputs, setInputs] = useState({
        name: '',
        cardNumber: '',
        description: ''
    })

    const [selectedCard, setSelectedCard] = useState({});


    const getCards = async () => {
        try {
            const cards = await cardService.getCards();
            setCards(cards.data);
        } catch (e) {
            console.log(e);
        }

    }

    const createCard = async (data) => {
        try {
            const card = await cardService.registerCard(data);

        } catch (e) {
            console.log(e)
        } finally {
            getCards();
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
        setInputs({
            name: '',
            cardNumber: '',
            description: ''
        })
    }

    const handleCreateCard = () => {
        const data = {
            ...inputs
        }
        createCard(data);
        closeModal()
    }

    const handleClickRow = (row) => {
        console.log(row)
        setSelectedCard(row);
        setInputs({
            name: row.name,
            cardNumber: row.cardNumber,
            description: row.description
        });
    }

    useEffect(() => {
      getCards();
    }, [])

    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div>
                    Card
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
                    type={'card'}
                    data={cards}
                    // onClickRow={handleClickRow}
                />
            </div>


            <Modal
                isOpen={modal}
                onClose={closeModal}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Card
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text mb='8px'>Name: {inputs.name}</Text>
                        <Input
                            value={inputs.value}
                            name={'name'}
                            onChange={handleChange}
                            placeholder='Name'
                            size='md'
                        />

                        <Text mb='8px'>Card Number: {inputs.cardNumber}</Text>
                        <Input
                            value={inputs.cardNumber}
                            name={'cardNumber'}
                            onChange={handleChange}
                            placeholder='Card Number'
                            size='md'
                        />

                        <Text mb='8px'>Description: {inputs.description}</Text>
                        <Input
                            value={inputs.description}
                            name={'description'}
                            onChange={handleChange}
                            placeholder='Description'
                            size='md'
                        />

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={closeModal}>
                            Close
                        </Button>
                        <Button onClick={handleCreateCard}>
                            Apply
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Card