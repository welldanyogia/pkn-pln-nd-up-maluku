"use client";

import {
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {Button} from "@/Components/ui/button.jsx";
import {DataTablePagination} from "@/Components/Table/DataTablePagination.jsx";
import {Card, CardContent, CardFooter, CardHeader} from "@/Components/ui/card.jsx";
import {DataTableViewOptions} from "@/Components/Table/DataTableViewOption.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/Components/ui/select.jsx";
import {useEffect, useState} from "react";
import {Input} from "@/Components/ui/input.jsx";
import {DataTableFacetedFilter} from "@/Components/Table/DataTableFacetedFilter.jsx";
import {getData} from "./Data.js"
import {TambahProyekDialog} from "@/Components/Table/Proyek/TambahProyekDialog.jsx";
import {TambahAlatKerjaDialog} from "@/Components/Table/AlatKerja/TambahAlatKerjaDialog.jsx";
import {DataTableToolbar} from "@/Components/Table/AlatKerja/DataTableToolbar.jsx";
import {EditAlatKerjaDialog} from "@/Components/Table/AlatKerja/EditAlatKerjaDialog.jsx";
import {DeleteAlatKerjaDialog} from "@/Components/Table/AlatKerja/DeleteAlatKerjaDialog.jsx";
import {router} from "@inertiajs/react";

export function DataTable({columns, data,projects}) {
    const [rowSelection, setRowSelection] = useState({})
    const [columnVisibility, setColumnVisibility] = useState({})
    const [columnFilters, setColumnFilters] = useState([])
    const [sorting, setSorting] = useState([])

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    return (
        <div className="rounded-md">
            <Card className={"rounded-xl"}>
                <CardHeader className={""}>
                    <div className={"grid grid-cols-2 "}>
                        <div>
                            <div className="flex items-center py-4 gap-2 max-sm:grid">
                                <Input
                                    placeholder="Cari Alat..."
                                    value={(table.getColumn("nama_alat")?.getFilterValue() ?? "")}
                                    onChange={(event) =>
                                        table.getColumn("nama_alat")?.setFilterValue(event.target.value)
                                    }
                                    className="max-w-sm"
                                />
                                <DataTableToolbar table={table} projects={projects}/>
                            </div>
                        </div>

                        <DataTableViewOptions table={table}/>
                    </div>
                </CardHeader>
                <CardContent className={"rounded-xl"}>
                    <div className={"flex justify-between max-sm:grid"}>
                        <div className="flex items-center space-x-2 mb-3 w-fit">
                            <p className="text-sm font-medium">Rows per page</p>
                            <Select
                                value={`${table.getState().pagination.pageSize}`}
                                onValueChange={(value) => {
                                    table.setPageSize(Number(value));
                                }}
                            >
                                <SelectTrigger className="h-8 w-[70px]">
                                    <SelectValue placeholder={table.getState().pagination.pageSize}/>
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {[10, 20, 30, 40, 50].map((pageSize) => (
                                        <SelectItem key={pageSize} value={`${pageSize}`}>
                                            {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center space-x-2 mb-3 w-fit">
                            <TambahAlatKerjaDialog projects={projects}/>
                        </div>
                    </div>
                    <Table className={"rounded-xl"}>
                        <TableHeader className={"bg-fountain-blue-300"}>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead
                                                key={header.id}
                                                className="text-white"
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        );
                                    })}
                                    <TableHead
                                        className="sticky sm:right-0 bg-fountain-blue-300 text-white text-center"
                                        style={{ zIndex: 1 }}
                                    >
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => {
                                    // Ambil nilai keterangan dari baris saat ini (misalnya, dari kolom "keterangan")
                                    const keterangan = row.getValue('keterangan');

                                    // Tentukan warna hover berdasarkan nilai keterangan
                                    const hoverColor = (keterangan) => {
                                        switch (keterangan?.toLowerCase()) {
                                            case 'normal':
                                                return 'hover:bg-green-200';
                                            case 'kritis':
                                                return 'hover:bg-orange-200';
                                            case 'kronis':
                                                return 'hover:bg-red-200';
                                            default:
                                                return 'hover:bg-gray-200'; // Default color
                                        }
                                    };

                                    return (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                            onClick={() => {
                                                router.get(`/admin/monitoring/alat-kerja/${row.original.id}`)
                                                console.log(row.original.id)
                                            }}
                                            className={`${hoverColor(keterangan)}`} // Apply hover color dynamically
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                            {/* Kolom terakhir dengan posisi sticky */}
                                            <TableCell
                                                className="sticky sm:right-0 bg-white flex gap-2"
                                                style={{ zIndex: 1 }}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <EditAlatKerjaDialog data={row.original} projects={projects}/>
                                                <DeleteAlatKerjaDialog data={row}/>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>

                    </Table>
                </CardContent>
                <CardFooter>
                    <DataTablePagination table={table}/>
                </CardFooter>
            </Card>
            {/*<div className="flex items-center justify-end space-x-2 py-4">*/}
            {/*    <Button*/}
            {/*        variant="outline"*/}
            {/*        size="sm"*/}
            {/*        onClick={() => table.previousPage()}*/}
            {/*        disabled={!table.getCanPreviousPage()}*/}
            {/*    >*/}
            {/*        Previous*/}
            {/*    </Button>*/}
            {/*    <Button*/}
            {/*        variant="outline"*/}
            {/*        size="sm"*/}
            {/*        onClick={() => table.nextPage()}*/}
            {/*        disabled={!table.getCanNextPage()}*/}
            {/*    >*/}
            {/*        Next*/}
            {/*    </Button>*/}
            {/*</div>*/}
        </div>
    )
        ;
}
