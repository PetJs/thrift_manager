import { UserRole } from "@/types";

export interface SidebarItem {
  icon: string;
  label: string;
  path: string;
  onClick?: () => void;
}

export interface SidebarProps {
  className: string;
  items: SidebarItem[];
  onLogout: () => void;
}

export interface NavBarProps {
  img: string;
}

export interface CardProps {
  icon: React.ReactNode;
  header?: string;
  amount?: string;
  description?: string;
  tag?: string;
  current?: string;
  next?: string;
  className?: string;
  actionText?: string;
  onActionClick?: () => void; // Optional action button click handler
  disabled?: boolean;
}

export interface PaymentNotifCardProps {
  recipient: string;
  date: string;
  amount?: number;
}

export interface TableColumn {
  header: string;
  accessor: string;
  render?: (value: any, row?: any) => React.ReactNode;
}

export interface TableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
}

export type Status = "Paid" | "Pending" | "Upcoming";

export interface SettingNavItem {
  label: string;
  path: string;
}

export interface SettingNavProps {
  items: SettingNavItem[];
}

export type User = {
  id: number;
  last_login: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  date_created: Date;
  contribution_amount: number;
  role?: UserRole;
};

export type AuthCredentials = {
  email: string;
  password: string;
};

export type AuthUser = {
  user: User;
  token: string;
};

export type ApiResponse<T> = {
  status_code: number;
  message: string;
  data: T;
};

export type DashboardData = {
  amount_contributed: string;
  total_contributed: string;
  group: Group;
  countdown: string;
  member_contribution_status: string;
  upcoming_payouts: {
    position: number;
    name: string;
    amount: number;
    date: Date;
  }[];
  my_rotation: string;
  is_my_turn: boolean;
  contribution: Contribution;
  wallet: Wallet;
};

export type Wallet = {
  id: number;
  amount: number;
  user: number;
};

export type Contribution = {
  id: number;
  amount: number;
  position: number;
  status: string;
  payout_status: string;
  start_date: Date;
  end_date: Date;
  group: number;
  payout_to: number;
};

export type Group = {
  id: number;
  name: string;
  contribution_amount: string;
  description: string;
  date_created: Date;
  status: string;
  created_by: number;
};

export type GroupMember = {
  id: number;
  position: number;
  date_joined: Date;
  is_admin: boolean;
  is_owner: boolean;
  is_manager: boolean;
  status: string;
  user: number;
  group: number;
};

export type AdminDashboard = {
  current_members: number;
  new_members: number;
  current_groups: number;
  active_groups: number;
  total_contribution: number;
  total_payouts: number;
  members_contributed: number;
  members_contribution_pending: number;
};

export type PayoutSchedule = {
  next_recipient: string;
  amount: number;
  date: string;
};
