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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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
import {DataTableToolbar} from "@/Components/Table/DataTableToolbar.jsx";
import {TambahProyekDialog} from "@/Components/Table/Proyek/TambahProyekDialog.jsx";
import {EditProyekDialog} from "@/Components/Table/Proyek/EditProyekDialog.jsx";
import {DeleteProyekDialog} from "@/Components/Table/Proyek/DeleteProyekDialog.jsx";
import {router} from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/Components/ui/dropdown-menu.jsx";

export function DataTable({columns, data,category}) {
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
    const downloadCSV = (data) => {
        const csvRows = [];
        // Get headers
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(','));

        // Format each row
        for (const row of data) {
            const values = headers.map(header => {
                const escaped = ('' + row[header]).replace(/"/g, '\\"');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
        }
        const currentDate = new Date().toLocaleDateString('id-ID').replace(/\//g, '-');

        // Create a Blob and download it
        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', `Data Proyek PLN Nusa Daya Maluku - ${currentDate}.csv`);
        a.click();
    };

    const downloadPDF = (data) => {
        const doc = new jsPDF();
        const headers = Object.keys(data[0]);

        autoTable(doc, {
            head: [headers],
            body: data.map(item => headers.map(header => item[header])),
        });

        doc.save('data.pdf');
    };

    const generatePDF = (data) => {
        console.log(data); // Memeriksa data yang diterima
        const doc = new jsPDF({ orientation: "landscape" });

        const columns = [
            { header: 'No', dataKey: 'no' },
            { header: 'Nama Pekerjaan', dataKey: 'nama_pekerjaan' },
            { header: 'Kategori', dataKey: 'categoryLabel' },
            { header: 'Tanggal Efektif', dataKey: 'tanggal_efektif_kontrak' },
            { header: 'Jenis Kontrak', dataKey: 'jenis_kontrak' },
            { header: 'Jangka Waktu (Bulan)', dataKey: 'jangka_waktu_bulan' },
            { header: 'Jumlah Tenaga Kerja (FIX COST)', dataKey: 'jumlah_tenaga_kerja_sesuai_kontrak_fix_cost' },
            { header: 'Realisasi di Lapangan', dataKey: 'realisasi_di_lapangan' },
            { header: 'Nilai Kontrak (Inc PPN)', dataKey: 'nilai_kontrak_inc_ppn' },
            { header: 'Akhir Kontrak', dataKey: 'akhir_kontrak' },
            { header: 'Status Sisa Jangka Waktu (Bulan)', dataKey: 'status_sisa_jangka_waktu_kontrak_bulan' },
            { header: 'Keterangan', dataKey: 'keterangan' },
        ];

        const formatRupiah = (value) => {
            return `Rp ${parseInt(value, 10).toLocaleString('id-ID')}`;
        };

        const tableData = data.map((item, index) => ([
            index + 1,
            item.nama_pekerjaan || "-",
            item.category?.label || "-", // Menggunakan label dari category
            item.tanggal_efektif_kontrak || "-",
            item.jenis_kontrak ? item.jenis_kontrak : "-",
            item.jangka_waktu_bulan || 0,
            item.jumlah_tenaga_kerja_sesuai_kontrak_fix_cost || 0,
            item.realisasi_di_lapangan || 0,
            formatRupiah(item.nilai_kontrak_inc_ppn) || "-",
            item.akhir_kontrak || "",
            item.status_sisa_jangka_waktu_kontrak_bulan || 0,
            item.keterangan || "-",
        ]));

        console.log(tableData); // Memeriksa tableData yang akan ditampilkan

        autoTable(doc, {
            head: [columns.map(col => col.header)],
            body: tableData,
            theme: 'grid',
        });

        // Mendapatkan tanggal saat ini dalam format dd-mm-yyyy
        const currentDate = new Date().toLocaleDateString('id-ID').replace(/\//g, '-');

        // Menyimpan dokumen dengan nama yang diinginkan
        doc.save(`Data Proyek PLN Nusa Daya Maluku - ${currentDate}.pdf`);
    };

    return (
        <div className="rounded-md">
            <Card className={"rounded-xl"}>
                <CardHeader className={""}>
                    <div className={"grid grid-cols-2 "}>
                        <div>
                            <div className="flex items-center py-4 gap-2 max-sm:grid">
                                <Input
                                    placeholder="Cari Pekerjaan..."
                                    value={(table.getColumn("nama_pekerjaan")?.getFilterValue() ?? "")}
                                    onChange={(event) =>
                                        table.getColumn("nama_pekerjaan")?.setFilterValue(event.target.value)
                                    }
                                    className="max-w-sm"
                                />
                                <DataTableToolbar table={table} category={category}/>
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
                        <div className="flex items-center space-x-2 mb-3 w-fit max-sm:grid max-sm:space-y-2">
                            <TambahProyekDialog category={category}/>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Download Data</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-fit grid gap-2">
                                    <DropdownMenuLabel>Format File</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <Button variant={"outline"} onClick={() => downloadCSV(data)}>CSV</Button>
                                    <Button variant={"outline"} onClick={() => generatePDF(data)}>PDF</Button>
                                </DropdownMenuContent>
                            </DropdownMenu>
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
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        onClick={() => router.get(`/admin/monitoring/proyek/${row.original.id}`)}
                                        className={"hover:bg-fountain-blue-400"}
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
                                            <EditProyekDialog data={row.original} />
                                            <DeleteProyekDialog data={row} />
                                        </TableCell>
                                    </TableRow>
                                ))
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
