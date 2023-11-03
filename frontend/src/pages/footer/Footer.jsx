import React from 'react'
import styles from './Footer.module.css'
import { Link } from 'react-router-dom';
const Footer = () => {
    const email = "190041130tfsir@gmail.com";
  return (
    <>
        <div className={styles.footer} id='contacts'>
            <div>
                <img src="https://www.replymind.com/curve/homePageBottom.png"/>
            </div>
            <div className={styles.footerMain}>
                <div className={styles.mainTop}>                
                    <div className={styles.menuLogo}>
                        <div className={styles.logo}>
                            <img src="https://w7.pngwing.com/pngs/993/679/png-transparent-iphone-4s-ios-7-computer-icons-weather-weather-logo-thumbnail.png" className={styles.footerLogo}/>
                        </div>
                        <div className={styles.menu}>
                            {/* <a href="#home">HOME</a>
                            <a href="#pricing">PRICE</a>
                            <a href="#testimonials">TESTIMONIALS</a>
                            <a href="#pricing">PRICING</a> */}
                            
                        </div>
                    </div>
                    <div className={styles.subscribeBox}>
                        <div className={styles.subscribeSubBox}>
                            <h2>Contact Us</h2>
                            <div>
                                <input type ="text" disabled={true} value={email}></input>
                                <button onClick={() => window.location = 'mailto:support@replymind.com'}>Contact Us</button>
                            </div>
                            <p>For any queries shoot us an email and we will get back to you!</p>
                        </div>
                    </div>
                </div>
                <div className={styles.footerIconBox}>
                    <a href="https://www.facebook.com/profile.php?id=61550195925259">
                        <img src="https://www.replymind.com/footer/1.png" className={styles.footerIcon} 
                           
                        />
                    </a>
                    <div className='flex'
                    
                    >
                        <a href="https://www.linkedin.com/company/replymind/">
                            <img src="https://www.replymind.com/footer/2.png" className={styles.footerIcon} />
                        </a>
                        <a href="https://twitter.com/ReplyMind22129">
                            <img src="https://www.replymind.com/footer/3.png" className={styles.footerIcon} />
                        </a>
                    </div>
                </div>
                <div className={styles.footerPolicyBox}>
                    <a href="/privacy-policy"
                       
                    >Privacy Policy</a>
                    <a href="/terms-conditions"
                        
                    >Terms of Service</a>
                    <a href=""
                    >Cookie Setting</a>

                </div>
            </div>
        </div>
    </>
  )
}

export default Footer