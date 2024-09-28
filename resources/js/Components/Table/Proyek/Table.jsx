import { columns } from "./Column.jsx";
import { DataTable } from "./DataTable.jsx";
import {useEffect, useState} from "react";

export default function Table({data,category}) {

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} category={category} />
        </div>
    );
}
