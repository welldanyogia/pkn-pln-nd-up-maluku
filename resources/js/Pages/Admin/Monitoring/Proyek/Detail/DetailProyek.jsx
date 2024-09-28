import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout.jsx";
import {Card, CardContent, CardHeader} from "@/Components/ui/card.jsx";
import {Badge} from "@/Components/ui/badge.jsx";
import {Button} from "@/Components/ui/button.jsx";
import Table from "@/Components/Table/Proyek/DetailProyek/AlatKerja/Table.jsx";
import {useState} from "react";
import TableTK from "@/Components/Table/Proyek/DetailProyek/TenagaKerja/TableTK.jsx";

export default function DetailProyek({auth, project, countKeterangan}) {
    const [selectedValue, setSelectedValue] = useState("alat-kerja");
    const handleChange = (value) => {
        setSelectedValue(value);
    };

    const capitalizeRole = (str) => {
        return str.split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    };

    return (
        <AuthenticatedAdmin
            user={auth.user}
            title="Detail Proyek"
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detail Proyek</h2>}
        >
            <Head title="Dashboard"/>

            <div className="py-12 space-y-6">
                {/*<div*/}
                {/*    className="max-w-7xl mx-auto sm:px-6 lg:px-8 gap-6 grid">*/}
                        <Card className={"bg-fountain-blue-400 shadow drop-shadow-lg max-w-7xl"}>
                            <CardHeader className={"text-white text-3xl max-sm:text-lg font-bold"}>
                                {capitalizeRole(project.nama_pekerjaan)}
                            </CardHeader>
                        </Card>


                        <Card className={"shadow drop-shadow-lg max-w-7xl"}>
                            <CardContent className={"grid grid-rows-6 grid-flow-col gap-4 px-10 py-6 max-sm:text-xs"}>
                                {/*<div*/}
                                {/*    className={"col-span-5 grid grid-rows-3 grid-flow-col gap-4 max-sm:flex max-sm:flex-col"}>*/}

                                {/*</div>*/}
                                <div className={"grid"}>
                                    <div className={""}>Kategori</div>
                                    <div className={"font-bold"}>{capitalizeRole(project.category.label)}</div>
                                </div>
                                <div className={"grid"}>
                                    <div className={""}>Nama Proyek</div>
                                    <div className={"font-bold"}>{capitalizeRole(project.nama_pekerjaan)}</div>
                                </div>
                                <div className={"grid"}>
                                    <div className={""}>Jumlah Tenaga Kerja</div>
                                    <div
                                        className={"font-bold"}>{project.jumlah_tenaga_kerja_sesuai_kontrak_fix_cost} Pekerja
                                    </div>
                                </div>
                                <div className={"grid"}>
                                    <div className={""}>Realisasi di Lapangan</div>
                                    <div
                                        className={"font-bold"}>{project.realisasi_di_lapangan} Pekerja
                                    </div>
                                </div>
                                <div className={"grid"}>
                                    <div className={""}>Jenis Kontrak</div>
                                    <div
                                        className={"font-bold"}>{project.jenis_kontrak ? capitalizeRole(project.jenis_kontrak) : "-"}
                                    </div>
                                </div>
                                <div className={"grid"}>
                                    <div className={""}>Nilai Kontrak (Inc PPN)</div>
                                    <div className={"font-bold"}>
                                        {project.nilai_kontrak_inc_ppn
                                            ? new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR',
                                            }).format(project.nilai_kontrak_inc_ppn)
                                            : new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR',
                                            }).format("-")
                                        }
                                    </div>
                                </div>
                                <div className={"grid"}>
                                    <div className={""}>Kondisi Alat Kerja</div>
                                    <div
                                        className={"font-bold flex gap-2 max-sm:text-xs"}>
                                        <Badge className={"bg-green-600"}>{countKeterangan['Normal']} Normal</Badge>
                                        <Badge className={"bg-amber-500"}>{countKeterangan['Kritis']} Kritis</Badge>
                                        <Badge className={"bg-red-600"}>{countKeterangan['Kronis']} Kronis</Badge>
                                    </div>
                                </div>
                                <div className={"grid"}>
                                    <div className={""}>Tanggal Efektif Kontrak</div>
                                    <div className={"font-bold"}>
                                        {project.tanggal_efektif_kontrak
                                            ? new Date(project.tanggal_efektif_kontrak).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'long',  // Menggunakan 'long' untuk nama bulan
                                                year: 'numeric',
                                            })
                                            : "-"
                                        }
                                    </div>
                                </div>
                                <div className={"grid"}>
                                    <div className={""}>Tanggal Akhir Kontrak</div>
                                    <div className={"font-bold"}>
                                        {project.akhir_kontrak
                                            ? new Date(project.akhir_kontrak).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'long',  // Menggunakan 'long' untuk nama bulan
                                                year: 'numeric',
                                            })
                                            : "-"
                                        }
                                    </div>
                                </div>
                                <div className={"grid"}>
                                    <div className={""}>Jangka Waktu(Bulan)</div>
                                    <div
                                        className={"font-bold"}>{project.jangka_waktu_bulan ? project.jangka_waktu_bulan : "-"} Bulan
                                    </div>
                                </div>
                                <div className={"grid"}>
                                    <div className={""}>Sisa Jangka Waktu Kontrak(Bulan)</div>
                                    <div
                                        className={"font-bold"}>{project.status_sisa_jangka_waktu_kontrak_bulan ? project.status_sisa_jangka_waktu_kontrak_bulan : "-"} Bulan
                                    </div>
                                </div>
                            </CardContent>
                        </Card>


                        <Card className="flex pt-4 shadow drop-shadow-lg max-w-7xl">
                            <CardContent className="flex space-x-4">
                                <Button
                                    onClick={() => handleChange("alat-kerja")}
                                    className={`w-fit hover:text-white ${selectedValue === "alat-kerja" ? 'bg-fountain-blue-400 text-white' : 'bg-gray-200 text-black'}`}
                                >
                                    Alat Kerja
                                </Button>
                                <Button
                                    onClick={() => handleChange("tenaga-kerja")}
                                    className={`w-fit hover:text-white ${selectedValue === "tenaga-kerja" ? 'bg-fountain-blue-400 text-white' : 'bg-gray-200 text-black'}`}
                                >
                                    Tenaga Kerja
                                </Button>
                            </CardContent>
                        </Card>

                    {
                        selectedValue === "alat-kerja" ? (
                            <Card className={"shadow drop-shadow-lg max-w-7xl"}>
                                <CardHeader className={"rounded-t-lg bg-fountain-blue-400 text-white font-bold"}>
                                    Alat Kerja {capitalizeRole(project.nama_pekerjaan)}
                                </CardHeader>
                                <CardContent>
                                    <Table data={project.alat_kerjas} project={project}/>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className={"shadow drop-shadow-lg max-w-7xl"}>
                                <CardHeader className={"rounded-t-lg bg-fountain-blue-400 text-white font-bold"}>
                                    Tenaga Kerja {capitalizeRole(project.nama_pekerjaan)}
                                </CardHeader>
                                <CardContent>
                                    {/* Display Tenaga Kerja content here */}
                                    <TableTK data={project.employees}/>
                                </CardContent>
                            </Card>
                        )
                    }
                </div>
            {/*</div>*/}
        </AuthenticatedAdmin>
    );
}
