import { defaultClient } from "./axiosClient";

interface ReservationData {
  seance_id: number;
  tickets: {
    seat: string;
    ticket_type_id: number;
  }[];
}

export const bookReservations = async (data: ReservationData) =>
  defaultClient.post("/reservations/online", {
    seance_id: data.seance_id,
    tickets: [...data.tickets],
  });
