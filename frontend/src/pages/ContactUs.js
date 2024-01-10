import React from "react";


import Promo from "../components/Promo/Promo";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer/Footer'


import { AiFillPhone } from "react-icons/ai";
// import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { AiFillClockCircle } from "react-icons/ai";


const ContactUs = () => {   
    
    const [inputs, setInputs] = React.useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(inputs);

        //TODO: send data to backend
    }

    const handleChange = (event) => {

        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
        console.log("### inputs ###");
    }

    return (
        <div >
            <Promo />
            <Navbar />
            <div className="contact-container">
                <div className="contact-title-container">
                    <div className="contact-title">
                        Get in Touch with Us
                    </div>
                    <div className="contact-text">
                        For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. <br></br> Our Staff Always Be There To Help You Out. Do Not Hesitate!
                    </div>
                </div>

                <div className="contact-wrapper">
                    <div className="contact-info-container">
                        <div className="contact-info">
                            <div className="contact-info-icon">
                                <AiFillEnvironment />
                            </div>
                            <div>
                                <div className="contact-info-title">
                                    Address
                                </div>
                                <div className="contact-info-text">
                                    1234 Main Street, Anytown, <br />
                                    Montreal, Canada
                                </div>
                            </div>
                        </div>
                        
                        <div className="contact-info">
                            <div className="contact-info-icon">
                                <AiFillPhone />
                            </div>
                            <div>
                                <div className="contact-info-title">
                                    Phone
                                </div>
                                <div className="contact-info-text">
                                    Mobile: +1 514-123-6789 <br></br>
                                    Hotline: +1 514-123-4567
                                </div>
                            </div>
                        </div>

                        <div className="contact-info">
                            <div className="contact-info-icon">
                                <AiFillClockCircle />
                            </div>
                            <div className="contact-info-title">
                                Working Time
                            </div>
                            <div className="contact-info-text">
                                Mon - Fri: 8:00 - 18:00 <br></br>
                                Sat - Sun: 9:00 - 16:00
                            </div>
                        </div>
                    </div>
                    
                    <div className="contact-form-container">

                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="contact-input-title">
                                Your name
                            </div>
                            <div className="contact-form-input-wrapper">
                                <input className="contact-form-input"
                                    type="text"
                                    placeholder="Abc"
                                    name="name"
                                    value={inputs.name|| ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="contact-input-title">
                                Email address
                            </div>
                            <div className="contact-form-input-wrapper">
                                <input className="contact-form-input"
                                type="text" 
                                placeholder="Abc@email.com" 
                                name="email"
                                value={inputs.email|| ""}
                                onChange={handleChange}
                                />
                            </div>

                            <div className="contact-input-title">
                                Subject
                            </div>
                            <div className="contact-form-input-wrapper">
                                <input className="contact-form-input"
                                type="text" 
                                placeholder="This is an optional" 
                                name="subject"
                                value={inputs.subject|| ""}
                                onChange={handleChange}
                                />
                            </div>

                            <div className="contact-input-title">
                                Message
                            </div>
                            <div className="contact-form-input-wrapper">
                                <textarea className="contact-form-input"
                                type="text" 
                                placeholder="Hi! Id like to ask about..." 
                                rows={5}
                                name="message"
                                value={inputs.message|| ""}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="contact-form-input-wrapper">
                                <button className="contact-form-button"
                                type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>



            <Footer />
        </div>
    )
};

export default ContactUs;
