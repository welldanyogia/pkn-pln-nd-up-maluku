import {Head} from "@inertiajs/react";
import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout.jsx";
import {Card, CardContent, CardHeader} from "@/Components/ui/card.jsx";
import {Badge} from "@/Components/ui/badge.jsx";

export default function DetailAlatKerja({tool, auth}) {
    console.log(tool)
    return (
        <AuthenticatedAdmin
            user={auth.user}
            title="Detail Alat Kerja"
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detail Alat Kerja</h2>}
        >
            <Head title="Detail Alat Kerja"/>
            <div className={'grid gap-6'}>
                <Card className={"bg-fountain-blue-400 text-white font-bold text-2xl"}>
                    <CardContent className={'mt-5'}>
                        Detail {tool.nama_alat}
                    </CardContent>
                </Card>
                <Card>
                    <CardContent
                        className={'grid grid-rows-4 grid-flow-col gap-4 max-sm:gap-3 px-10 py-6 max-sm:text-xs max-sm:grid-cols-2'}>
                        <div className={'grid'}>
                            <div>
                                Proyek
                            </div>
                            <div className={'font-bold'}>
                                {tool.project.nama_pekerjaan}
                            </div>
                        </div>
                        <div className={'grid'}>
                            <div>
                                Nama Alat
                            </div>
                            <div className={'font-bold'}>
                                {tool.nama_alat}
                            </div>
                        </div>
                        <div className={'grid'}>
                            <div>
                                Masa Pakai
                            </div>
                            <div className={'font-bold'}>
                                {tool.masa_pakai} Bulan
                            </div>
                        </div>
                        <div className={'grid'}>
                            <div>
                                Masa Pakai Saat Ini
                            </div>
                            <div className={'font-bold'}>
                                {tool.masa_pakai_saat_ini} Bulan
                            </div>
                        </div>
                        <div className={'grid'}>
                            <div>
                                Sisa Masa Pakai
                            </div>
                            <div className={'font-bold flex gap-2'}>
                                <div>
                                    {tool.sisa_masa_pakai} Bulan
                                </div>
                                <div>
                                    <Badge
                                        variant={'outline'}
                                        className={
                                            tool.keterangan.toLowerCase() === 'normal'
                                                ? 'text-green-600 border-green-600'
                                                : tool.keterangan.toLowerCase() === 'kritis'
                                                    ? 'text-yellow-600 border-yellow-600'
                                                    : 'text-red-600 border-red-600'
                                        }
                                    >
                                        {tool.keterangan}
                                    </Badge>
                                </div>
                            </div>

                        </div>
                        <div className={'grid'}>
                            <div>
                                Tanggal Kontrak
                            </div>
                            <div className={'font-bold'}>
                                {tool.tgl_kontrak}
                            </div>
                        </div>
                        <div className={'grid'}>
                            <div>
                                Tanggal Akhir Kontrak
                            </div>
                            <div className={'font-bold'}>
                                {new Date(tool.tgl_akhir_kontrak).toISOString().split('T')[0]}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedAdmin>
    )
}
