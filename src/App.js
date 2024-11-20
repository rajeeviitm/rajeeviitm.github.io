import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';

function App() {
  const [tickets, setTickets] = useState([]);
  const [userData, setUserData] = useState({});
  const [grouping, setGrouping] = useState(() => {
    // Retrieve grouping from localStorage or default to 'status'
    return localStorage.getItem('grouping') || 'status';
  });
  const [ordering, setOrdering] = useState(() => {
    // Retrieve ordering from localStorage or default to 'priority'
    return localStorage.getItem('ordering') || 'priority';
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((res) => res.json())
      .then((data) => {
        setTickets(data.tickets);
        setUserData(
          data.users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {})
        );
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Save grouping and ordering to localStorage whenever they change
    localStorage.setItem('grouping', grouping);
    localStorage.setItem('ordering', ordering);
  }, [grouping, ordering]);

  return (
    <div className="App">
      <Dashboard
        tickets={tickets}
        userData={userData}
        grouping={grouping}
        setGrouping={setGrouping}
        ordering={ordering}
        setOrdering={setOrdering}
        loading={loading}
      />
    </div>
  );
}

export default App;
