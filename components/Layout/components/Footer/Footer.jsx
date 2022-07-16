import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Layout() {
    return (
        <section className="mainfooter">
            <footer className="footer-distributed">
                <div className="footer-left">
                    <div className="contactlistinfo">
                        <Image
                            src="/assets/images/logo1.png"
                            className="img-fluid"
                            width={130}
                            height={60}
                            alt=""
                        />
                    </div>

                    <p className="footer-links">
                        <Link href={"/privacy-policy"} passHref>
                            <a>Privacy Policy</a>
                        </Link>
                        <Link href={"/terms-of-use"} passHref>
                            <a>Terms of Use</a>
                        </Link>
                        <Link href={"/faqs"} passHref>
                            <a href="#">FAQs</a>
                        </Link>
                        <Link href={"/page-contact"} passHref>
                            <a href="#">Contact Us</a>
                        </Link>
                    </p>
                </div>

                <div className="footer-center">
                    <h3>Address</h3>

                    <div>
                        <i className="fa fa-map-marker"></i>
                        <p>
                            <span>B-191, Block No. 5,</span> Gulshan-e-Iqbal,
                            Karachi
                        </p>
                    </div>

                    <div>
                        <i className="fa fa-phone"></i>
                        <p>
                            <span className="highligh1">0304-1110195</span>
                        </p>
                    </div>

                    <div>
                        <i className="fa fa-envelope"></i>
                        <p>
                            <a href="mailto:support@apricart.pk">
                                support@apricart.pk
                            </a>
                        </p>
                    </div>
                </div>
                <div className="footer-center">
                    <h3>Click & Collect </h3>

                    <div>
                        <i className="fa fa-map-marker"></i>
                        <p>
                            <span>B-191, Block No. 5,</span> Gulshan-e-Iqbal,
                            Karachi
                        </p>
                    </div>

                    <div>
                        <i className="fa fa-phone"></i>
                        <p>
                            <span className="highligh1">0304-1110195</span>
                        </p>
                    </div>

                    <div>
                        <i className="fa fa-envelope"></i>
                        <p>
                            <a href="mailto:support@apricart.pk">
                                support@apricart.pk
                            </a>
                        </p>
                    </div>
                </div>

                <div className="footer-right">
                    <p className="footer-company-about">
                        <span>Cities</span>
                        Karachi
                        <br />
                        Peshawar
                    </p>

                    <div className="footer-icons">
                        <a href="https://www.facebook.com/apricartonlinegrocery/">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://twitter.com/apricartpk?lang=en">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://pk.linkedin.com/company/apricartestores">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                    <div className="copytext">
                        <h3>Install Our App</h3>
                        <ul>
                            <li>
                                <a href="#">
                                    <img
                                        src="/assets/images/playstore-img.png"
                                        // width={80} height={40} margin-right={50}
                                        className="img-fluid"
                                        alt=""
                                    />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img
                                        src="/assets/images/appstore-img.png"
                                        // width={80} height={40}
                                        className="img-fluid king"
                                        alt=""
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* <!-- <p class="footer-company-name">Apricart E-Stores Pvt Ltd    <br>  All rights reserved</p> --> */}
                </div>
            </footer>
        </section>
    );
}
