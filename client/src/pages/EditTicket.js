import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { retrieveTicket, updateTicket } from '../api/ticketAPI';
const EditTicket = () => {
    const [ticket, setTicket] = useState();
    const navigate = useNavigate();
    const { state } = useLocation();
    const fetchTicket = async (ticketId) => {
        try {
            const data = await retrieveTicket(ticketId.id);
            setTicket(data);
        }
        catch (err) {
            console.error('Failed to retrieve ticket:', err);
        }
    };
    useEffect(() => {
        fetchTicket(state);
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (ticket && ticket.id !== null) {
            updateTicket(ticket.id, ticket);
            navigate('/');
        }
        else {
            console.error('Ticket data is undefined.');
        }
    };
    const handleTextAreaChange = (e) => {
        const { name, value } = e.target;
        setTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
    };
    return (_jsx(_Fragment, { children: _jsx("div", { className: 'container', children: ticket ? (_jsxs("form", { className: 'form', onSubmit: handleSubmit, children: [_jsx("h1", { children: "Edit Ticket" }), _jsx("label", { htmlFor: 'tName', children: "Ticket Name" }), _jsx("textarea", { id: 'tName', name: 'name', value: ticket.name || '', onChange: handleTextAreaChange }), _jsx("label", { htmlFor: 'tStatus', children: "Ticket Status" }), _jsxs("select", { name: 'status', id: 'tStatus', value: ticket.status || '', onChange: handleChange, children: [_jsx("option", { value: 'Todo', children: "Todo" }), _jsx("option", { value: 'In Progress', children: "In Progress" }), _jsx("option", { value: 'Done', children: "Done" })] }), _jsx("label", { htmlFor: 'tDescription', children: "Ticket Description" }), _jsx("textarea", { id: 'tDescription', name: 'description', value: ticket.description || '', onChange: handleTextAreaChange }), _jsx("button", { type: 'submit', children: "Submit Form" })] })) : (_jsx("div", { children: "Issues fetching ticket" })) }) }));
};
export default EditTicket;
