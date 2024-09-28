"use client";

import {DataTableColumnHeader} from "@/Components/Table/DataTableColumnHeader.jsx";
import {Badge} from "@/Components/ui/badge.jsx";
import {
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon
} from "@radix-ui/react-icons";

export const columns = [
    {
        accessorKey: "no",
        title: "No",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="No"/>
        ),
        cell: ({row}) => (
            <div className="flex justify-center">{row.index + 1}</div>
        ),
    },
    {
        accessorKey: "nama",
        title: "Nama",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Nama" className={"w-[200px]"}/>
        ),
        cell: ({getValue}) => (
            <div className="flex justify-center text-center">{getValue()}</div>
        ),
    },
    {
        accessorKey: "jabatan",
        title: "Jabatan",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Jabatan" className={"w-[200px]"}/>
        ),
        cell: ({getValue}) => (
            <div className="flex justify-center text-center">{getValue()}</div>
        ),
    },
    {
        accessorKey: "nip",
        title: "NIP",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="NIP" className={"w-[200px]"}/>
        ),
        cell: ({getValue}) => (
            <div className="flex justify-center text-center">{getValue()}</div>
        ),
    },
    {
        accessorKey: "tempat_lahir",
        title: "Tempat Lahir",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Tempat Lahir" className={"w-[200px]"}/>
        ),
        cell: ({getValue}) => (
            <div className="flex justify-center text-center">{getValue()}</div>
        ),
    },
    {
        accessorKey: "tanggal_lahir",
        title: "Tanggal Lahir",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Tanggal Lahir" className={"w-[200px]"}/>
        ),
        cell: ({getValue}) => (
            <div className="flex justify-center text-center">
                {getValue() ? new Date(getValue()).toLocaleDateString('id-ID') : 'N/A'}
            </div>
        ),
    },
    {
        accessorKey: "unit_pln",
        title: "Unit PLN",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Unit PLN" className={"w-[200px]"}/>
        ),
        cell: ({getValue}) => (
            <div className="flex justify-center text-center">{getValue() || 'N/A'}</div>
        ),
    },
    {
        accessorKey: "penempatan",
        title: "penempatan",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Penempatan" className={"w-[200px]"}/>
        ),
        cell: ({getValue}) => (
            <div className="flex justify-center text-center">{getValue() || 'N/A'}</div>
        ),
    },
    {
        accessorKey: "no_spk",
        title: "No SPK",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="No SPK" className={"w-[200px]"}/>
        ),
        cell: ({getValue}) => (
            <div className="flex justify-center text-center">{getValue() || 'N/A'}</div>
        ),
    },
    {
        accessorKey: "documents",
        title: "Status Tanda Tangan Kontrak",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Status Tanda Tangan Kontrak" className={"w-[200px]"}/>
        ),
        cell: ({getValue}) => {
            const documents = getValue();
            return (
                <div className="flex justify-center text-center">
                    {documents && documents.length > 0 ? (
                        <span className="px-2 py-1 text-sm font-medium text-white bg-green-500 rounded-md">
                            Sudah
                        </span>
                    ) : (
                        <span className="px-2 py-1 text-sm font-medium text-white bg-red-600 rounded-md">
                            Belum
                        </span>
                    )}
                </div>
            );
        },
    }

];



