import {
  JsonController,
  Body,
  Post,
  BadRequestError,
} from "routing-controllers";
import { IsString } from "class-validator";
import User from "./user";
import { sign } from "../../utils/jwt";

class AuthenticationPayload {
  @IsString()
  email!: string;

  @IsString()
  password!: string;
}

@JsonController()
export default class LoginController {
  @Post("/login")
  async authenticate(@Body() { email, password }: AuthenticationPayload) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestError("A user with this email does not exist");
    }

    if (!(await user.checkPassword(password))) {
      throw new BadRequestError("Wrong email and password combination");
    }

    const jwt = sign({ id: user.id });
    return { jwt, user };
  }
}
