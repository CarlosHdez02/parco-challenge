import { dataBaseConfig } from "../../database/databaseSource";
import User from "../../entities/users/users.entity";


export default class UsersService{
    private userRepository 

    constructor(){
       this.userRepository = dataBaseConfig.getRepository(User)
    }

    public async getUsers(): Promise<User[]>{
        try{
            const users = await this.userRepository.find()
            return users
        }catch(err){
            console.log(err)
            throw new Error("Failed to retrieve users")
        }
    }

    public async getUserById(id: string): Promise<User | unknown> {
        try {
            const existingUser = await this.userRepository.findOneBy({ id });
            return existingUser;
        } catch (err) {
            console.log(err)
            throw new Error("No user with that ID");
        }
    }
}