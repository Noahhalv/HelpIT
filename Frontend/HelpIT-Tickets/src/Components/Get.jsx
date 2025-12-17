import Delete from './Delete.jsx'
import Edit from './Edit.jsx'
import { useState } from "react";
import './Get.css'

export default function ItemFetcher({items, loading, error, refetch}) {
    const [isEditHidden, setIsEditHidden] = useState(true)
    const [editId, setEditId] = useState("");

    const [isDeleteHidden, setIsDeleteHidden] = useState(true)
    const [deleteId, setDeleteId] = useState("");

    const sortedItems = items.sort((a,b) => b.priority - a.priority || a.id - b.id)

    const editTicket = (id) => {
        setEditId(id);
        if (id == editId || editId == "") setIsEditHidden(!isEditHidden)
        else setIsEditHidden(false)
    }

    const deleteTicket = (id) => {
        setDeleteId(id);
        if (id == deleteId || deleteId == "") setIsDeleteHidden(!isDeleteHidden)
        else setIsDeleteHidden(false)
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="ticket-grid">
            <Edit isHidden={isEditHidden} setIsHidden={setIsEditHidden} itemId={editId} onSuccess={refetch}/>
            <Delete id={deleteId} isHidden={isDeleteHidden} setIsHidden={setIsDeleteHidden} onSuccess={refetch}/>
            {sortedItems.map((item) => (
                <div key={item.id} className="ticket-item" id={`${item.id}`}>
                    <div className="functionality">
                        <button onClick={() => editTicket(item.id)}>&#128394;</button> {/* Edit */}
                        <button onClick={() => deleteTicket(item.id)} style={{color: "#dc3545"}}>&#10006;</button> {/* Delete */}
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