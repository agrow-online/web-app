export type User = {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  role: Role;
  belongsToBusinessId: string;
};

export type Business = {
  id: string;
  name: string;
  userId: string;
};

enum Role {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export const roleTextMap: { [key in Role]: string } = {
  ADMIN: 'Admin',
  EMPLOYEE: 'Staff attendant',
};
