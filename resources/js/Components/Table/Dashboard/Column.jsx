"use client";

import { DataTableColumnHeader } from "@/Components/Table/DataTableColumnHeader.jsx";
import { Badge } from "@/Components/ui/badge.jsx";
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
];

export const categories = [
    {
        label: "PEMBANGKIT",
        value: "PEMBANGKIT",
    },
    {
        label: "DISTRIBUSI",
        value: "DISTRIBUSI"
    },
    {
        label: "PELAYANAN PELANGGAN",
        value: "PELAYANAN PELANGGAN",
    },
    {
        label: "TRANSMISI",
        value: "TRANSMISI",
    },
    {
        label: "AIL DOWNLOADER",
        value: "AIL DOWNLOADER",
    }
];

export const columns = [
    {
        accessorKey: "no",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="No" />
        ),
        cell: ({ row }) => (
            <div className="text-center justify-center">{row.index + 1}</div>
        ),
    },
    {
        accessorKey: "nama_pekerjaan",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama Pekerjaan" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="text-center justify-center">{getValue()}</div>
        ),
    },
    {
        id: "category",
        accessorKey: "category.label",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Kategori" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => {
            const category = getValue();
            const colorClass = categoryColors[category] || "bg-gray-500";
            return (
                <div className="flex justify-center">
                    <Badge className={`text-white ${colorClass} rounded-xl text-center text-balance`}>
                        {category}
                    </Badge>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },

    {
        accessorKey: "alat_kerja",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Kondisi Alat Kerja" className={"w-[200px]"} />
        ),
        cell: ({ row }) => {
            const kondisi = row.getValue("alat_kerja");

            if (!kondisi) {
                return null;
            }

            return (
                <div className="grid grid-cols-3 space-x-1">
                    <Badge className="bg-red-500 text-white justify-center rounded-xl text-center">{kondisi.kritis}</Badge>
                    <Badge className="bg-green-500 text-white justify-center rounded-xl text-center">{kondisi.normal}</Badge>
                    <Badge className="bg-yellow-500 text-white justify-center rounded-xl text-center">{kondisi.kronis}</Badge>
                </div>
            );
        },
    },
    {
        accessorKey: "tanggal_efektif_kontrak",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tanggal Efektif" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="text-center justify-center">{getValue()}</div>
        ),
    },
    {
        accessorKey: "jenis_kontrak",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Jenis Kontrak" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="text-center justify-center">{getValue()}</div>
        ),
    },
    {
        accessorKey: "jangka_waktu_bulan",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Jangka Waktu (Bulan)" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="text-center justify-center">{getValue()}</div>
        ),
    },
    {
        accessorKey: "jumlah_tenaga_kerja_sesuai_kontrak_fix_cost",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Jumlah Tenaga Kerja Sesuai Kontrak (FIX COST)" className={"w-[250px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="text-center justify-center">{getValue()}</div>
        ),
    },
    {
        accessorKey: "realisasi_di_lapangan",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Realisasi di Lapangan" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="text-center justify-center">{getValue()}</div>
        ),
    },
    {
        accessorKey: "nilai_kontrak_inc_ppn",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nilai Kontrak (Inc PPN)" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="text-center justify-center">{getValue()}</div>
        ),
    },
    {
        accessorKey: "akhir_kontrak",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Akhir Kontrak" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="text-center justify-center">{getValue()}</div>
        ),
    },
    {
        accessorKey: "status_sisa_jangka_waktu_kontrak_bulan",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status Sisa Jangka Waktu Kontrak (Bulan)" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="text-center justify-center">{getValue()}</div>
        ),
    },
    {
        accessorKey: "keterangan",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Keterangan" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="text-center justify-center">{getValue()}</div>
        ),
    },
];
