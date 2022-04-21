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

interface UserCreds {
  firstName: string;
  lastName: string;
  birthday: string;
  email: string;
}

export const showCurrentUser = async () => defaultClient.get("/user");

//WIP need to update the api
export const updateCurrentUser = async ({
  firstName,
  lastName,
  birthday,
  email,
}: UserCreds) =>
  defaultClient.post("/user", {
    first_name: firstName,
    last_name: lastName,
    date_of_birth: birthday,
    email: email,
  });
