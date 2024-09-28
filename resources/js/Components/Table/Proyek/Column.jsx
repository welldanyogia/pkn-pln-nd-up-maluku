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

const formatRupiah = (value) => {
    return `Rp ${parseInt(value, 10).toLocaleString('id-ID')}`;
};
export const columns = [
    {
        accessorKey: "no",
        title: "No",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="No" />
        ),
        cell: ({ row }) => (
            <div className="text-center justify-center">{row.index + 1}</div>
        ),
    },
    {
        accessorKey: "nama_pekerjaan",
        title: "Nama Pekerjaan",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama Pekerjaan" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="text-center justify-center">{getValue()}</div>
        ),
    },
    {
        id: "category",
        title: "Kategori",
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
        accessorKey: "alatkerja_summary",
        title: "Kondisi Alat Kerja",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Kondisi Alat Kerja" className={"w-[200px]"} />
        ),
        cell: ({ row }) => {
            // Ambil data alatkerja_summary dari baris
            const alatkerjaSummary = row.getValue("alatkerja_summary");

            if (!alatkerjaSummary || alatkerjaSummary.length === 0) {
                return null;
            }

            // Inisialisasi jumlah default untuk setiap keterangan
            const summary = {
                kritis: 0,
                normal: 0,
                kronis: 0,
            };

            // Iterasi melalui alatkerjaSummary untuk menghitung jumlah berdasarkan keterangan
            alatkerjaSummary.forEach(item => {
                const lowerKeterangan = item.keterangan.toLowerCase();
                if (summary.hasOwnProperty(lowerKeterangan)) {
                    summary[lowerKeterangan] = item.count;
                }
            });

            return (
                <div className="grid grid-cols-3 gap-1">
                    {/* Badge untuk Kritis */}
                    <Badge className="bg-red-500 text-white justify-center rounded-xl text-center">
                        {summary.kritis}
                    </Badge>
                    {/* Badge untuk Normal */}
                    <Badge className="bg-green-500 text-white justify-center rounded-xl text-center">
                        {summary.normal}
                    </Badge>
                    {/* Badge untuk Kronis */}
                    <Badge className="bg-yellow-500 text-white justify-center rounded-xl text-center">
                        {summary.kronis}
                    </Badge>
                </div>
            );
        }

    },
    {
        accessorKey: "tanggal_efektif_kontrak",
        title: "Tanggal Efektif",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tanggal Efektif" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="text-center justify-center">{getValue()}</div>
        ),
    },
    {
        accessorKey: "jenis_kontrak",
        title: "Jenis Kontrak",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Jenis Kontrak" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="text-center justify-center">{getValue()}</div>
        ),
    },
    {
        accessorKey: "jangka_waktu_bulan",
        title: "Jangka Waktu (Bulan)",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Jangka Waktu (Bulan)" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="text-center justify-center">{getValue()} Bulan</div>
        ),
    },
    {
        accessorKey: "jumlah_tenaga_kerja_sesuai_kontrak_fix_cost",
        title: "Jumlah Tenaga Kerja Sesuai Kontrak (FIX COST)",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Jumlah Tenaga Kerja Sesuai Kontrak (FIX COST)" className={"w-[250px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="text-center justify-center">{getValue()} Tenaga Kerja</div>
        ),
    },
    {
        accessorKey: "realisasi_di_lapangan",
        title: "Realisasi di Lapangan",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Realisasi di Lapangan" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="text-center justify-center">{getValue()} Tenaga Kerja</div>
        ),
    },
    {
        accessorKey: "nilai_kontrak_inc_ppn",
        title: "Nilai Kontrak (Inc PPN)",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nilai Kontrak (Inc PPN)" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="text-center justify-center">{formatRupiah(getValue())}</div>
        ),
    },
    {
        accessorKey: "akhir_kontrak",
        title: "Akhir Kontrak",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Akhir Kontrak" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="text-center justify-center">{getValue()}</div>
        ),
    },
    {
        accessorKey: "status_sisa_jangka_waktu_kontrak_bulan",
        title: "Status Sisa Jangka Waktu Kontrak (Bulan)",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status Sisa Jangka Waktu Kontrak (Bulan)" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="text-center justify-center">{getValue()} Bulan</div>
        ),
    },
    {
        accessorKey: "keterangan",
        title: "Keterangan",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Keterangan" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="text-center justify-center">{getValue()}</div>
        ),
    },
];
