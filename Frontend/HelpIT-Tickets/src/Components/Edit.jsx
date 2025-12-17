import './Edit.css'
import { useRef, useEffect, useState } from "react"

export default function Edit({isHidden, setIsHidden, itemId, onSuccess}) {
    // console.log(itemId)
    const [item, setItem] = useState([]);
    const [error, setError] = useState(null);
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [ticketStatus, setStatus] = useState("");
    
    const loadTicket = () => {
        console.log("Loading ticket...")
        async function fetchData() {
            try {
                const ticket = `http://localhost:3002/api/v1.0.0/tickets/${itemId}`;
                console.log("Ticket:", ticket)
                const response = await fetch(ticket);
                const data = await response.json();
                console.log(data.data);
                setItem(data.data);
            } catch (err) {
                setError("Something went wrong!");
            }
        }
        fetchData();
    }

    useEffect(() => {
    if (item) {
        setTitle(item.title);
        setDescription(item.description);
        setPriority(item.priority);
        setStatus(item.ticketStatus);
    }
    }, [item]);

    const hasLoadedRef = useRef(false);

    useEffect(() => {
    hasLoadedRef.current = false;
    }, [itemId]);

    useEffect(() => {
    if (!isHidden && !hasLoadedRef.current) {
        hasLoadedRef.current = true;
        loadTicket(itemId);
    }
    }, [isHidden, itemId]);
    
    async function handleSubmit(e) {
        e.preventDefault();
        
        const updatedTicket = {
            title,
            description,
            priority,
            dateAdded: item.dateAdded,
            ticketStatus
        }

        console.log(updatedTicket)

        try {
            const ticket = `http://localhost:3002/api/v1.0.0/tickets/${itemId}`;
            const response = await fetch(ticket, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTicket)
            });

            if (!response.ok) throw new Error();

        } catch (err) {
            setStatus("Something went wrong!");
        }
        
        // location.reload();
        setIsHidden(true)
        onSuccess()
    }

    if (error) return <div>{error}</div>;

    return (<>
        {(!isHidden) ? 
        <div className='edit'>
            <form onSubmit={handleSubmit} className="ticket-item">
                <div>
                    <p>Title</p>
                    <input 
                        type="text"
                        className="titleInput"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <p>Description</p>
                    <input 
                        type="text"
                        className="descriptionInput"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div>
                    <p>Priority</p>
                    <input 
                        type="number"
                        className="priorityInput"
                        placeholder="Priority"
                        min="0"
                        max="4"
                        value={priority}
                        onChange={(e) => setPriority(Number(e.target.value))}
                    />
                </div>

                <div>
                    <p>Status</p>
                    <input 
                        type="text"
                        className="statusInput"
                        placeholder="Status"
                        value={ticketStatus}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                </div>

                <p className="dateAdded">Ticket created: {item.dateAdded}</p>

                <button type="submit" className="submitButton">
                    <p>Confirm</p>
                </button>
            </form>
        </div>
        : null}
    </>)
}