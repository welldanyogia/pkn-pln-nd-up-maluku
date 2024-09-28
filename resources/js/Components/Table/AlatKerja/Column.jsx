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
        title: "No",
        accessorKey: "no",
        id: "no",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="No" className={"text-center justify-center"} />
        ),
        cell: ({ row }) => (
            <div className="flex justify-center">{row.index + 1}</div> // Centered content
        ),
    },
    {
        title: "Nama Alat",
        accessorKey: "nama_alat",
        id: "nama_alat",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama Alat" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="flex justify-center text-center">{getValue()}</div> // Centered content
        ),
    },
    {
        title: "Proyek",
        id: "project.nama_pekerjaan",
        accessorKey: "project.nama_pekerjaan",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Proyek" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="flex justify-center text-center">{getValue()}</div> // Centered content
        ),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        title: "Tanggal Kontrak",
        accessorKey: "tgl_kontrak",
        id: "tgl_kontrak",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tanggal Kontrak" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="flex justify-center text-center">{getValue()}</div> // Centered content
        ),
    },
    {
        title: "Tanggal Akhir Kontrak",
        accessorKey: "tgl_akhir_kontrak",
        id: "tgl_akhir_kontrak",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tanggal Akhir Kontrak" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => {
            const value = getValue();
            // Check if the value is a valid date string
            const formattedDate = new Date(value).toISOString().split("T")[0]; // Convert to yyyy-mm-dd
            return <div className="flex justify-center text-center">{formattedDate}</div>; // Centered content
        },
    },
    {
        title: "Masa Pakai (Bulan)",
        accessorKey: "masa_pakai",
        id: "masa_pakai",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Masa Pakai (Bulan)" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="flex justify-center">{getValue()} Bulan</div> // Centered content
        ),
    },
    {
        title: "Masa Pakai Saat Ini (Bulan)",
        accessorKey: "masa_pakai_saat_ini",
        id: "masa_pakai_saat_ini",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Masa Pakai Saat Ini (Bulan)" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="flex justify-center">{getValue()} Bulan</div> // Centered content
        ),
    },
    {
        title: "Sisa Masa Pakai (Bulan)",
        accessorKey: "sisa_masa_pakai",
        id: "sisa_masa_pakai",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Sisa Masa Pakai (Bulan)" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="flex justify-center">{getValue()} Bulan</div> // Centered content
        ),
    },
    {
        title: "Keterangan",
        accessorKey: "keterangan",
        id: "keterangan",
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
        },
    },
];



