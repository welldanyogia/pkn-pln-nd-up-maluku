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

export const categories = [
    {
        label:"PEMBANGKIT",
        value:"PEMBANGKIT",
    },
    {
        label:"DISTRIBUSI",
        value:"DISTRIBUSI"
    },
    {
        label:"PELAYANAN PELANGGAN",
        value:"PELAYANAN PELANGGAN",
    },
    {
        label:"TRANSMISI",
        value:"TRANSMISI",
    },
    {
        label:"AIL DOWNLOADER",
        value:"AIL DOWNLOADER",
    }
]
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
        accessorKey: "unit_pln",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Unit PLN" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="flex justify-center text-center">{getValue()}</div> // Centered content
        ),
    },
    {
        accessorKey: "penempatan",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Penempatan" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="flex justify-center text-center">{getValue()}</div> // Centered content
        ),
    },
    {
        accessorKey: "no_spk",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="No SPK" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="flex justify-center">{getValue()}</div> // Centered content
        ),
    },
    {
        accessorKey: "project",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Project" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="flex justify-center">{getValue()}</div> // Centered content
        ),
    },
    {
        accessorKey: "nip",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="NIP" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="flex justify-center">{getValue()}</div> // Centered content
        ),
    },
    {
        accessorKey: "nama",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="flex justify-center">{getValue()}</div> // Centered content
        ),
    },
    {
        accessorKey: "jabatan",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Jabatan" className={"w-[200px]"} />
        ),
        cell: ({ getValue }) => (
            <div className="flex justify-center">{getValue()}</div> // Centered content
        ),
    },
];


