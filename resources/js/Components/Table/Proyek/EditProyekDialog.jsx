import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useEffect, useState} from "react";
import {router, useForm} from "@inertiajs/react";
import {CategoryComboBox} from "@/Components/Table/Proyek/CategoryComboBox.jsx";

export function EditProyekDialog({data}) {
    // const convertDateFormat = (dateString) => {
    //     // Pisahkan string berdasarkan tanda "/"
    //     const [day, month, year] = dateString.split('/');
    //
    //     // Susun kembali menjadi format "mm/dd/yyyy"
    //     return `${month}/${day}/${year}`;
    // };
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState([]);
    const [formData, setFormData] = useState({
        nama_pekerjaan: data.nama_pekerjaan,
        category_id: data.category_id,
        category: data.category,
        tanggal_efektif_kontrak: data.tanggal_efektif_kontrak,
        jenis_kontrak: data.jenis_kontrak,
        jangka_waktu_bulan: data.jangka_waktu_bulan,
        jumlah_tenaga_kerja_sesuai_kontrak_fix_cost: data.jumlah_tenaga_kerja_sesuai_kontrak_fix_cost,
        realisasi_di_lapangan: data.realisasi_di_lapangan,
        nilai_kontrak_inc_ppn: data.nilai_kontrak_inc_ppn,
        akhir_kontrak: data.akhir_kontrak,
        status_sisa_jangka_waktu_kontrak_bulan: data.status_sisa_jangka_waktu_kontrak_bulan,
        keterangan: data.keterangan,
    });


    const fetchCategories = async () => {
        const response = await axios.post('/admin/monitoring/proyek/getCategory');
        setCategory(response.data);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCategoryChange = (category) => {
        if (category && category.id) {
            setFormData((prevData) => ({
                ...prevData,
                category_id: category.id,
            }));
        }
    };

    // console.log("data edit :",data)

    // const calculateContractDates = () => {
    //     const { tanggal_efektif_kontrak, jangka_waktu_bulan, akhir_kontrak: manualEndDate } = formData;
    //
    //     const effectiveDateString = convertDateFormat(tanggal_efektif_kontrak);
    //     const manualEndDateString = manualEndDate ? convertDateFormat(manualEndDate) : null;
    //
    //     const effectiveDate = new Date(effectiveDateString);
    //     if (isNaN(effectiveDate)) return;
    //
    //     let endDate;
    //     if (jangka_waktu_bulan) {
    //         const months = parseInt(jangka_waktu_bulan, 10);
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
    // }, [formData.tanggal_efektif_kontrak, formData.jangka_waktu_bulan]);


    const convertDateFormat = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return `${year}-${month}-${day}`;
    };

    const convertDateFormatAkhir = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return `${month}/${day}/${year}`;
    };
    const convertDateFormatSlash = (dateString) => {
        const [day, month, year] = dateString.split('-');
        return `${month}/${day}/${year}`;
    };

    // Function to handle changes in input fields
    const handleInputChange = (e) => {
        const {id, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const projectData = {
            ...formData,
            jangka_waktu_bulan: parseInt(formData.jangka_waktu_bulan, 10),
            jumlah_tenaga_kerja_sesuai_kontrak_fix_cost: parseInt(formData.jumlah_tenaga_kerja_sesuai_kontrak_fix_cost, 10),
            nilai_kontrak_inc_ppn: parseInt(formData.nilai_kontrak_inc_ppn, 10),
            realisasi_di_lapangan: parseInt(formData.realisasi_di_lapangan, 10),
            status_sisa_jangka_waktu_kontrak_bulan: parseInt(formData.status_sisa_jangka_waktu_kontrak_bulan, 10),
        };

        try {
            await router.post(`/admin/monitoring/proyek/${data.id}`, projectData, {
                onFinish: () => {
                    setLoading(false);
                    setOpen(false);
                    // Reset formData to initial state or the updated project data
                    // setFormData({
                    //     nama_pekerjaan: '',
                    //     category_id: '',
                    //     tanggal_efektif_kontrak: '',
                    //     jenis_kontrak: '',
                    //     jangka_waktu_bulan: '',
                    //     jumlah_tenaga_kerja_sesuai_kontrak_fix_cost: '',
                    //     realisasi_di_lapangan: '',
                    //     nilai_kontrak_inc_ppn: '',
                    //     akhir_kontrak: '',
                    //     status_sisa_jangka_waktu_kontrak_bulan: '',
                    //     keterangan: ''
                    // });
                },
            });
            console.log('Project updated successfully');
        } catch (error) {
            console.error('Error updating project:', error.response?.data || error.message);
        }
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline"
                        // onClick={() => {
                        //     console.log("edit data :", formData)
                        // }}
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
                            <Label htmlFor="nama_pekerjaan" className="text-right">
                                Nama Pekerjaan
                            </Label>
                            <Input id="nama_pekerjaan"
                                   name="nama_pekerjaan"
                                   value={formData?.nama_pekerjaan || ""}
                                   onChange={handleChange}
                                   className="col-span-3 text-neutral-600"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                                Kategori
                            </Label>
                            {/*<Input id="category"*/}
                            {/*       name="category"*/}
                            {/*       value={formData?.category.label || ""}*/}
                            {/*       onChange={handleInputChange}*/}
                            {/*       className="col-span-3 text-neutral-600"/>*/}
                            <CategoryComboBox
                                category={category}
                                required={true}
                                valueCat={formData?.category.label || ""}
                                setCategory={handleCategoryChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="tanggal_efektif_kontrak" className="text-right">
                                Tanggal Efektif
                            </Label>
                            <Input id="tanggal_efektif_kontrak"
                                   value={formData?.tanggal_efektif_kontrak ? convertDateFormat(formData.tanggal_efektif_kontrak) : ""}
                                   onChange={handleInputChange}
                                   type={"date"}
                                   className="col-span-3 text-neutral-600 w-fit"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="jenis_kontrak" className="text-right">
                                Jenis Kontrak
                            </Label>
                            <Input id="jenis_kontrak"
                                   value={formData?.jenis_kontrak || ""}
                                   onChange={handleInputChange}
                                   className="col-span-3 text-neutral-600"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="jangka_waktu_bulan"
                                   className="text-right">
                                Jangka Waktu (Bulan)
                            </Label>
                            <Input id="jangka_waktu_bulan"
                                   name="jangka_waktu_bulan"
                                   value={formData?.jangka_waktu_bulan || ""}
                                   onChange={handleChange}
                                   type={"number"} className="col-span-3 text-neutral-600"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="jumlah_tenaga_kerja_sesuai_kontrak_fix_cost" className="text-right">
                                Jumlah Tenaga Kerja Sesuai Kontrak (Fix Cost)
                            </Label>
                            <Input id="jumlah_tenaga_kerja_sesuai_kontrak_fix_cost"
                                   value={formData?.jumlah_tenaga_kerja_sesuai_kontrak_fix_cost || ""}
                                   onChange={handleInputChange}
                                   type={"number"}
                                   className="col-span-3 text-neutral-600"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="realisasi_di_lapangan" className="text-right">
                                Realisasi di Lapangan
                            </Label>
                            <Input id="realisasi_di_lapangan"
                                   value={formData?.realisasi_di_lapangan || ""}
                                   onChange={handleInputChange}
                                   type={"number"}
                                   className="col-span-3 text-neutral-600"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="akhir_kontrak" className="text-right">
                                Akhir Kontrak
                            </Label>
                            <Input id="akhir_kontrak"
                                   value={formData?.akhir_kontrak ? convertDateFormat(formData.akhir_kontrak) : ""}
                                   onChange={handleInputChange}
                                   type={"date"}
                                   className="col-span-3 text-neutral-600 w-fit"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status_sisa_jangka_waktu_kontrak_bulan" className="text-right">
                                Status Sisa Jangka Waktu Kontrak Bulan
                            </Label>
                            <Input id="status_sisa_jangka_waktu_kontrak_bulan"
                                   value={formData?.status_sisa_jangka_waktu_kontrak_bulan || ""}
                                   onChange={handleInputChange}
                                   className="col-span-3 text-neutral-600"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="keterangan" className="text-right">
                                Keterangan
                            </Label>
                            <Input id="keterangan"
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
