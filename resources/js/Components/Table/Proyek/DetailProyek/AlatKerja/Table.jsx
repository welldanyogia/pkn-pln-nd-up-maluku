import { columns } from "./Column.jsx";
import { DataTable } from "./DataTable.jsx";
import {useEffect, useState} from "react";
export default function Table({data,project}) {
    console.log("project table: ",project)

    return (

            <DataTable columns={columns} data={data} project={project}/>
    );
}
