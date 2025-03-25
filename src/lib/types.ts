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