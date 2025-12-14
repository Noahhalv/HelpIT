import './Navbar.css'

export default function Navbar({ postHidden, setPostHidden }) {

    const togglePost = () => {
        setPostHidden(!postHidden)
        // console.log(postHidden)
    }

    return (
        <div id='navbar'>
            <div className='leftItems'>
                {/* <button>left1</button> */}
            </div>
            <div className="rightItems">
                {/* <button>center1</button> */}
            </div>
            <div className="rightItems">
                <button onClick={togglePost}>New ticket</button>
            </div>
        </div>
    )
}