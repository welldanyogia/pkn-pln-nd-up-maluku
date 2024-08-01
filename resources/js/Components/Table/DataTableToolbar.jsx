"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
// import { Table } from "@tanstack/react-table";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
// import { DataTableViewOptions } from "@/app/(app)/examples/tasks/components/data-table-view-options";

// import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./DataTableFacetedFilter.jsx";
import {statuses} from "@/Components/Table/Dashboard/Column.jsx";

export function DataTableToolbar({ table }) {
    const isFiltered = table.getState().columnFilters.length > 0;
    const categories = [
        {
            label:"PEMBANGKIT",
            value:"PEMBANGKIT",
        },
        {
            label:"DISTRIBUSI",
            value:"DISTRIBUSI"
        },
        {
            label:"PELAYANAN PELANGGAN",
            value:"PELAYANAN PELANGGAN",
        },
        {
            label:"TRANSMISI",
            value:"TRANSMISI",
        },
        {
            label:"AIL DOWNLOADER",
            value:"AIL DOWNLOADER",
        }
    ]


    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                {table.getColumn("category") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("category")}
                        title="Category"
                        options={categories}
                    />
                )}
                {table.getColumn("status") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("status")}
                        title="Status"
                        options={statuses}
                    />
                )}
                {/*{table.getColumn("priority") && (*/}
                {/*    <DataTableFacetedFilter*/}
                {/*        column={table.getColumn("priority")}*/}
                {/*        title="Priority"*/}
                {/*        options={priorities}*/}
                {/*    />*/}
                {/*)}*/}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            {/*<DataTableViewOptions table={table} />*/}
        </div>
    );
}
