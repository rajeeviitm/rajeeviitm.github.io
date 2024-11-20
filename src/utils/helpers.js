export function groupTickets(tickets, grouping) {
  const grouped = {};

  tickets.forEach((ticket) => {
    let key;
    if (grouping === 'status') {
      key = ticket.status; 
    } else if (grouping === 'priority') {
      key =
        ticket.priority === 0
          ? 'no priority'
          : ticket.priority === 1
          ? 'low'
          : ticket.priority === 2
          ? 'medium'
          : ticket.priority === 3
          ? 'high'
          : 'urgent';
    } else {
      key = ticket[grouping]; 
    }

    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(ticket);
  });

  console.log('Grouping By:', grouping);
  console.log('Grouped Data:', grouped);

  return grouped;
}

export function sortTickets(tickets, ordering) {
  if (ordering === 'priority') {
    return [...tickets].sort((a, b) => b.priority - a.priority);
  }

  if (ordering === 'title') {
    return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
  }

  return tickets; 
}
