import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
import { SchemaUser } from "./schemas/user.schema";
import * as bcrypt from "bcrypt";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: UserDto): Promise<SchemaUser> {
    // Extract user details from registerDto
    const { email, password, name, surname, updated_at, userId } = registerDto;

    // Check if user with the same email already exists
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException("Email already taken");
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser: UserDto = {
      email,
      password: hashedPassword,
      name,
      surname,
      updated_at,
      userId
    };
    return await this.userService.create(newUser);
  }

  async login(loginDto: UserDto): Promise<{ accessToken: string }> {
    // Extract user details from loginDto
    const { email, password } = loginDto;

    // Check if user with the given email exists
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    // Compare the provided password with the stored password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid email or password");
    }

    // Generate and sign a JWT token
    const payload = { sub: user.email, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    // Return the access token
    return { accessToken };
  }
}
