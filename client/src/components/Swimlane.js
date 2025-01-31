import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import TicketCard from './TicketCard';
const Swimlane = ({ title, tickets, deleteTicket }) => {
    const getStatusClass = (status) => {
        switch (status) {
            case 'Todo':
                return 'swim-lane todo';
            case 'In Progress':
                return 'swim-lane inprogress';
            case 'Done':
                return 'swim-lane done';
            default:
                return 'swim-lane';
        }
    };
    return (_jsxs("div", { className: `swimlane ${getStatusClass(title)}`, children: [_jsx("h2", { children: title }), tickets.map(ticket => (_jsx(TicketCard, { ticket: ticket, deleteTicket: deleteTicket }, ticket.id)))] }));
};
export default Swimlane;
