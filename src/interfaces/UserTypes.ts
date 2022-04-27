export interface UserInformationModel {
  date_of_birth: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  role: "user" | "employee" | "admin";
}
