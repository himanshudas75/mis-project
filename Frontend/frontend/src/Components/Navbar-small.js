// Navbar.js
import { useState } from 'react';
import React from 'react';
import '../Styles/navbar.css';

const NavbarSmall = ({current}) => {
    const [activePage, setActivePage] = useState(current);
    const handlePageChange = (page) => {
        setActivePage(page);
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
                        <a href="/">Logout</a>
                    </li>
                </ul>
            </nav>
            <hr id='hr'></hr>
            <div className='buttons'>
                <div>
                    <button
                        type='button'
                        className={activePage >= 1 ? 'active' : ''}
                        onClick={() => handlePageChange(1)}
                    >
                        <a href='/details/page1'>o</a>
                    </button>
                </div>
                <div>
                    <button
                        type='button'
                        className={activePage >= 2 ? 'active' : ''}
                        onClick={() => handlePageChange(2)}
                    >
                        <a href='/details/page2'>o</a>
                    </button>
                </div>
                <div>
                    <button
                        type='button'
                        className={activePage >= 3 ? 'active' : ''}
                        onClick={() => handlePageChange(3)}
                    >
                        <a href='/details/page3'>o</a>
                    </button>
                </div>
                <div>
                    <button
                        type='button'
                        className={activePage >= 4 ? 'active' : ''}
                        onClick={() => handlePageChange(4)}
                    >
                        <a href='/details/page4'>o</a>
                    </button>
                </div>
                <div>
                    <button
                        type='button'
                        className={activePage >= 5 ? 'active' : ''}
                        onClick={() => handlePageChange(5)}
                    >
                        <a href='/details/page5'>o</a>
                    </button>
                </div>
                <div>
                    <button
                        type='button'
                        className={activePage >= 6 ? 'active' : ''}
                        onClick={() => handlePageChange(6)}
                    >
                        <a href='/details/page6'>o</a>
                    </button>
                </div>
            </div>
        </div>

    );
};

export default NavbarSmall;
