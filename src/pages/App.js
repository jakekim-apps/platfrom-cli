import './App.css';
import {
    Routes,
    Route, BrowserRouter
} from "react-router-dom";
import DashBoard from "./DashBoard";
import History from "./History";
import React from "react";
import { ChakraProvider } from '@chakra-ui/react'
import MainTemplate from "../components/templates/MainTemplate";
import Card from "./Card";
import Account from "./Account";
import SubCategory from "./SubCategory";
import Category from "./Category";
import User from "./User";

function App() {
    return (
        <ChakraProvider>
            <MainTemplate>
                <Routes>
                    <Route path="/" element={<DashBoard />} />
                    <Route path="/histories" element={<History />} />
                    <Route path="users" element={<User />} />
                    <Route path="categories" element={<Category />} />
                    <Route path="sub-categories" element={<SubCategory />} />
                    <Route path="accounts" element={<Account />} />
                    <Route path="cards" element={<Card />} />
                </Routes>
            </MainTemplate>
        </ChakraProvider>
    );
}

export default App;
