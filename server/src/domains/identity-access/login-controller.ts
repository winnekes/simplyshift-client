import {
  JsonController,
  Body,
  Post,
  BadRequestError,
  NotFoundError,
} from "routing-controllers";
import { IsString } from "class-validator";
import { getCustomRepository } from "typeorm";
import { sign } from "../../utils/jwt";
import { UserRepository } from "./user-repository";

class AuthenticationPayload {
  @IsString()
  email!: string;

  @IsString()
  password!: string;
}

@JsonController()
export default class LoginController {
  private userRepository = getCustomRepository(UserRepository);
  @Post("/login")
  async authenticate(@Body() data: AuthenticationPayload) {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (!user) {
      throw new NotFoundError("That email address does not exist");
    }

    if (!(await user.checkPassword(data.password))) {
      throw new BadRequestError("Incorrect email or password.");
    }

    const jwt = sign({ id: user.id });
    return { token: jwt, user };
  }
}
