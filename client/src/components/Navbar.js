import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
const Navbar = () => {
    const [loginCheck, setLoginCheck] = useState(false);
    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };
    useEffect(() => {
        console.log(loginCheck);
        checkLogin();
    }, [loginCheck]);
    return (_jsxs("div", { className: 'nav', children: [_jsx("div", { className: 'nav-title', children: _jsx(Link, { to: '/', children: "Krazy Kanban Board" }) }), _jsx("ul", { children: !loginCheck ? (_jsx("li", { className: 'nav-item', children: _jsx("button", { type: 'button', children: _jsx(Link, { to: '/login', children: "Login" }) }) })) : (_jsx("li", { className: 'nav-item', children: _jsx("button", { type: 'button', onClick: () => {
                            auth.logout();
                        }, children: "Logout" }) })) })] }));
};
export default Navbar;
