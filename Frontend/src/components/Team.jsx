import React from 'react'
import { motion } from 'framer-motion';
import NM from '../assets/Nitya.jpg';
import NS from '../assets/Naman.jpg';
import MP from '../assets/Mayank.jpg';
import MR from '../assets/Maria.jpg';

function Team() {
    return (
        <div className="flex justify-center my-8 items-center">

            <motion.section
                className="py-16 px-4 bg-gray-900 bg-opacity-50 container border-2 border-gray-500 gap-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 25 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl font-semibold text-center text-gray-200">Meet the ShipWise Team</h2>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <TeamMember IMG={MP} name="Mayank Piparde" role="Frontend Developer" />
                    <TeamMember IMG={NS} name="Naman Shah" role="Backend Specialist" />
                    <TeamMember IMG={NM} name="Nitya Maheshwari" role="Data Analyst" />
                    <TeamMember IMG={MR} name="Maria Rangwala" role="UX/UI Designer" />
                </div>
            </motion.section>
        </div>
    )
}

export default Team

const TeamMember = ({ name, role, IMG }) => (
    <div className="text-center mt-3 group">
        <img
            src={IMG}
            alt={name}
            className="w-48 h-48 mx-auto border border-gray-400 bg-gray-900 saturate-0 transition-transform duration-200 ease-linear group-hover:saturate-100 group-hover:scale-105 relative z-10"
        />
        <h3 className="mt-4 text-2xl font-bold text-gray-200">{name}</h3>
        <p className="text-gray-200">{role}</p>
    </div>
);
