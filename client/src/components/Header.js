import React from 'react';
//import {Link} from 'react-router-dom';
import './header.css';

const Header = () => {
    return (
        <header className="header">
	<div className="brand-box">
		<span className="brand">Meet Khush</span>
	</div>
	
	<div className="text-box">
		<h1 className="heading-primary">
			<span className="heading-primary-main">Smart bot</span>
			<span className="heading-primary-sub">Ask Anything</span>
		</h1>
	</div>
</header>
    )
}

export default Header;