

import { pick } from 'lodash';
import React from 'react';
import { keys } from 'ts-transformer-keys';



//import { debug,debug_end_with_curLine,debug_join,debug_start_with_curLine,debug_with_curLine} from "@/m_debug";
import getCurrentLine from 'get-current-line'
//import {Debugger} from "debug"

const name_module :string = "utils"
//const debug_utils_pickAndFltr : Debugger = debug(debug_join([name_module,"pickAndFltr"]))





export interface IVoid {

}

export interface IProps extends IVoid  {
    children?: any;
    [key: string]: any;
}

export interface IdfModelProps  extends IPickProps<IdfModelProps> {
    defaultM_path :string; //path to access json property wich is currently being edited in  pathDefaultM
    fileDefaultM :string; // path to file containing default model
    jsonform_path:string ; //  path to access json property wich is currently being edited in HookFormjson
}

export  class dfModelProps implements IdfModelProps {
    defaultM_path :string;
    fileDefaultM :string;
    jsonform_path:string ; 
    
    constructor(defaultM_path:string,fileDefaultM:string , jsonform_path:string){
        this.defaultM_path=defaultM_path;
        this.fileDefaultM=fileDefaultM;
        this.jsonform_path= jsonform_path;

    }

    static _emptyInit() : IdfModelProps{
        return new dfModelProps("","","");
    }

    emptyInit(){
        return dfModelProps._emptyInit();
    }

}

export interface IPickProps<T>  {
    emptyInit : () => T;


}




export function pickAndFilterProps<T extends IPickProps<T>>(props: IProps , dfInstance :  T )  : { extracted_props:T, restProps:IProps } {
     
//    debug_start_with_curLine(debug_utils_pickAndFltr,getCurrentLine())

//    debug_with_curLine(debug_utils_pickAndFltr,getCurrentLine(),"dfInstance :" + dfInstance)

    const extracted_props:T = pick(props, Object.keys( dfInstance  ) ) as T;
//    debug_with_curLine(debug_utils_pickAndFltr,getCurrentLine(), "extracted_props : " + extracted_props)

    const restProps:IProps = pick(props, Object.keys(props).filter(key => !(key in Object.keys(extracted_props ))));
//    debug_with_curLine(debug_utils_pickAndFltr,getCurrentLine(), "restProps : " + restProps)



    return { extracted_props, restProps };

}



export const EmptyComponent = () => {return (<></>)}

//# sourceMappingURL=utils.js.map