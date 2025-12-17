import './Delete.css'

export default function Delete({id, isHidden, setIsHidden, onSuccess}) {

    async function handleDelete(e) {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3002/api/v1.0.0/tickets/${id}`, {
                method: 'DELETE',
            });
            console.log("Deleted:", response)
        } catch (err) {
            console.error("Error deleting ticket:", err);
        }

        setIsHidden(true)
        onSuccess()
    }

    return (<>
        {isHidden ? null : (
            <div className="delete">
                <p>Are you sure you want to delete this ticket?</p>
                <div>
                    <button className="cancel-button" onClick={() => setIsHidden(true)}>Cancel</button>
                    <button className="delete-button" onClick={handleDelete}>Confirm</button>
                </div>
            </div>
        )}
    </>)
}