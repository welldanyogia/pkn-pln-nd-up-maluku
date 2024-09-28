import { columns } from "./Column.jsx";
import { DataTable } from "./DataTable.jsx";
import {useEffect, useState} from "react";

export default function Table({data,projects}) {

    return (
        <div className="containermax-w-7xl mx-auto sm:px-6 lg:px-8 py-10">
            <DataTable columns={columns} data={data} projects={projects}/>
        </div>
    );
}
