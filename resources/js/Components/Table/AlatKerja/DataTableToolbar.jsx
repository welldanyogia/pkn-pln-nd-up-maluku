"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
// import { TableTK } from "@tanstack/react-table";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
// import { DataTableViewOptions } from "@/app/(app)/examples/tasks/components/data-table-view-options";

// import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./DataTableFacetedFilter.jsx";
import {categories, statuses} from "@/Components/Table/Dashboard/Column.jsx";

export function DataTableToolbar({ table,projects }) {
    const isFiltered = table.getState().columnFilters.length > 0;


    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                {table.getColumn("project.nama_pekerjaan") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("project.nama_pekerjaan")}
                        title="Proyek"
                        options={projects}
                    />
                )}
                {/*{table.getColumn("status") && (*/}
                {/*    <DataTableFacetedFilter*/}
                {/*        column={table.getColumn("status")}*/}
                {/*        title="Status"*/}
                {/*        options={statuses}*/}
                {/*    />*/}
                {/*)}*/}
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
