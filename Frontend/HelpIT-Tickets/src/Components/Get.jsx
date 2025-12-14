// import Delete from './Delete.jsx'
import Edit from './Edit.jsx'
import { useEffect, useState } from "react";
import './Get.css'

export default function ItemFetcher() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isEditHidden, setIsEditHidden] = useState(true)
    const [editId, setEditId] = useState("");

    const editTicket = (id) => {
        if (id == editId || editId == "") {setIsEditHidden(!isEditHidden)}
        setEditId(id);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:3002/api/v1.0.0/tickets");
                const data = await response.json();
                console.log(data.data);
                setItems(data.data);
            } catch (err) {
                setError("Something went wrong!");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="ticket-grid">
            <Edit isHidden={isEditHidden} setIsHidden={setIsEditHidden} itemId={editId}/>
            {items.map((item, i) => (
                <div key={i} className="ticket-item" id={`${item.id}`}>
                    <div className="functionality">
                        <button onClick={() => editTicket(item.id)}>&#128394;</button> {/* Edit */}
                        <button onClick={null} style={{color: "#dc3545"}}>&#10006;</button> {/* Delete */}
                    </div>
                    <h3 className="title">{item.title}</h3>
                    <p className="description">Description: {item.description}</p>
                    <p className="priority">Priority 
                        {(item.priority == 0) ? (<span style={{color: "#f7e379", display: "inline"}}>&nbsp;{item.priority}</span>) :
                         (item.priority == 1) ? (<span style={{color: "#44ce1b", display: "inline"}}>&nbsp;{item.priority}</span>) :
                         (item.priority == 2) ? (<span style={{color: "#bbdb44", display: "inline"}}>&nbsp;{item.priority}</span>) :
                         (item.priority == 3) ? (<span style={{color: "#f2a134", display: "inline"}}>&nbsp;{item.priority}</span>) :
                         (<span style={{color: "#e51f1f", display: "inline"}}>&nbsp;{item.priority}</span>)
                        }
                    </p>
                    <p className="status">Status: {item.ticketStatus}</p>
                    <p className="dateAdded">Ticket created: {item.dateAdded}</p>
                </div>
            ))}
        </div>
    )
}