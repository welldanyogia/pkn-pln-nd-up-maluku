import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout.jsx";
import {Card, CardContent, CardHeader} from "@/Components/ui/card.jsx";
import {Bookmark, BookmarkCheck, SquareChartGantt} from 'lucide-react';
import {useEffect, useState} from "react";
import {getData} from "@/Components/Table/Proyek/Data.js";
import Table from "@/Components/Table/Proyek/Table.jsx";
import {SuccessAlert} from "@/Components/SuccessAlert.jsx";
import {ErrorAlert} from "@/Components/ErrorAlert.jsx";


function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Intl.DateTimeFormat('id-ID', options).format(new Date(dateString));
}

export default function Dashboard({ auth,projects,projects_by_category,category,flash }) {
    const formattedProjects = projects.map(project => ({
        ...project,
        tanggal_efektif_kontrak: formatDate(project.tanggal_efektif_kontrak),
        akhir_kontrak: formatDate(project.akhir_kontrak),
        created_at: formatDate(project.created_at),
        updated_at: formatDate(project.updated_at),
    }));
    // const [data, setData] = useState([]);
    // const [categoryCounts, setCategoryCounts] = useState({});
    //
    // useEffect(() => {
    //     async function fetchData() {
    //         const fetchedData = await getData(); // Ensure you have the getData function imported or available
    //         setData(fetchedData);
    //
    //         // Process the data to count items per category
    //         const counts = fetchedData.reduce((acc, item) => {
    //             acc[item.category] = (acc[item.category] || 0) + 1;
    //             return acc;
    //         }, {});
    //         setCategoryCounts(counts);
    //     }
    //     fetchData();
    // }, []);
    const [showSuccess, setShowSuccess] = useState(!!flash.success);
    const [showError, setShowError] = useState(!!flash.error);

    useEffect(() => {
        if (flash.success) {
            const timer = setTimeout(() => setShowSuccess(false), 8000);
            return () => clearTimeout(timer);
        }
        if (flash.error) {
            const timer = setTimeout(() => setShowError(false), 8000);
            return () => clearTimeout(timer);
        }
    }, [flash.success, flash.error]);
    return (
        <AuthenticatedAdmin
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                {showSuccess && (
                    <div className="absolute top-4 right-4">
                        <SuccessAlert title={"Berhasil"} message={flash.success} />
                    </div>
                )}
                {showError && (
                    <div className="absolute top-4 right-4">
                        <ErrorAlert title={"Gagal"} message={flash.error} />
                    </div>
                )}

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card className={"shadow drop-shadow-lg mx-auto"}>
                        <CardHeader
                            className={"text-fountain-blue-400 text-3xl font-bold border-b-2 border-fountain-blue-400"}>Total
                            Proyek</CardHeader>
                        <CardContent className={"grid grid-cols-6 mx-auto mt-4"}>
                            <SquareChartGantt size={100}
                                              className={"text-fountain-blue-400 mx-auto col-span-1 max-sm:hidden"}/>
                            <div
                                className={"col-span-5 grid grid-rows-3 grid-flow-col gap-4 max-sm:flex max-sm:flex-col"}>

                                {projects_by_category.map(({ id, label, count }) => (
                                    <div key={id} className="mb-2 flex gap-1 text-fountain-blue-400">
                                        <BookmarkCheck/>
                                        <span>{count} {label}</span>
                                    </div>
                                ))}


                            </div>
                        </CardContent>
                    </Card>
                    <Table data={formattedProjects} category={category}/>
                </div>
            </div>
        </AuthenticatedAdmin>
    );
}
