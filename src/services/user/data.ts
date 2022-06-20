export type LoginParams = {
  userName: string;
  password: string;
};

export type User = {
  name: string;
  password: string;
  autoLogin: boolean;
  type: string;
};
