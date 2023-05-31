
import React  from "react";

import {HookForm}   from "@/components/Utils/HookForm/HookForm";

import {IVoid}   from "@/utils";
import {UseFormReturn}   from "react-hook-form/dist/types/form";
import { useForm }   from "react-hook-form";
//import './Login.css'
import  {User}   from '@shared/models/User/user' //'@shared/models/user'
//import {UserSchema}   from '@shared/models/User/user' //'@shared/models/user'
//import { defaultUser }   from "@shared/models/User/df-user.json";



import   _dfUser   from '@/../shared/models/User/Login/dfLogin'  //'@shared/models/user' 

//import { debug,debug_join,debug_start_with_curLine,debug_with_curLine}   from "@/m_debug";
import getCurrentLine   from 'get-current-line'
//import {Debugger}   from "debug"

const name_module :string = "login"
//const debug_login_dfModel : Debugger = debug(debug_join([name_module,"df-model-form"]))



const dfUser : {[key: string]: any} = _dfUser 

const Login: React.FC<IVoid> = () => { 

//    debug_start_with_curLine(debug_login_dfModel,getCurrentLine())

    const dfObj = {} as any ;
    Object.keys(dfUser).forEach(function(key,index) {
      dfObj[key]=dfUser[key]["dfValue"] 
    });

//    debug_with_curLine(debug_login_dfModel,getCurrentLine(),"dfModelForm : " + dfObj)

    //const { register, handleSubmit,  reset,clearErrors,setError,  formState:{ errors },control } 
    let val_useFormProps :UseFormReturn<User> =   useForm<User>( { 
      //resolver:yupResolver( UserSchema ),
      mode: 'onSubmit',
      defaultValues:dfObj
    } );


//  debug_with_curLine(debug_login_dfModel,getCurrentLine(),"val_useFormReturn : "+val_useFormProps)
  return (
    <div>
        <p className="color_blue"> Login Form </p>
       <HookForm submit_functions={{submit_function:()=>{}}} useFormProps={val_useFormProps} dfModels={{jsonform_path:"" ,defaultM_path :"", fileDefaultM:"user/Login/dfLogin"}}  />  
     </div>
  )
}

export default Login

//# sourceMappingURL=Login.js.map