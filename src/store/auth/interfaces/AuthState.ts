import { UserInterface } from "../../../interfaces/UserInterface"

export interface AuthState {
  status : "checking" | "authenticated" | "not-authenticated"
  user : null | UserInterface
  errorMessage : string | null
  successMessage : string | null
}