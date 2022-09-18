import React from 'react'
import MainTemplate from "../components/templates/MainTemplate";
import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";

function DashBoard() {
    return (
            <div>
                <Tabs variant='soft-rounded' colorScheme='green'>
                    <TabList>
                        <Tab>Tab 1</Tab>
                        <Tab>Tab 2</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <p>one!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
    )
}

export default DashBoard