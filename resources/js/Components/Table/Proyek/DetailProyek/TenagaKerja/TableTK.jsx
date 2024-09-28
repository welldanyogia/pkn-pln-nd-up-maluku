import {columns} from "./Column.jsx";
import {DataTable} from "./DataTable.jsx";
import {useEffect, useState} from "react";

export default function TableTK({data,projects}) {
    return (
        <DataTable columns={columns} data={data} projects={projects}/>
    );
}
