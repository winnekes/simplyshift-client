import { JsonController, Body, Post } from "routing-controllers";
import { IsBoolean, IsString } from "class-validator";
import { getCustomRepository } from "typeorm";
import { ExtendedHttpError } from "../../utils/extended-http-error";
import { sign } from "../../utils/jwt";
import { UserRepository } from "./user-repository";

class AuthenticationPayload {
  @IsString()
  email!: string;

  @IsString()
  password!: string;

  @IsBoolean()
  stayLoggedIn!: string;
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
      throw new ExtendedHttpError(
        "That email address does not exist",
        "USER_NOT_FOUND"
      );
    }

    if (!(await user.checkPassword(data.password))) {
      throw new ExtendedHttpError(
        "Incorrect email or password.",
        "INCORRECT_EMAIL_OR_PASSWORD"
      );
    }

    const tokenExpiresIn = data.stayLoggedIn ? "30d" : "1d";

    const token = sign({ id: user.id }, tokenExpiresIn);
    return { token, user };
  }
}
