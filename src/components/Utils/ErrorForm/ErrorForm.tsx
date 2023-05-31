
import React   from "react";
import { FieldValues, UseFormReturn }   from "react-hook-form"
import { EmptyComponent, IPickProps, IProps, pickAndFilterProps }   from '@/utils'
import {ErrorForm as style_errorForm }   from '@/styles/Error'



//import { debug,debug_end_with_curLine,debug_join,debug_start_with_curLine,debug_with_curLine}   from "@/m_debug";
import getCurrentLine   from 'get-current-line'
//import {Debugger}   from "debug"

const name_module :string = "errorForm"
//const debug_errorForm_props : Debugger = debug(debug_join([name_module,"props"]))


interface IErrorFormProps<T extends FieldValues > extends IPickProps<IErrorFormProps<T>> {
    useFormProps : UseFormReturn <T> ;
    label : string|number ;
}

export  class ErrorFormProps<T extends FieldValues > implements IErrorFormProps<T> {
    useFormProps : UseFormReturn <T> ;
    label : string|number ;

    constructor(useFormProps : UseFormReturn <T> ,label : string|number ){
        this.useFormProps=useFormProps;
        this.label=label;
    }

    static _emptyInit<T extends FieldValues >() : IErrorFormProps<T> {
        return new ErrorFormProps(null as any, "");
    }
    emptyInit(){
        return ErrorFormProps._emptyInit<T>();
    }
}


export const ErrorForm:React.FC<any> = <T extends FieldValues >(props:any)=>{

//    debug_start_with_curLine(debug_errorForm_props,getCurrentLine())
//    debug_with_curLine(debug_errorForm_props ,getCurrentLine(),"props : " + props)

    let errFormProps : IErrorFormProps <T> = ErrorFormProps._emptyInit<T>();
    let restProps : IProps = {} as IProps;

    //TODO : 
    ({ extracted_props:errFormProps , restProps} =  pickAndFilterProps<IErrorFormProps <T>>(props,errFormProps));

//    debug_with_curLine(debug_errorForm_props ,getCurrentLine(),"ErrFormProps : " + errFormProps)

    const { useFormProps, label } = errFormProps;

    
    if(useFormProps.formState.errors[label.toString()]){
        return( <p style={style_errorForm} >{useFormProps.formState.errors[label.toString()]?.message as string } </p>)
    }
    else {
        return (<EmptyComponent/>)
    }
}

//# sourceMappingURL=ErrorForm.js.map