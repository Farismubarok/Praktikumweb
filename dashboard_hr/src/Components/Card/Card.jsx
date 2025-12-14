import React from 'react';
import './Card.css';

// Bagian: Import Ikon
// Bagian: Catatan Ikon

import { 
  IoPersonAddSharp, 
  IoPeopleSharp, 
  IoTimeSharp, 
  IoCalendarNumberSharp 
} from "react-icons/io5";

// Bagian: Placeholder Ikon
// Bagian: Placeholder Ikon
// Bagian: Icon Props

const Users = (props) => <IoPeopleSharp {...props} />;
const UserPlus = (props) => <IoPersonAddSharp {...props} />;

// Bagian: Catatan Ikon Spesifik

const CalendarOff = (props) => <IoCalendarNumberSharp {...props} />; 
const Clock = (props) => <IoTimeSharp {...props} />;

// Bagian: Komponen StatCard
const StatCard = ({ title, value, icon: Icon, variant }) => {
  // Bagian: CSS Varian
  const variantClass = `stat-card stat-card_gaji--${variant}`;

  return (
    <div className={variantClass}>
      <div className="stat-card__content">
        <p className="stat-card__title">{title}</p>
        <h2 className="stat-card__value">{value}</h2>
      </div>
      <div className="stat-card__icon-wrapper">
        {/* Bagian: Render Ikon */}
        {Icon && <Icon className="stat-card__icon" size={24} />}
      </div>
    </div>
  );
};

export default StatCard;

// Bagian: Export Ikon
export { Users, UserPlus, CalendarOff, Clock };