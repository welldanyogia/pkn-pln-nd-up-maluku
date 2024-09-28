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
import {DataTableToolbar} from "@/Components/Table/DataTableToolbar.jsx";
import {TambahProyekDialog} from "@/Components/Table/Proyek/TambahProyekDialog.jsx";
import {TambahAlatKerjaDialog} from "@/Components/Table/AlatKerja/TambahAlatKerjaDialog.jsx";
import {TambahTenagaKerjaDialog} from "@/Components/Table/TenagaKerja/TambahTenagaKerjaDialog.jsx";
import {router} from "@inertiajs/react";
import {EditProyekDialog} from "@/Components/Table/Proyek/EditProyekDialog.jsx";
import {DeleteProyekDialog} from "@/Components/Table/Proyek/DeleteProyekDialog.jsx";
import {EditTenagaKerjaDialog} from "@/Components/Table/TenagaKerja/EditTenagaKerjaDialog.jsx";
import {DeleteTenagaKerjaDialog} from "@/Components/Table/TenagaKerja/DeleteTenagaKerjaDialog.jsx";

export function DataTable({columns, data, projects}) {
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
        <div className="rounded-md py-8">
            <Card className={"rounded-xl"}>
                <CardHeader className={""}>
                    <div className={"grid grid-cols-2 "}>
                        <div>
                            <div className="flex items-center py-4 gap-2">
                                <Input
                                    placeholder="Cari Nama..."
                                    value={(table.getColumn("nama")?.getFilterValue() ?? "")}
                                    onChange={(event) =>
                                        table.getColumn("nama")?.setFilterValue(event.target.value)
                                    }
                                    className="max-w-sm"
                                />
                                <DataTableToolbar table={table} />
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
                            <TambahTenagaKerjaDialog projects={projects}/>
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
                                        className="sticky sm:right-0 bg-fountain-blue-300 text-white"
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
                                    // Cek apakah dokumen ada dan log hasilnya
                                    console.log("Dokumen:", row.original.documents);

                                    // Pastikan data `documents` tersedia dan cek apakah panjangnya lebih dari 0
                                    const documentsAvailable = row.original.documents && row.original.documents.length > 0;
                                    console.log("Documents Available:", documentsAvailable);

                                    return (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                            onClick={() => router.get(`/admin/monitoring/tenagakerja/${row.original.id}`)}
                                            className={`${
                                                documentsAvailable ? "hover:bg-green-100" : "hover:bg-red-100"
                                            } cursor-pointer`}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                            {/* Kolom terakhir dengan posisi sticky */}
                                            <TableCell
                                                className="sm:sticky right-0 bg-white flex gap-2"
                                                style={{ zIndex: 1 }}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <EditTenagaKerjaDialog dataTK={row.original} projects={projects} />
                                                <DeleteTenagaKerjaDialog data={row} />
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
