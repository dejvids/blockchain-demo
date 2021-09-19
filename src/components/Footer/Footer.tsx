import React from "react";
import './Footer.css'

const Footer: React.FC = () => {
    return (
        <div className="footer">
            <p>{new Date().toLocaleDateString()}</p>
        </div>
    )
}

export default Footer;