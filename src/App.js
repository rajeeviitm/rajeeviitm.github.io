import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';

function App() {
  const [tickets, setTickets] = useState([]);
  const [userData, setUserData] = useState({});
  const [grouping, setGrouping] = useState('status');
  const [ordering, setOrdering] = useState('priority');
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
