import { UserData } from './UserData.tsx';

export interface TicketData {
  id: number | null;
  name: string | null;
  description: string | null;
  status: string | null;
  assignedUserId: number | null;
  assignedUser: UserData | null;
}
