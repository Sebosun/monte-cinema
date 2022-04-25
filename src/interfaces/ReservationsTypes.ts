export interface ReservationModel {
  id: number;
  user_id: number;
  user_email: string;
  movie_title: string;
  seance_id: number;
  seance_datetime: string;
  status: Status;
  tickets: Ticket[];
}

export interface Status {
  id: number;
  name: string;
}

export interface Ticket {
  id: number;
  price: string;
  type: string;
  seat: string;
}
