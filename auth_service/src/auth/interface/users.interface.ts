 interface Exception {
    statusCode: number;
    message: string;
    data?: any;
  }
  
  export const Exception = function (this: Exception, statusCode: number, message: string, data?: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  } as unknown as { new (statusCode: number, message: string, data?: any): Exception };

  export interface IUser {
    id: string;
    email: string;
    phone: string;
    password:string
  }

export interface UsersLogin {
    email: string;
    phone: string;
}

export interface ResetPassword {
     oldPassword: string
    newPassword: string;
    confirmPassword: string
}

export interface ForgotPassword {
    password: string;
    confirmPassword: string
}

export interface MesssageStructure {
  to: [string];
  cc?: [string];
  bcc?: [string];
  subject?: string;
  messageBody: string
}