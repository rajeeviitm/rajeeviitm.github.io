import React, { useState } from 'react';
import './dashboard.css';
import { groupTickets, sortTickets } from '../../utils/helpers';
import { Card } from '../Card';
import { Loader } from '../Loader';

// Icons for grouping and ordering
import backlogIcon from '../../assets/Backlog.svg';
import todoIcon from '../../assets/To-do.svg';
import inProgressIcon from '../../assets/in-progress.svg';
import doneIcon from '../../assets/Done.svg';
import canceledIcon from '../../assets/Cancelled.svg';
import noPriorityIcon from '../../assets/No-priority.svg';
import lowPriorityIcon from '../../assets/Img - Low Priority.svg';
import mediumPriorityIcon from '../../assets/Img - Medium Priority.svg';
import highPriorityIcon from '../../assets/Img - High Priority.svg';
import urgentPriorityIcon from '../../assets/SVG - Urgent Priority grey.svg';
import displayIcon from '../../assets/Display.svg';
import addIcon from '../../assets/add.svg';
import threeDotMenuIcon from '../../assets/3 dot menu.svg';

const priorityOrder = [
  { title: 'no priority', display: 'No Priority', icon: noPriorityIcon },
  { title: 'urgent', display: 'Urgent', icon: urgentPriorityIcon },
  { title: 'high', display: 'High', icon: highPriorityIcon },
  { title: 'medium', display: 'Medium', icon: mediumPriorityIcon },
  { title: 'low', display: 'Low', icon: lowPriorityIcon },

  
];

const statusOrder = [
  { title: 'Backlog', icon: backlogIcon },
  { title: 'Todo', icon: todoIcon },
  { title: 'In progress', icon: inProgressIcon },
  { title: 'Done', icon: doneIcon },
  { title: 'Canceled', icon: canceledIcon },
];

export const Dashboard = ({
  tickets,
  userData,
  grouping,
  setGrouping,
  ordering,
  setOrdering,
  loading,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const groupedData = groupTickets(sortTickets(tickets, ordering), grouping);

  const keys =
    grouping === 'status'
      ? statusOrder
      : grouping === 'priority'
      ? priorityOrder
      : Object.keys(groupedData);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <button className="dropdown-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <img src={displayIcon} alt="Display" className="dropdown-icon" />
          <span>Display</span>
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-section">
              <label>Grouping</label>
              <select
                value={grouping}
                onChange={(e) => setGrouping(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="userId">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-section">
              <label>Ordering</label>
              <select
                value={ordering}
                onChange={(e) => setOrdering(e.target.value)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard-grid">
          {keys.map((key) => {
            const title =
              grouping === 'userId' && userData[key]
                ? userData[key].name
                : key.title || key.display || key;
            const icon = key.icon;

            return (
              <div key={title} className="dashboard-column">
                <div className="column-header">
                  {icon && <img src={icon} alt={`${title} Icon`} />}
                  <h3>{title}</h3>
                  <div className="column-actions">
                    <img src={addIcon} alt="Add" className="add-icon" />
                    <img src={threeDotMenuIcon} alt="Menu" className="menu-icon" />
                  </div>
                </div>
                <div className="tickets">
                  {groupedData[key.title || key]?.length > 0 ? (
                    groupedData[key.title || key].map((ticket) => (
                      <Card key={ticket.id} ticket={ticket} user={userData[ticket.userId]} />
                    ))
                  ) : (
                    <p className="empty-column">No tickets available</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
