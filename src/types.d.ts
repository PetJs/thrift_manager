export type UserRole = 'admin'  | 'user';

export type User = {
    id: string,
    name: string,
    role: UserRole
}