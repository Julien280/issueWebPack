import React, { useEffect, useState }   from "react";
import { keys }   from 'ts-transformer-keys';
//import './Input.css'
import { pick }   from 'lodash';

import {IProps,IPickProps}   from '@/utils'
import {pickAndFilterProps}   from '@/utils'
import   {ForwardPropsHookForm,IForwardPropsHookForm}   from '@/components/Utils/HookForm/HookForm'
import { FieldValues }   from "react-hook-form";



//import { debug,debug_join,debug_start_with_curLine,debug_with_curLine}   from "@/m_debug";
import getCurrentLine   from 'get-current-line'
//import {Debugger}   from "debug"

const name_module :string = "input"
//const debug_input_props : Debugger = debug(debug_join([name_module,"props"]))




export  interface IInputProp extends IPickProps<IInputProp> {
type:string;
label:string;
val:any;
title?:string;
}

export  class InputProp implements  IInputProp  
    {
      type:string;
      label:string;
      val:any;
      title?:string;


      constructor(type:string,label:string,val:any,title?:string){
        this.type=type;
        this.label=label;
        this.val=val;
        this.title=title;
      }
      
      static _emptyInit() : IInputProp{
        return new InputProp("","","");
      }

      emptyInit(){
        return  InputProp._emptyInit();
      }


    }

type PropsType<T extends FieldValues > = ForwardPropsHookForm<T> & IProps & InputProp;

export const Input:React.FC<any> = <T extends FieldValues >(props:any)=>{

//  debug_start_with_curLine(debug_input_props,getCurrentLine())
//  debug_with_curLine(debug_input_props,getCurrentLine(),"props : " + props)



  let input_props : IInputProp = InputProp._emptyInit();
  let forwardPropsHookForm  : IForwardPropsHookForm<T> = ForwardPropsHookForm._emptyInit<T>();
  let restProps : IProps = {} as IProps;
  
  ({ extracted_props:input_props , restProps} =  pickAndFilterProps<IInputProp>(props,input_props));
  
  ({ extracted_props:forwardPropsHookForm , restProps} =  pickAndFilterProps<IForwardPropsHookForm<T>>(restProps,forwardPropsHookForm))

  //Erreur here : dfModels is undefined
//  debug_with_curLine(debug_input_props,getCurrentLine(), "Forward Hook Props :" + forwardPropsHookForm)
  let path_register : string =forwardPropsHookForm.dfModels.jsonform_path ?`${forwardPropsHookForm.dfModels.jsonform_path}.${input_props.label}` : `${input_props.label}`;
//  debug_with_curLine(debug_input_props,getCurrentLine(), "path to input in form register : " +path_register)

  return (
    <div className="card">
      {input_props.title && <h5 className="card-header">{input_props.title}</h5>}
      <label>{input_props.label}</label>
      {//defaultValue={input_props.val}
      }
      <input type={input_props.type} placeholder ={input_props.val}   {...forwardPropsHookForm.useFormProps.register(path_register as any  )}  />
    </div>
  )
}

//# sourceMappingURL=Input.js.map