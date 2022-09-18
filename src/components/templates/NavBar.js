import {NavLink} from "react-router-dom";

const NavItems = [
    {
        id: 'dashBoard',
        text: 'Dash Board',
        path: '/'
    },
    {
        id: 'history',
        text: 'History',
        path: '/histories'
    },
    {
        id: 'user',
        text: 'Users',
        path: '/users'
    },
    {
        id: 'category',
        text: 'Categories',
        path: '/categories'
    },
    {
        id: 'subCategory',
        text: 'Sub Categories',
        path: '/sub-categories'
    },
    {
        id: 'account',
        text: 'Accounts',
        path: '/accounts'
    },
    {
        id: 'card',
        text: 'Cards',
        path: '/cards'
    }
]


function NavList(props) {
    return (
        <ul>
            {
                props.itemList.map(item => {
                    return (
                        <li key={item.id}>
                            <NavLink to={item.path}> { item.text } </NavLink>
                        </li>
                    )
                })
            }
        </ul>
    )
}


function NavBar() {
    return (
        <div style={{width: '100%'}}>
            <NavList itemList={NavItems} />
        </div>
    )
}

export default NavBar