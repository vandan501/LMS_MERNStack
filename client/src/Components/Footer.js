import React from "react";
import {BsFacebook, BsInstagram, BsLinkedin, BsTwitter} from 'react-icons/bs';

function Footer()
{
    const currentYear = new Date().getFullYear();

    return(
        <>
        <footer className="md:absolute md:bottom-0 md:left-0 w-full h-[10vh] py-28 md:py-5 flex flex-col md:flex-row items-center justify-between text-white bg-slate-900 gap-5 sm:px-20">
        <section className="text-lg hover:cursor-pointer hover:text-yellow-300">
            Copyright  { currentYear } | All rights reserved
        </section>
        <section className="flex items-center justify-center gap-5 text-2xl text-white">
            <a href="#" className="hover:text-yellow-500 transition-all ease-in-out duration-300  cursor-pointer">
                <BsFacebook />
            </a>
            <a  href="#" className="hover:text-yellow-500 transition-all ease-in-out duration-300 cursor-pointer">
                <BsInstagram />
            </a>
            <a href="#" className="hover:text-yellow-500 transition-all ease-in-out duration-300 cursor-pointer">
                <BsLinkedin />
            </a>
            <a href="#" className="hover:text-yellow-500 transition-all ease-in-out duration-300 cursor-pointer">
                <BsTwitter />
            </a>
        </section>
    </footer>
       </>
    );
}

export default Footer;