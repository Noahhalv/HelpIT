import { getAllObjects, addObject, getObjectById, deleteObjectById, updateObjectById } from '../data/databaseGeneric.js';
import { respond } from '../utils/httpStatusResponder.js';

const getAllTickets = async (req, res) => {
    try {
        const Tickets = await getAllObjects();
        // res.status(200).json({success: true, data: Tickets});
        respond(res, { data: Tickets });
    } catch (error) {
        // res.status(500).json({success: false, message: 'Error'});
        respond(res, { error: error.message });
    }
}

const getSingleTicket = async (req, res) => {
    try {
        const Ticket = await getObjectById(req.params.id);

        respond(res, { data: Ticket, notFound: !Ticket });
    } catch (error) {
        respond(res, { error: error.message });
    }
}

const createTicket = async (req, res) => {
    try {
        const { title, description, dateAdded, priority, ticketStatus } = req.body;
        const newTicket = await addObject({ title, description, dateAdded, priority, ticketStatus });

        respond(res, { created: true, data: newTicket });
    } catch (error) {
        respond(res, { error: error.message });
    }
}

const updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, dateAdded, priority, ticketStatus } = req.body;

        const updatedObject = await updateObjectById(id, { title, description, dateAdded, priority, ticketStatus });

        respond(res, { data: updatedObject });
    } catch (error) {
        respond(res, { error: error.message });
    }
}

const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteObjectById(id);
    
        respond(res, { data: { message: `Ticket ${id} deleted successfully` } });
    } catch (error) {
        respond(res, { error: error.message });
    }
}

export {
    getAllTickets,
    getSingleTicket,
    createTicket,
    updateTicket,
    deleteTicket
}