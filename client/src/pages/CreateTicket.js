import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../api/ticketAPI';
import { retrieveUsers } from '../api/userAPI';
const CreateTicket = () => {
    const [newTicket, setNewTicket] = useState({
        id: 0,
        name: '',
        description: '',
        status: 'Todo',
        assignedUserId: 1,
        assignedUser: null
    });
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const getAllUsers = async () => {
        try {
            const data = await retrieveUsers();
            setUsers(data);
        }
        catch (err) {
            console.error('Failed to retrieve user info', err);
        }
    };
    useEffect(() => {
        getAllUsers();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newTicket) {
            const data = await createTicket(newTicket);
            console.log(data);
            navigate('/');
        }
    };
    const handleTextAreaChange = (e) => {
        const { name, value } = e.target;
        setNewTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
    };
    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setNewTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
    };
    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setNewTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
    };
    return (_jsx(_Fragment, { children: _jsx("div", { className: 'container', children: _jsxs("form", { className: 'form', onSubmit: handleSubmit, children: [_jsx("h1", { children: "Create Ticket" }), _jsx("label", { htmlFor: 'tName', children: "Ticket Name" }), _jsx("textarea", { id: 'tName', name: 'name', value: newTicket?.name || '', onChange: handleTextAreaChange }), _jsx("label", { htmlFor: 'tStatus', children: "Ticket Status" }), _jsxs("select", { name: 'status', id: 'tStatus', value: newTicket?.status || '', onChange: handleTextChange, children: [_jsx("option", { value: 'Todo', children: "Todo" }), _jsx("option", { value: 'In Progress', children: "In Progress" }), _jsx("option", { value: 'Done', children: "Done" })] }), _jsx("label", { htmlFor: 'tDescription', children: "Ticket Description" }), _jsx("textarea", { id: 'tDescription', name: 'description', value: newTicket?.description || '', onChange: handleTextAreaChange }), _jsx("label", { htmlFor: 'tUserId', children: "User's ID" }), _jsx("select", { name: 'assignedUserId', value: newTicket?.assignedUserId || '', onChange: handleUserChange, children: users ? users.map((user) => {
                            return (_jsx("option", { value: String(user.id), children: user.username }, user.id));
                        }) : (_jsx("textarea", { id: 'tUserId', name: 'assignedUserId', value: newTicket?.assignedUserId || 0, onChange: handleTextAreaChange })) }), _jsx("button", { type: 'submit', onSubmit: handleSubmit, children: "Submit Form" })] }) }) }));
};
export default CreateTicket;
