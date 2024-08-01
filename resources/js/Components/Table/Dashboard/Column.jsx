"use client";

import { DataTableColumnHeader } from "@/Components/Table/DataTableColumnHeader.jsx";
import {Badge} from "@/Components/ui/badge.jsx";
import {
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon
} from "@radix-ui/react-icons";

const categoryColors = {
    "PEMBANGKIT": "bg-red-500",
    "DISTRIBUSI": "bg-blue-500",
    "PELAYANAN PELANGGAN": "bg-green-500",
    "TRANSMISI": "bg-yellow-500",
    "AIL DOWNLOADER": "bg-purple-500",
};
export const statuses = [
    {
        value: "backlog",
        label: "Backlog",
        icon: QuestionMarkCircledIcon,
    },
    {
        value: "todo",
        label: "Todo",
        icon: CircleIcon,
    },
    {
        value: "in progress",
        label: "In Progress",
        icon: StopwatchIcon,
    },
    {
        value: "done",
        label: "Done",
        icon: CheckCircledIcon,
    },
    {
        value: "canceled",
        label: "Canceled",
        icon: CrossCircledIcon,
    },
]
export const columns = [
    {
        accessorKey: "no",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="No" />
        ),
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "nama_pekerjaan",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama Pekerjaan" className={"w-[200px]"} />
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = statuses.find(
                (status) => status.value === row.getValue("status")
            )

            if (!status) {
                return null
            }

            return (
                <div className="flex w-[100px] items-center">
                    {status.icon && (
                        <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{status.label}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        id: "category",
        accessorKey: "category",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Kategori" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => {
            const category = getValue();
            const colorClass = categoryColors[category] || "bg-gray-500"; // Default color if category not found
            return (
                <Badge className={`text-white ${colorClass} rounded-xl text-center text-balance`}>
                    {category}
                </Badge>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "tanggal_efektif_kontrak",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tanggal Efektif" className={"w-[200px]"} />
        ),
    },
    {
        accessorKey: "jenis_kontrak",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Jenis Kontrak" className={"w-[200px]"} />
        ),
    },
    {
        accessorKey: "jangka_waktu_bulan",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Jangka Waktu (Bulan)" className={"w-[200px]"} />
        ),
    },
    {
        accessorKey: "jumlah_tenaga_kerja_sesuai_kontrak_fix_cost",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Jumlah Tenaga Kerja Sesuai Kontrak (FIX COST)" className={"w-[250px]"} />
        ),
    },
    {
        accessorKey: "realisasi_di_lapangan",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Realisasi di Lapangan" className={"w-[200px]"} />
        ),
    },
    {
        accessorKey: "nilai_kontrak_inc_ppn",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nilai Kontrak (Inc PPN)" className={"w-[200px]"} />
        ),
    },
    {
        accessorKey: "akhir_kontrak",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Akhir Kontrak" className={"w-[200px]"} />
        ),
    },
    {
        accessorKey: "status_sisa_jangka_waktu_kontrak_bulan",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status Sisa Jangka Waktu Kontrak (Bulan)" className={"w-[200px]"} />
        ),
    },
    {
        accessorKey: "keterangan",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Keterangan" className={"w-[200px]"} />
        ),
    },
];
