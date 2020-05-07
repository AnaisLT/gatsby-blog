import React from "react"
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const Footer= () => (
    <div className="site-footer">
        <h4 className="text-center">
            Urban Rewilding
        </h4>
        <p className="text-center">Follow us on social media</p>
        <div className="footer-social-links">
            <ul className="social-links-list">
                <li>
                    <a
                        href="https://www.facebook.com"
                        className="facebook"
                    >
                        <i className="fab fa-facebook-f fa-2x"><FaFacebookF /></i>
                    </a>
                    <a
                        href="https://www.instagram.com"
                        className="instagram"
                    >
                        <i className="fab fa-instagram fa-2x"><FaInstagram /></i>
                    </a>
                </li>
            </ul>
        </div>
    </div>
)

export default Footer