export const ticketTypes = [
  { id: 1, name: "Adult", price: 20.0 },
  { id: 2, name: "Child", price: 10.0 },
  { id: 3, name: "Senior", price: 15.0 },
  { id: 4, name: "Student", price: 12.0 },
];

export function getTicketRowSeat(ticket: string) {
  const row = ticket[0];
  const seat = ticket.split(row)[1];
  return { row, seat };
}
