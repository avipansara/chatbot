import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <nav>
                <div className="nav-wrapper">
                <Link to={'/'} className="brand-logo">Justin</Link>
                <ul id="nav-mobile" className="right hide-on-med-ad-down">
                    <li><Link to={'./Bot'}>I am Bot!</Link></li>
                </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header;