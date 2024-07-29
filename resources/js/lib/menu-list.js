import {
    Tag,
    Users,
    Settings,
    Bookmark,
    SquarePen,
    LayoutGrid,
    LineChartIcon,
    BoxesIcon, Monitor
} from 'lucide-react';

export function getMenuList(pathname) {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/admin/dashboard",
                    label: "Dashboard",
                    active: pathname === "/admin/dashboard",
                    icon: LayoutGrid,
                    submenus: []
                }
            ]
        },
        // {
        //     groupLabel: "Transaction",
        //     menus: [
        //         {
        //             href: "/dashboard/transactions",
        //             label: "Transactions",
        //             active: pathname.includes("/transactions"),
        //             icon: LineChartIcon,
        //             submenus: []
        //         },
        //     ]
        // },
        {
            groupLabel: "Monitoring",
            menus: [
                {
                    href: "",
                    label: "Monitoring",
                    active: pathname.includes("/admin/dashboard/proyek") || pathname.includes('/admin/dashboard/alat-kerja') || pathname.includes('/admin/dashboard/tenaga-kerja'),
                    icon: Monitor,
                    submenus: [
                        {
                            href: "/admin/dashboard/proyek",
                            label: "Proyek",
                            active: pathname === "/admin/dashboard/proyek"
                        },
                        {
                            href: "/admin/dashboard/alat-kerja",
                            label: "Alat Kerja",
                            active: pathname === "/admin/dashboard/alat-kerja"
                        },
                        {
                            href: "/admin/dashboard/tenaga-kerja",
                            label: "Tenaga Kerja",
                            active: pathname === "/admin/dashboard/tenaga-kerja"
                        }
                    ]
                },
            ]
        },
        // {
        //     groupLabel: "Configuration",
        //     menus: [
        //         {
        //             href: "",
        //             label: "Configuration",
        //             active: pathname.includes("/digiflazz"),
        //             icon: Settings,
        //             submenus: [
        //                 {
        //                     href: "/dashboard/digiflazz",
        //                     label: "Digiflazz",
        //                     active: pathname === "/dashboard/digiflazz"
        //                 },
        //             ]
        //         }
        //     ]
        // }
    ];
}
