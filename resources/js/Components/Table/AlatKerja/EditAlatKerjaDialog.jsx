import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useEffect, useState} from "react";
import {router, useForm} from "@inertiajs/react";
import {CategoryComboBox} from "@/Components/Table/Proyek/CategoryComboBox.jsx";
import {ProjectComboBox} from "@/Components/Table/AlatKerja/ProjectComboBox.jsx";

export function EditAlatKerjaDialog({data,projects}) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState([]);
    const [formData, setFormData] = useState({
        nama_alat: data.nama_alat,
        project_id: data.project_id,
        project_name: data.project.nama_pekerjaan,
        category: data.category,
        tgl_kontrak: data.tgl_kontrak,
        masa_pakai: data.masa_pakai,
        masa_pakai_saat_ini: data.masa_pakai_saat_ini,
        sisa_masa_pakai: data.sisa_masa_pakai,
        keterangan: data.keterangan,
    });

    // const fetchCategories = async () => {
    //     const response = await axios.post('/admin/monitoring/proyek/getCategory');
    //     setCategory(response.data);
    // };
    //
    // useEffect(() => {
    //     fetchCategories();
    // }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleProjectChange = (projects) => {
        if (projects && projects.id) {
            setFormData((prevData) => ({
                ...prevData,
                project_id: projects.id,
            }));
        }
    };

    // const calculateContractDates = () => {
    //     const { tgl_kontrak, masa_pakai_saat_ini, akhir_kontrak: manualEndDate } = formData;
    //
    //     const effectiveDateString = convertDateFormat(tgl_kontrak);
    //     const manualEndDateString = manualEndDate ? convertDateFormat(manualEndDate) : null;
    //
    //     const effectiveDate = new Date(effectiveDateString);
    //     if (isNaN(effectiveDate)) return;
    //
    //     let endDate;
    //     if (masa_pakai_saat_ini) {
    //         const months = parseInt(masa_pakai_saat_ini, 10);
    //         endDate = new Date(effectiveDate);
    //         endDate.setMonth(effectiveDate.getMonth() + months);
    //     }
    //
    //     if (manualEndDateString) {
    //         const manualDate = new Date(manualEndDateString);
    //         if (!isNaN(manualDate)) {
    //             endDate = manualDate;
    //         }
    //     }
    //
    //     if (endDate && !isNaN(endDate)) {
    //         const formattedEndDate = endDate.toISOString().split("T")[0];
    //         const currentDate = new Date();
    //
    //         let sisaWaktuBulan = 0;
    //         let sisaWaktuHari = 0;
    //
    //         if (effectiveDate <= currentDate) {
    //             const diffTime = endDate - currentDate;
    //             const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    //             sisaWaktuBulan = Math.floor(totalDays / 30);
    //             sisaWaktuHari = totalDays % 30;
    //         } else {
    //             const diffTime = endDate - effectiveDate;
    //             const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    //             sisaWaktuBulan = Math.floor(totalDays / 30);
    //             sisaWaktuHari = totalDays % 30;
    //         }
    //
    //         setformData((prevData) => ({
    //             ...prevData,
    //             akhir_kontrak: formattedEndDate,
    //             status_sisa_jangka_waktu_kontrak_bulan: `${sisaWaktuBulan} bulan ${sisaWaktuHari} hari`,
    //         }));
    //     }
    // };
    //
    //
    //
    //
    //
    //
    // useEffect(() => {
    //     const previousStatus = formData.status_sisa_jangka_waktu_kontrak_bulan;
    //     calculateContractDates();
    //     if (previousStatus !== formData.status_sisa_jangka_waktu_kontrak_bulan) {
    //         // Logika untuk menangani jika status berubah
    //     }
    // }, [formData.tgl_kontrak, formData.masa_pakai_saat_ini]);



    const convertDateFormat = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return `${year}-${month}-${day}`;
    };

    // Function to handle changes in input fields
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };
    const validateForm = () => {
        const requiredFields = ['nama_alat', 'project_id', 'tgl_kontrak', 'masa_pakai'];
        for (const field of requiredFields) {
            if (!formData[field]) {
                alert(`${field} is required.`);
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        console.log("form data:",formData)

        setLoading(true);

        try {
            await router.post(`/admin/monitoring/alat-kerja/${data.id}`, formData, {
                onFinish: () => {
                    setLoading(false);
                    setOpen(false);
                },
            });
            console.log('Data alat kerja berhasil diperbarui');
        } catch (error) {
            console.error('Error updating project:', error.response?.data || error.message);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline"
                        onClick={()=>{
                            console.log("edit data :",formData)
                        }}
                        className={"bg-fountain-blue-400 text-white rounded-xl"}>Edit</Button>
            </DialogTrigger>
            <DialogContent
                className="mx-auto sm:max-w-[425px] lg:max-w-[800px] text-fountain-blue-400 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className={"text-fountain-blue-400"}>Edit Proyek</DialogTitle>
                    <DialogDescription>
                        Lakukan perubahan pada proyek Anda di sini. Klik simpan setelah selesai.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="nama_alat" className="text-right">
                                Nama Alat
                            </Label>
                            <Input id="nama_alat"
                                   name="nama_alat"
                                   value={formData?.nama_alat || ""}
                                   onChange={handleChange}
                                   className="col-span-3 text-neutral-600"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="project_name" className="text-right">
                                Proyek
                            </Label>
                            <ProjectComboBox
                                projects={projects}
                                project_id={formData.project_id}
                                onProjectChange={handleProjectChange}
                                />
                            {/*<Input id="project_name"*/}
                            {/*       name="project_name"*/}
                            {/*       value={formData?.project_name || ""}*/}
                            {/*       onChange={handleInputChange}*/}
                            {/*       className="col-span-3 text-neutral-600"/>*/}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="tgl_kontrak" className="text-right">
                                Tanggal Kontrak
                            </Label>
                            <Input id="tgl_kontrak"
                                   value={formData?.tgl_kontrak ? formData.tgl_kontrak : ""}
                                   onChange={handleInputChange}
                                   type={"date"}
                                   className="col-span-3 text-neutral-600 w-fit"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="masa_pakai" className="text-right">
                                Masa Pakai (Bulan)
                            </Label>
                            <Input id="masa_pakai"
                                   value={formData?.masa_pakai || ""}
                                   onChange={handleInputChange}
                                   className="col-span-3 text-neutral-600"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="masa_pakai_saat_ini"
                                   className="text-right">
                                Masa Pakai Saat Ini (Bulan)
                            </Label>
                            <Input id="masa_pakai_saat_ini"
                                   value={formData?.masa_pakai_saat_ini}
                                   onChange={handleInputChange}
                                   readOnly
                                   type={"number"} className="col-span-3 text-neutral-600"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="sisa_masa_pakai" className="text-right">
                                Sisa Masa Pakai (Bulan)
                            </Label>
                            <Input id="sisa_masa_pakai"
                                   value={formData?.sisa_masa_pakai || ""}
                                   onChange={handleInputChange}
                                   type={"number"}
                                   className="col-span-3 text-neutral-600"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="keterangan" className="text-right">
                                Keterangan
                            </Label>
                            <Input id="keterangan"
                                   readOnly
                                   value={formData?.keterangan || ""}
                                   onChange={handleInputChange}
                                   className="col-span-3 text-neutral-600"/>
                        </div>
                    </div>
                </form>
                    <DialogFooter>
                        <Button type="submit" className={"bg-fountain-blue-400"} onClick={handleSubmit} disabled={loading}>
                            {loading ? "Memperbarui..." : "Simpan Perubahan"}
                        </Button>
                    </DialogFooter>
            </DialogContent>
        </Dialog>
)
}
