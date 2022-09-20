export interface User {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  role: Role;
  belongsToBusinessId: string;
}

export interface Business {
  id: string;
  name: string;
  userId: string;
}

export interface Employee extends User {}

export enum Role {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export const roleTextMap: { [key in Role]: string } = {
  ADMIN: 'Admin',
  EMPLOYEE: 'Staff attendant',
};
