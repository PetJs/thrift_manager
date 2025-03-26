export interface SidebarItem {
    icon: string; 
    label: string; 
    path: string;
    onClick?: () => void; 
};

export interface SidebarProps {
    items: SidebarItem[];
    onLogout: () => void;
};

export interface NavBarProps{
    img: string;
}

export interface CardProps {
  icon: React.ReactNode; 
  amount: string; 
  description: string; 
  tag?: string; 
  className?: string; 
  actionText?: string; 
  onActionClick?: () => void; // Optional action button click handler
}

export interface PaymentNotifCardProps {
    recipient: string;
    date: string;
}

export interface TableColumn {
  header: string;
  accessor: string;
  render?: (value: any) => React.ReactNode;
}

export interface TableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
}

export type Status = "Paid" | "Pending" | "Upcoming";

export interface SettingNavItem {
    label: string; 
    path: string;
};

export interface SettingNavProps {
    items: SettingNavItem[];
};