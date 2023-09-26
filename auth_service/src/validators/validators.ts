import Joi from "joi";
import { ForgotPassword, MesssageStructure, ResetPassword, UsersLogin } from "../auth/interface/users.interface";



export const usersValidator = (user: UsersLogin) => {
    const schema = Joi.object({
      email: Joi.string().trim().email().required().label("Email"),
      phone: Joi.string().required().label("phone")
    });
    const options = {
      errors: {
        wrap: {
          label: "",
        },
      },
    };
    return schema.validate(user, options);
  };

  export const ResetPasswordValidator = (user: ResetPassword) => {
    const schema = Joi.object({
      oldPassword: Joi.string().trim().required(),
      newPassword: Joi.string().trim().required().label("New Password"),
      confirmPassword: Joi.string().trim().required().label("Confirm Password")
    });
    const options = {
      errors: {
        wrap: {
          label: "",
        },
      },
    };
    return schema.validate(user, options);
  };

  export const forgotPasswordValidator = (input: ForgotPassword) => {
    const schema = Joi.object({
      password: Joi.string().trim().required().label("Password"),
      confirmPassword: Joi.string().trim().required().label("Confirm Password")
    });
    const options = {
      errors: {
        wrap: {
          label: "",
        },
      },
    };
    return schema.validate(input, options);
  };

  export const sendEmailValidator = (sendMail: MesssageStructure) => {
    const schema = Joi.object({
      to: Joi.array().items(Joi.string().email().required()),
      cc: Joi.array().items(Joi.string().email()),
      bcc: Joi.array().items(Joi.string().email()),
      subject: Joi.string(),
      messageBody: Joi.string().required(),
    });
    const options = {
      errors: {
        wrap: {
          label: "",
        },
      },
    };
    return schema.validate(sendMail, options);
  }
  