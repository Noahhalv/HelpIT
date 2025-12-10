import { useEffect, useState } from "react";
import './Get.css'

export default function ItemFetcher() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            {items.map((item, i) => (
                <div key={i} className="ticket-item" id={`${item.id}`}>
                    <h3>{item.title}</h3>
                    <p>Description: {item.description}</p>
                    <p>Ticket created {item.dateAdded}</p>
                    <p>Priority {item.priority}</p>
                </div>
            ))}
        </div>
    )
}