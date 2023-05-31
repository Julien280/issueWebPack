
import React, { useEffect, useState } from "react";

import {GenericInput  } from "../GenericInput/GenericInput";
//import './HookForm.css'

import {UseFormReturn} from "react-hook-form/dist/types/form";
import { IProps ,dfModelProps ,IdfModelProps} from "@/utils";

import { pick } from 'lodash';
import {pickAndFilterProps , IPickProps} from '@/utils'   
import { FieldValues } from "react-hook-form";



//import { debug,debug_end_with_curLine,debug_join,debug_start_with_curLine,debug_with_curLine} from "@/m_debug";
import getCurrentLine from 'get-current-line'
//import {Debugger} from "debug"

const name_module :string = "hookForm"
//const debug_hookForm_props : Debugger = debug(debug_join([name_module,"props"]))
//const debug_hookForm_submit : Debugger = debug(debug_join([name_module,"submit"]))





interface SubmitFunctions {
    validation_function ?: (data:any)=>void //validation en plus de Yup  
    submit_function: (data:any)=>void
    handleError_function ?: (error :any) => void 
}
const df_handleError_function =  (error :any) => {
    console.log("ERROR",error);
    console.log("Invalid Data : not been submitted");
}

export interface IForwardPropsHookForm <T extends FieldValues > extends  IPickProps<IForwardPropsHookForm<T>>  {
    dfModels  : IdfModelProps ; //df data and description  for form 
    useFormProps: UseFormReturn<T> //react hook form
  }

  export  interface IHookFormProps extends IPickProps<IHookFormProps>  {
    submit_functions: SubmitFunctions
    styleHookForm ?: React.CSSProperties
}

export  class HookFormProps implements IHookFormProps  {
    submit_functions: SubmitFunctions;
    styleHookForm ?: React.CSSProperties

    constructor(submit_functions: SubmitFunctions, styleHookForm ?: React.CSSProperties){
        this.submit_functions=submit_functions;
        this.styleHookForm=styleHookForm;
    }
    static _emptyInit() : IHookFormProps{
        return new HookFormProps({submit_function:()=>{}});
    }

    emptyInit(): IHookFormProps{
        return HookFormProps._emptyInit();
    }
}

export class ForwardPropsHookForm<T extends FieldValues > implements IForwardPropsHookForm<T>  {

    dfModels:IdfModelProps ;
    useFormProps: UseFormReturn<any> //react hook form

    constructor (dfModel:IdfModelProps , useFormProps: UseFormReturn<T>){
        this. dfModels=dfModel;
        this.useFormProps=useFormProps;
    }
    static _emptyInit<T extends FieldValues >()  : IForwardPropsHookForm<T> {
        return new ForwardPropsHookForm<T>(dfModelProps._emptyInit(),null as any);
    }

    emptyInit(){
        return ForwardPropsHookForm._emptyInit<T>();
    }

}


type PropsType<T extends FieldValues > = IHookFormProps &  IProps & IForwardPropsHookForm<T>;




export const HookForm:React.FC<any> = <T extends FieldValues >(props:any)=>{


//    debug_start_with_curLine( debug_hookForm_props,getCurrentLine())
//    debug_with_curLine( debug_hookForm_props,getCurrentLine(),"props : " + props)
   

  let hook_props:IHookFormProps = HookFormProps._emptyInit(); 
  let forwardPropsHookForm:IForwardPropsHookForm<T> = ForwardPropsHookForm._emptyInit<T>();

  let restProps : IProps = {} as IProps;
  
  ({ extracted_props:hook_props , restProps} =  pickAndFilterProps<IHookFormProps>(props, hook_props));
  ({ extracted_props:forwardPropsHookForm , restProps} =  pickAndFilterProps<IForwardPropsHookForm<T>>(restProps , forwardPropsHookForm))

  

    const onSubmit = (data:any) => {

//        debug_start_with_curLine( debug_hookForm_submit,getCurrentLine())
//        debug_with_curLine( debug_hookForm_submit,getCurrentLine(),"DATA : " + data)
        try{
            if(hook_props.submit_functions.validation_function) hook_props.submit_functions.validation_function(data)
//            debug_with_curLine( debug_hookForm_submit,getCurrentLine(),"SUBMIT: " + data);
            //hook_props.submit_functions.submit_function(data);
//            debug_end_with_curLine( debug_hookForm_submit,getCurrentLine());
        }
        catch(error){
//            debug_with_curLine( debug_hookForm_submit,getCurrentLine(),"ERROR : " + error);
            if(hook_props.submit_functions.handleError_function)hook_props.submit_functions.handleError_function(error);
            else df_handleError_function(error);
//            debug_end_with_curLine( debug_hookForm_submit,getCurrentLine());
        }

    }

//    debug_with_curLine( debug_hookForm_props,getCurrentLine(),"hook_props : " +hook_props);
//    debug_with_curLine( debug_hookForm_props,getCurrentLine(),"Forward Hook Props :" + forwardPropsHookForm);

    return (
        <>
        <form className='form' noValidate onSubmit={forwardPropsHookForm.useFormProps.handleSubmit(onSubmit)} style={hook_props.styleHookForm} > {/* no validate =suppr default ,  Yup prend relais */}
        <GenericInput   {...forwardPropsHookForm}  />
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </>
    )
}

//# sourceMappingURL=HookForm.js.map