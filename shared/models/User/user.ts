
import * as Yup from "yup"



import type { nullOrUndefined } from '../../utils';


export const UserSchema = Yup.object().shape({
    username: Yup.string().required(),
    password : Yup.string().required(),
  });


export interface IUser{
    username: string,
  
    password: string,

    refreshToken: string
};




export class User implements IUser{
    username: string;

  
    password:  string;

    refreshToken: string;

    static df_refreshToken = ():string =>  "0";
    static isDf_refreshToken(refreshToken: string): boolean{
        return refreshToken == User.df_refreshToken();
    }

    constructor(username: string, password: string, refreshToken ?: string){
        this.username = username;
        this.password = password;
        this.refreshToken = (refreshToken ? refreshToken : User.df_refreshToken() );
    }

    static invalid_User(): User| nullOrUndefined {
        return null ;
    }
    static isInvalide_User(user: User| nullOrUndefined): boolean{
        return user == User.invalid_User()  ;
    }

    static fromJson(data: any): User{
        UserSchema.validate(data).catch((e)=> {return User.invalid_User()}); //TODO
        return new User(data.username, data.password, data.refreshToken);
    }
}

//# sourceMappingURL=user.js.map