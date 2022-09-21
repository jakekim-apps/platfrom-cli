import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer, Checkbox,
} from '@chakra-ui/react';
import {useState} from "react";
import React from "react";

const HeaderMap = {
    card: {
        title: "Card List",
        headers: [
            {
                key: 'name',
                text: 'Name'
            },
            {
                key: 'cardNumber',
                text: 'Card Number'
            },
            {
                key: 'description',
                text: 'Description'
            }
        ]
    },
    account: {
        title: "Account List",
        headers: [
            {
                key: 'name',
                text: 'Name'
            },
            {
                key: 'accountNumber',
                text: 'Account Number'
            },
            {
                key: 'description',
                text: 'Description'
            },
            {
                key: 'amount',
                text: 'Amount'
            }
        ]
    },
    category: {
        title: 'Category List',
        headers: [
            {
                key: 'name',
                text: 'name'
            },
            {
                key: 'description',
                text: 'Description'
            }
        ]
    },
    subCategory: {
        title: 'SubCategory List',
        headers: [
            {
                key: 'name',
                text: 'name'
            },
            {
                key: 'description',
                text: 'Description'
            },
            {
                key: 'category.name',
                text: 'Category Name'
            }
        ]
    }
}

export const CommonTable = (props) => {

    const title = HeaderMap[props.type]?.title || '';
    const headers = HeaderMap[props.type]?.headers || [];
    const data = props.data || [];

    const handleClickRow = (d) => {
        if (props.onClickRow) {
            props.onClickRow(d);
        }
    };

    return (
        <TableContainer>
            <Table variant='striped' colorScheme='teal'>
                <TableCaption> {title} </TableCaption>
                <Thead>
                    <Tr>
                        {
                            headers.map((h, i) => <Th key={'header_' + i}> {h.text} </Th>)
                        }
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.map((d, i) => {
                            return (
                                <Tr key={i} onClick={handleClickRow ? () => handleClickRow(d) : () => {}}>
                                    {
                                        headers.map((h, i) => <Td key={'body_'+i}> {d[h.key]} </Td>)
                                    }
                                </Tr>
                            )
                        })
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}