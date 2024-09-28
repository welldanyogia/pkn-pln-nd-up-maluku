import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout.jsx";
import Table from "@/Components/Table/AlatKerja/Table.jsx";
import {Card, CardContent} from "@/Components/ui/card.jsx";
import {Wrench} from "lucide-react";

export default function Dashboard({auth, tools, projects, countKeterangan}) {
    return (
        <AuthenticatedAdmin
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className={"max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-4"}>
                        {/* Kartu untuk Normal */}
                        <Card className={"bg-fountain-blue-400 text-white font-bold h-fit"}>
                            <CardContent className={"text-center flex items-center gap-6"}>
                                <div className={"mx-auto flex gap-6 items-center mt-4"}>
                                    <div className={"border-4 border-green-600 rounded-full p-2"}>
                                        <Wrench className={"text-green-600"} width={50} height={50}/>
                                    </div>
                                    <div className={"flex items-center gap-6"}>
                                        <h3 className="text-lg font-bold">Normal</h3>
                                        <p className="text-2xl">{countKeterangan.Normal}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Kartu untuk Kritis */}
                        <Card className={"bg-fountain-blue-400 text-white font-bold h-fit"}>
                            <CardContent className={"text-center flex items-center gap-6"}>
                                <div className={"mx-auto flex gap-6 items-center mt-4"}>
                                    <div className={"border-4 border-yellow-600 rounded-full p-2"}>
                                        <Wrench className={"text-yellow-600"} width={50} height={50}/>
                                    </div>
                                    <div className={"flex items-center gap-6"}>
                                        <h3 className="text-lg font-bold">Kritis</h3>
                                        <p className="text-2xl">{countKeterangan.Kritis}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Kartu untuk Kronis */}
                        <Card className={"bg-fountain-blue-400 text-white font-bold h-fit"}>
                            <CardContent className={"text-center flex items-center gap-6"}>
                                <div className={"mx-auto flex gap-6 items-center mt-4"}>
                                    <div className={"border-4 border-red-600 rounded-full p-2"}>
                                        <Wrench className={"text-red-600"} width={50} height={50}/>
                                    </div>
                                    <div className={"flex items-center gap-6"}>
                                        <h3 className="text-lg font-bold">Kronis</h3>
                                        <p className="text-2xl">{countKeterangan.Kronis}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <Table data={tools} projects={projects}/>
                </div>
            </div>
        </AuthenticatedAdmin>
    );
}
