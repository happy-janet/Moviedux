import React from 'react'; //this enables us to acess all react functionalities that we may need
import '../styles.css';

export default function Footer(){
   
   const currentYear = new Date().getFullYear(); //calculating the current year

    return(
    <footer className='footer'>
        <p className='footer-text'>
        © {currentYear} Aballo Janet $ Scovia Katusabe, All rights reserved
        </p>
    </footer>
    );
}