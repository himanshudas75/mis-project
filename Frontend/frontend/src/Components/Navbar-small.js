import React from 'react';
import '../Styles/navbar.css';

const NavbarSmall = ({ current }) => {
    const handleLogout = () => {
        localStorage.clear();
        fetch("http://127.0.0.1:5000/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Ensure 'Content-Type' header is set
            },
            body: JSON.stringify({
                // username: formData.username,
                // password: formData.password,
            }),
        })
            .then((response) => {
                // Handle response
                if (response.status === 200) {
                    window.location.href = "/";
                    console.log(200);
                }
            })
            .catch((error) => {
                // Handle error
                console.log(error);
            });
    };
    return (
        <div>
            <nav className="navbar-small">
                <div>
                    <img src='../logo512.png' alt='logo' style={{ width: '3rem' }}></img>
                </div>
                <ul className="nav-links">
                    <li id='home'>
                        <a href="/home">Home</a>
                    </li>
                    <li>
                        <a href="/" onClick={handleLogout}>Logout</a>
                    </li>
                </ul>
            </nav>
            <hr id='hr'></hr>
            <div className='buttons'>
                {[0, 1, 2, 3, 4, 5].map((pageNumber) => (
                    <div key={pageNumber}>
                        <button
                            type='button'
                            className={current >= pageNumber ? 'active' : ''}
                            onClick={() => console.log(`Go to page ${pageNumber}`)}
                        >
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NavbarSmall;
