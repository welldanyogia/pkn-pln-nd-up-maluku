import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, router} from '@inertiajs/react';
import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout.jsx";
import {SquareChartGantt, User, Users, Wrench} from 'lucide-react';
import Statistic from "@/Components/Statistic.jsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/Components/ui/card.jsx";
import {StatisticChart} from "@/Components/StatisticChart.jsx";
import Table from "@/Components/Table/Dashboard/Table.jsx";


function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Intl.DateTimeFormat('id-ID', options).format(new Date(dateString));
}
export default function Dashboard({auth,projects, total_project,category,total_tenagakerja}) {
    const formattedProjects = projects.map(project => ({
        ...project,
        tanggal_efektif_kontrak: formatDate(project.tanggal_efektif_kontrak),
        akhir_kontrak: formatDate(project.akhir_kontrak),
        created_at: formatDate(project.created_at),
        updated_at: formatDate(project.updated_at),
    }));
    // console.log(formattedProjects)
    return (
        <AuthenticatedAdmin
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard"/>

            <div className="py-12 space-y-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex gap-4 max-lg:grid">
                    {/*<div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">*/}
                    <div
                        className="w-3/5 grid grid-cols-2 gap-16 max-lg:grid-cols-2 max-lg:w-full max-md:grid-cols-2 max-md:w-full max-sm:grid-cols-1 max-sm:w-full max-sm:gap-6">

                        <Card
                            className="bg-fountain-blue-400 drop-shadow shadow-black/25 cursor-pointer hover:bg-fountain-blue-500"
                            onClick={() => {
                                // navigate('/admin/dashboard/proyek');
                                router.get(route('proyek.index'))
                            }}
                        >
                            <CardContent className="flex items-stretch mx-auto mt-6 gap-5 text-white">
                                <div
                                    className="rounded-full border-2 border-white p-4 drop-shadow shadow-md shadow-black/25">
                                    <SquareChartGantt height={50} width={50} />
                                </div>
                                <div className="grid">
                                    <span className="font-semibold text-xl">Total Proyek</span>
                                    <span className="font-bold text-4xl">{total_project}</span>
                                </div>
                            </CardContent>
                        </Card>


                        {/*<Card className="bg-fountain-blue-400 drop-shadow shadow-black/25">*/}
                        {/*    /!*<CardHeader>*!/*/}
                        {/*    /!*    <CardTitle>Card Title</CardTitle>*!/*/}
                        {/*    /!*    <CardDescription>Card Description</CardDescription>*!/*/}
                        {/*    /!*</CardHeader>*!/*/}
                        {/*    /!*<CardContent className="w-full flex items-stretch mx-auto mt-6 gap-5 text-white">*!/*/}
                        {/*    /!*    <div*!/*/}
                        {/*    /!*        className='rounded-full border-2 border-white p-4 drop-shadow shadow-md shadow-black/25'>*!/*/}
                        {/*    /!*        <Wrench height={50} width={50}/>*!/*/}
                        {/*    /!*    </div>*!/*/}
                        {/*    /!*    <div className="grid">*!/*/}
                        {/*    /!*        <span className="font-semibold text-lg">Total Alat Kerja</span>*!/*/}
                        {/*    /!*        <span className="font-bold text-4xl">100</span>*!/*/}
                        {/*    /!*    </div>*!/*/}
                        {/*    /!*</CardContent>*!/*/}
                        {/*    /!*<CardFooter>*!/*/}
                        {/*    /!*    <p>Card Footer</p>*!/*/}
                        {/*    /!*</CardFooter>*!/*/}
                        {/*</Card>*/}
                        <Card className="bg-fountain-blue-400 drop-shadow shadow-black/25 cursor-pointer hover:bg-fountain-blue-500"
                              onClick={() => {
                                  router.get(route('tenagakerja.index'))
                              }}
                              >
                            {/*<CardHeader>*/}
                            {/*    <CardTitle>Card Title</CardTitle>*/}
                            {/*    <CardDescription>Card Description</CardDescription>*/}
                            {/*</CardHeader>*/}
                            <CardContent className="flex items-stretch mx-auto mt-6 gap-5 text-white">
                                <div
                                    className='rounded-full border-2 border-white p-4 drop-shadow shadow-md shadow-black/25'>
                                    <Users height={50} width={50}/>
                                </div>
                                <div className="grid">
                                    <span className="font-semibold text-md">Total Tenaga Kerja</span>
                                    <span className="font-bold text-4xl">{total_tenagakerja}</span>
                                </div>
                            </CardContent>
                            {/*<CardFooter>*/}
                            {/*    <p>Card Footer</p>*/}
                            {/*</CardFooter>*/}
                        </Card>
                    </div>
                    {/*</div>*/}
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/*<Card>*/}
                    {/*    <CardHeader>*/}
                    {/*        <CardTitle>*/}
                    {/*            Proyek*/}
                    {/*        </CardTitle>*/}
                    {/*        <CardDescription>*/}
                    {/*            Menampilkan data proyek pada PLN Nusa Daya UP Maluku*/}
                    {/*        </CardDescription>*/}
                    {/*    </CardHeader>*/}
                    {/*    <CardContent>*/}
                            <Table data={formattedProjects} category={category}/>
                        {/*</CardContent>*/}
                    {/*    <CardFooter>*/}
                    {/*        Test*/}
                    {/*    </CardFooter>*/}
                    {/*</Card>*/}
                </div>
            </div>
        </AuthenticatedAdmin>
    );
}
