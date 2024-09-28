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

export const columns = [
    {
        accessorKey: "no",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="No" />
        ),
        cell: ({ row }) => (
            <div className="flex justify-center">{row.index + 1}</div> // Centered content
        ),
    },
    {
        accessorKey: "nama_alat",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama Alat" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="flex justify-center text-center">{getValue()}</div> // Centered content
        ),
    },
    // {
    //     accessorKey: "project.nama_pekerjaan",
    //     id:"project.nama_pekerjaan",
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title="Proyek" className={"w-[200px]"} />
    //     ),
    //     cell: ({ getValue }) => (
    //         <div className="flex justify-center text-center">{getValue()}</div> // Centered content
    //     ),
    //     filterFn: (row, id, value) => {
    //         return value.includes(row.getValue(id));
    //     },
    // },
    {
        accessorKey: "tgl_kontrak",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tanggal Kontrak" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="flex justify-center text-center">{getValue()}</div> // Centered content
        ),
    },
    {
        accessorKey: "masa_pakai",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Masa Pakai (Bulan)" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="flex justify-center">{getValue()} Bulan</div> // Centered content
        ),
    },
    {
        accessorKey: "masa_pakai_saat_ini",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Masa Pakai Saat Ini (Bulan)" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="flex justify-center">{getValue()} Bulan</div> // Centered content
        ),
    },
    {
        accessorKey: "sisa_masa_pakai",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Sisa Masa Pakai (Bulan)" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="flex justify-center">{getValue()} Bulan</div> // Centered content
        ),
    },
    {
        accessorKey: "keterangan",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Keterangan" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => {
            const status = getValue() || 'N/A';

            // Tentukan warna Badge berdasarkan status
            const badgeColor = (status) => {
                switch (status.toLowerCase()) {
                    case 'normal':
                        return 'bg-green-500 text-white'; // Hijau
                    case 'kritis':
                        return 'bg-orange-500 text-white'; // Jingga
                    case 'kronis':
                        return 'bg-red-500 text-white'; // Merah
                    default:
                        return 'bg-gray-500 text-white'; // Default/N/A
                }
            };

            return (
                <div className="flex justify-center text-center">
                    <Badge className={badgeColor(status)}>
                        {status}
                    </Badge>
                </div> // Centered content
            );
        }
    },
];


