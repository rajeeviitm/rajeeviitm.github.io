import React from 'react';
import './card.css';
import threeDotMenuIcon from '../../assets/3 dot menu.svg'; 


export const Card = ({ ticket, user }) => {
  const getUserInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    const firstInitial = parts[0]?.[0]?.toUpperCase() || '';
    const secondInitial = parts[1]?.[0]?.toUpperCase() || '';
    return `${firstInitial}${secondInitial}`;
  };

  return (
    <div className="card">
      <strong>{ticket.id}</strong>
      <h3 className="card-title">{ticket.title}</h3>
      <div className="card-footer">
      <div className="three-dots-icon-container">
        <img src={threeDotMenuIcon} alt="Menu" className="three-dots-icon" />
      </div>
        <p className="card-tag">{ticket.tag.join(', ')}</p>
        
        {user && (
          <div className="user-avatar">
            <span>{getUserInitials(user.name)}</span>
          </div>
        )}
      </div>
    </div>
  );
};
