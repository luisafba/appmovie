export interface Usuario {
  subscribe(arg0: (response: any) => void);
  _id?: string;
  nombre?: string;
  edad?: number;
  correo?: string;
  password?: string;
  imagen?: string;
  role?: string;
}
