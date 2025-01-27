import { dataBaseConfig } from "../../database/databaseSource";
import { AuthenticationDTO } from "../../dto/authentication/authentication";
import User from "../../entities/users/users.entity";
import bcrypt from 'bcrypt'
import { UserAlreadyExistsError, UserTypeError } from '../../errors/AuthenticationErrors';
import { MissingArgsErrors } from "../../errors/AuthenticationErrors";

export default class SignupService{
    private userRepository;

    constructor(){
        this.userRepository = dataBaseConfig.getRepository(User)
    }

    public async signUp(userData: AuthenticationDTO): Promise<User> {
      try {

        if (!userData.email || !userData.password || !userData.name || !userData.userType) {
          throw new MissingArgsErrors();  // Throw an error if either email or password is missing
      }

          const existingUser = await this.userRepository.findOne({
              where: { email: userData.email }
          });
                  
          if (existingUser) {
              throw new UserAlreadyExistsError();
          }
                  
          const hashedPassword = await bcrypt.hash(userData.password, 10);
          const user = this.userRepository.create({
              ...userData,
              password: hashedPassword,
          });
          console.log(user,"here")
  
          return await this.userRepository.save(user);
      } catch (err) {
          if (err instanceof UserAlreadyExistsError) {
              throw err;
          }
          if (err instanceof MissingArgsErrors){
            throw err
          }
          throw new UserTypeError()
      }
  }
    
}