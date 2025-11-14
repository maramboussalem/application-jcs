import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty({ message: "il faut un nom d'utilisateur" })
    username: string;
    
    @IsString()
    @IsNotEmpty({ message: "il faut un email" })
    email: string;
}
