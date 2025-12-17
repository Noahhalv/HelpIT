import { useState } from "react";
import './Post.css'

export default function CreateItem({ hidden, setPostHidden, onSuccess }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus("Sending...");

        const newTicket = {
            title,
            description,
            priority: Number(priority),
            dateAdded: new Date().toLocaleString(),
            ticketStatus: 'To do'
        };


        try {
            const response = await fetch("http://localhost:3002/api/v1.0.0/tickets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTicket)
            });

            if (!response.ok) throw new Error();

            setStatus("All done!");
            setTitle("");
            setDescription("");
            setPriority("");

            setPostHidden(!hidden);
            onSuccess()
        } catch (err) {
            setStatus("Something went wrong!");
        }
    }



     return (
        <>
            {!hidden ? <form onSubmit={handleSubmit} className="formInput">
                    <input 
                        type="text"
                        className="titleInput"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <input 
                        type="text"
                        className="descriptionInput"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <input 
                        type="number"
                        className="priorityInput"
                        placeholder="Priority"
                        min="0"
                        max="4"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    />

                    <button type="submit" className="submitButton">
                        {status && <div>{status}</div> || <p>Post Ticket</p>}
                    </button>
                </form> : null
            }
        </>
    )
}