import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout.jsx";
import Table from "@/Components/Table/TenagaKerja/Table.jsx";
import TableTK from "@/Components/Table/Proyek/DetailProyek/TenagaKerja/TableTK.jsx";
import {Image} from "lucide-react";
import {Card, CardContent} from "@/Components/ui/card.jsx";

export default function Dashboard({auth, employees, projects}) {
    console.log(employees)
    return (
        <AuthenticatedAdmin
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard"/>

            {/*<img src={"/bg-tenagakerja.png"} className={"w-full"} alt={"bg-tenagakerja"}/>*/}
            <div className="py-12">
                <Card className={`bg-[url('/bg-tenagakerja.png')] w-full h-96 bg-cover `}>
                    <CardContent className={'grid h-full gap-2 text-white capitalize text-4xl font-extrabold content-center max-sm:text-2xl mt-14'}>
                        <div>
                            Sistem Monitoring Tenaga Kerja
                        </div>
                        <div>
                            PT PLN NUSA DAYA UP MALUKU
                        </div>
                    </CardContent>
                </Card>
                <div className="max-w-7xl mx-auto -mt-28 sm:px-6 lg:px-8">
                    <TableTK data={employees} projects={projects}/>
                </div>
            </div>
        </AuthenticatedAdmin>
    );
}
