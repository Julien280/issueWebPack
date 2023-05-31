




import React, {   useEffect, useState }   from "react";

import {Input}   from "../Input/Input";



import {IProps,IdfModelProps as IGenericInputProps,dfModelProps as GenericInputProps, EmptyComponent}   from '@/utils'
import {pickAndFilterProps}   from '@/utils'

import {IForwardPropsHookForm,ForwardPropsHookForm }   from '@/components/Utils/HookForm/HookForm'
import { ErrorForm }   from "../ErrorForm/ErrorForm";
import { FieldValues }   from "react-hook-form";

//import { debug,debug_end_with_curLine,debug_join,debug_start_with_curLine,debug_with_curLine}   from "@/m_debug";
import getCurrentLine   from 'get-current-line'
//import {Debugger}   from "debug"

const name_module :string = "genericInput"
//const debug_genericInput_props : Debugger = debug(debug_join([name_module,"props"]))
//const debug_genericInput_setupDf : Debugger = debug(debug_join([name_module,"setup-df"]))
//const debug_genericInput_mapsInput : Debugger = debug(debug_join([name_module,"maps-input"]))



type PropsType<T extends FieldValues > = IGenericInputProps & IProps  & IForwardPropsHookForm<T>;

export  const GenericInput:React.FC<any > = <T extends FieldValues > (props:any)=>{


//    debug_start_with_curLine(debug_genericInput_props,getCurrentLine())
//    debug_with_curLine(debug_genericInput_props,getCurrentLine(),"props : " + props)

    let forwardPropsHookForm  : IForwardPropsHookForm<T> = ForwardPropsHookForm._emptyInit<T>();
    let restProps : IProps = {} as IProps;
   
    ({ extracted_props:forwardPropsHookForm , restProps} =  pickAndFilterProps<IForwardPropsHookForm<T>>(props,forwardPropsHookForm))

//    debug_with_curLine(debug_genericInput_props,getCurrentLine(),"Forward Hook Props :" + forwardPropsHookForm);

    //import default Module for select
    
    const [dfTypeAndValues, setdfTypeAndValues] = useState<any>(null);
    useEffect(() => {
        const setupdfTypeAndValues = async () => {
//            debug_with_curLine(debug_genericInput_setupDf , getCurrentLine(), "FileDefaultModel : " + `${forwardPropsHookForm.dfModels.fileDefaultM}`)
        let  defaultModule= await fetch(`/api/${forwardPropsHookForm.dfModels.fileDefaultM}`,{method: "GET",credentials: "include",}).then( (res) => res.json()).catch((err)=>{console.log(err);return null;});
        ;
    
//        debug_with_curLine(debug_genericInput_setupDf , getCurrentLine(), "Default Import Model : " + defaultModule.default)

        if(!defaultModule) return;
        if(forwardPropsHookForm.dfModels.defaultM_path === "") {
//            debug_with_curLine(debug_genericInput_setupDf , getCurrentLine(), "If ")
            setdfTypeAndValues({...defaultModule.default})
        }
        else {
//            debug_with_curLine(debug_genericInput_setupDf , getCurrentLine(), "Else ")
            setdfTypeAndValues({...defaultModule.default[forwardPropsHookForm.dfModels.defaultM_path]})
        }
//        debug_with_curLine(debug_genericInput_setupDf , getCurrentLine(),"DfTypeAndValues : "+ dfTypeAndValues)
//        debug_end_with_curLine(debug_genericInput_setupDf,getCurrentLine())
    }
        setupdfTypeAndValues()   

        },[]);


    
        if(!dfTypeAndValues) return(<div>Loading default Values for GenericInput </div>)
        return(
            <>
               {Object.keys(dfTypeAndValues).map((key,index) => {
                //form_props.dfModels.jsonform_path = key;
//                debug_with_curLine(debug_genericInput_mapsInput,getCurrentLine(),"key : " + key)
//                debug_with_curLine(debug_genericInput_mapsInput,getCurrentLine(),"dfTypeAndValues[key] : " + dfTypeAndValues[key])
                //console.log("index",index)
    
    //generic
      const getInputBlock = () =>{ switch(typeof dfTypeAndValues[key]['dfValue'] ){
        

           case 'number':
                return (
                    <Input type="number" label={key}  val={dfTypeAndValues[key]['dfValue']} {...forwardPropsHookForm}   />);
            case 'string':
                return (
                    <Input type="text" label={key}    val={dfTypeAndValues[key]['dfValue']} {...forwardPropsHookForm} />
                );
            case 'object':
                //label={key}
                return (<select   >
                    <option value="not-implemented">Not yet implemented </option>
                    </select>
                    );
            default:
                return(<EmptyComponent />);
       }
    }
        return (
            <div key={index}>
            {getInputBlock()}
            <ErrorForm useFormProps={forwardPropsHookForm.useFormProps} label = {key} />
            </div>
        )
       
       
       })}
       </>)
    
    }

    //# sourceMappingURL=GenericInput.js.map