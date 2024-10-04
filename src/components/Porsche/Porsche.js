import { div } from "framer-motion/client";
import React from "react";
import anhp1 from "../../assets/images/Porsce_images/anhp1.webp"
import anhp2 from "../../assets/images/Porsce_images/anhp2.jpg"
import anhp3 from "../../assets/images/Porsce_images/anhp3.jpg"
import anhp6 from "../../assets/images/Porsce_images/anhp6.webp"
import anhp5 from "../../assets/images/Porsce_images/anhp5.jpg"
import "../../assets/styles/Porsche.css";
const Porsche_main = () => {
    return (
    <div className="Porsche_main_container">
             <div className="main_title">Service & Porscher Genuine Parts </div>
            
            <div className="naiyou1">
                <div className= "img">
                <img src={anhp1} alt="anhp1"/>
                </div>
                <div className="vanban1">
                    <div className="title_1">
                        All for one: your Porscher
                    </div>
                   <div className="text_long">
                    Wherther classic or modern, series vehicle or GT <br /> 
                    model. We'll do our utmost for your Porsche - for <br /> 
                    its maintenance, upkeep and repair. And, thanks to <br /> 
                    Porsche Genuine Parts, you can be sure that your <br /> 
                    original will stay just that.</div> 
                    <div className="read_more_1">READ MORE</div>
                </div>   
                </div>
                
                <div className="Genuine_Part">Genuine Part</div>
                <div className="img_2">
                <div className="anhp2"><img src={anhp2} alt="anhp2"/></div>
                <div className="anhp3"><img src={anhp3} alt="anhp3"/></div>
                <div className="anhp6"><img src={anhp6} alt="anhp6"/></div>
                </div>   
                <div className="kokunaiyou">
                    <div className="one">Product Highlight</div>
                    <div className="two">ORIGINAL</div>
                    <div className="three">Genuine Part Catalogue</div>
                </div>
            <div className="naiyou2">
            <div className= "img_3">
                <img src={anhp5} alt="anhp5"/>
            </div>
            <div className="vanban_2">
                <div className="title_2">We have high standards. As do you.</div>
                <div className="long_text_2">
                You want something special. That's why you drive a <br/>
                Porsche. And why you deserve an equally special <br/>
                service. Precise, professtional and dynamic. <br/> <br/>
                And above all: tailored to your exact requirements. <br/>
                Typically Porsche.</div>
                <div className="read_more_2">READ MORE</div>
            </div>
            
            </div> 
            <div className="Contact">
                <div className="title_end">We're Here to Help</div>
                <div className="text_long_3">If you have question or need assistance, a <br/>
                 customer service representative will be happy to <br/>
                  chat.</div>
                  <div className="contact_us">CONTACT US</div>
            </div> 
    </div>

)
}
export default Porsche_main;