import React, {useEffect, useState} from 'react';
import { Box, Divider } from '@chakra-ui/react';
import {CommonTable} from "../components/common/table/Table";
import {historyService} from "../services/history";

function History() {

    const [histories, setHistories] = useState([]);
    // const [filter, setFilter] = useState({})d

    const getHistories = async () => {
        try {
            const histories = await historyService.getHistories();
            setHistories(histories.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getHistories()
    }, []);

    return (
        <div>
            History


            Period here
            <Box borderWidth='1px' borderRadius='lg' overflow='hidden'>
                This Month...
                총 지출액

                지난달 비교
                퍼센트
            </Box>
            <Divider p={3} />
            <Box>
                Filter here
            </Box>
            <Divider p={3} />
            <Box>
                <CommonTable
                    type={'history'}
                    data={histories}
                />
            </Box>
        </div>
    )
}

export default History