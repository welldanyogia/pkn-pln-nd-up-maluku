import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CategoryComboBox } from "@/Components/Table/Proyek/CategoryComboBox.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import {router} from "@inertiajs/react";


export function TambahProyekDialog() {
    const [category, setCategory] = useState([]);
    const [formData, setFormData] = useState({
        nama_pekerjaan: '',
        category_id: '',
        tanggal_efektif_kontrak: '',
        jenis_kontrak: '',
        jangka_waktu_bulan: '',
        jumlah_tenaga_kerja_sesuai_kontrak_fix_cost: '',
        realisasi_di_lapangan: '',
        nilai_kontrak_inc_ppn: '',
        akhir_kontrak: '',
        status_sisa_jangka_waktu_kontrak_bulan: '',
        keterangan: ''
    });
    const [loading, setLoading] = useState(false); // Loading state
    const [open, setOpen] = useState(false); // Dialog open state

    const fetchCategories = async () => {
        const response = await axios.post('/admin/monitoring/proyek/getCategory');
        setCategory(response.data);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
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

    // Fungsi untuk menghitung akhir kontrak dan sisa waktu
    const calculateContractDates = () => {
        const { tanggal_efektif_kontrak, jangka_waktu_bulan, akhir_kontrak: manualEndDate } = formData;

        // Jika ada tanggal efektif dan jangka waktu bulan, hitung akhir kontrak berdasarkan itu
        let endDate;
        if (tanggal_efektif_kontrak && jangka_waktu_bulan) {
            const effectiveDate = new Date(tanggal_efektif_kontrak);
            const months = parseInt(jangka_waktu_bulan, 10);

            // Hitung akhir kontrak berdasarkan tanggal efektif + jangka waktu (bulan)
            endDate = new Date(effectiveDate);
            endDate.setMonth(effectiveDate.getMonth() + months);
        }

        // Jika akhir kontrak diubah manual, gunakan akhir kontrak manual sebagai prioritas
        if (manualEndDate) {
            endDate = new Date(manualEndDate);

            // Jika tanggal efektif ada, hitung ulang jangka waktu
            if (tanggal_efektif_kontrak) {
                const effectiveDate = new Date(tanggal_efektif_kontrak);

                // Hitung selisih waktu antara tanggal efektif dan akhir kontrak manual
                const diffTime = endDate - effectiveDate;
                const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Total selisih hari

                // Hitung jangka waktu baru dalam bulan dan hari
                const newJangkaWaktuBulan = Math.floor(totalDays / 30);
                const newJangkaWaktuHari = totalDays % 30;

                // Update jangka waktu di formData
                setFormData((prevData) => ({
                    ...prevData,
                    jangka_waktu_bulan: newJangkaWaktuBulan, // Update jangka waktu dalam bulan
                    jangka_waktu_hari: newJangkaWaktuHari, // Tambahkan jangka waktu hari jika perlu
                }));
            }
        }

        if (endDate) {
            const currentDate = new Date();
            const effectiveDate = new Date(tanggal_efektif_kontrak);

            // Format akhir kontrak ke 'YYYY-MM-DD'
            const formattedEndDate = endDate.toISOString().split('T')[0];

            // Hitung sisa waktu
            let sisaWaktuBulan = 0;
            let sisaWaktuHari = 0;

            if (effectiveDate <= currentDate) {
                // Tanggal efektif sudah dimulai, hitung dari tanggal sekarang hingga akhir kontrak
                const diffTime = endDate - currentDate;
                const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Total selisih hari

                // Hitung jumlah bulan dan hari yang tersisa
                sisaWaktuBulan = Math.floor(totalDays / 30);
                sisaWaktuHari = totalDays % 30;
            } else {
                // Tanggal efektif belum dimulai, hitung dari tanggal efektif hingga akhir kontrak
                const diffTime = endDate - effectiveDate;
                const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Total selisih hari

                // Hitung jumlah bulan dan hari yang tersisa
                sisaWaktuBulan = Math.floor(totalDays / 30);
                sisaWaktuHari = totalDays % 30;
            }

            // Update formData dengan akhir kontrak, jangka waktu, dan sisa waktu
            setFormData((prevData) => ({
                ...prevData,
                akhir_kontrak: formattedEndDate,
                status_sisa_jangka_waktu_kontrak_bulan: `${sisaWaktuBulan} bulan ${sisaWaktuHari} hari`,
            }));
        }
    };





    useEffect(() => {
        calculateContractDates(); // Kalkulasi setiap kali tanggal efektif atau jangka waktu berubah
    }, [formData.tanggal_efektif_kontrak, formData.jangka_waktu_bulan, formData.akhir_kontrak]);

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
            await router.post('/admin/monitoring/proyek/store', projectData, {
                onFinish: () => {
                    setLoading(false); // Stop loading regardless of success or error
                    setOpen(false); // Close the form/modal
                    // Reset the form data to initial state
                    setFormData({
                        nama_pekerjaan: '',
                        category_id: '',
                        tanggal_efektif_kontrak: '',
                        jenis_kontrak: '',
                        jangka_waktu_bulan: '',
                        jumlah_tenaga_kerja_sesuai_kontrak_fix_cost: '',
                        realisasi_di_lapangan: '',
                        nilai_kontrak_inc_ppn: '',
                        akhir_kontrak: '',
                        status_sisa_jangka_waktu_kontrak_bulan: '',
                        keterangan: ''
                    });
                },
            });
            console.log('Project added successfully');
        } catch (error) {
            console.error('Error adding project:', error.response?.data || error.message);
        }
    };




    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className={"bg-fountain-blue-400 text-white rounded-xl"}>Tambah Proyek</Button>
            </DialogTrigger>
            <DialogContent className="mx-auto max-sm:max-w-[425px] text-fountain-blue-400">
                <DialogHeader>
                    <DialogTitle className={"text-fountain-blue-400"}>Tambah Proyek</DialogTitle>
                    <DialogDescription>
                        Isi formulir di bawah ini untuk menambahkan proyek baru. Klik simpan setelah selesai.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="nama_pekerjaan" className="text-right">Nama Pekerjaan</Label>
                            <Input
                                id="nama_pekerjaan"
                                name="nama_pekerjaan"
                                value={formData.nama_pekerjaan}
                                onChange={handleChange}
                                required={true}
                                className="col-span-3 text-neutral-600"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">Kategori</Label>
                            <CategoryComboBox
                                category={category}
                                required={true}
                                setCategory={handleCategoryChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="tanggal_efektif_kontrak" className="text-right">Tanggal Efektif</Label>
                            <Input
                                id="tanggal_efektif_kontrak"
                                name="tanggal_efektif_kontrak"
                                type="date"
                                required={true}
                                value={formData.tanggal_efektif_kontrak}
                                onChange={handleChange}
                                className="col-span-3 text-neutral-600 w-fit"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="jenis_kontrak" className="text-right">Jenis Kontrak</Label>
                            <Input
                                id="jenis_kontrak"
                                name="jenis_kontrak"
                                required={true}
                                value={formData.jenis_kontrak}
                                onChange={handleChange}
                                className="col-span-3 text-neutral-600"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="jangka_waktu_bulan" className="text-right">Jangka Waktu (Bulan)</Label>
                            <Input
                                id="jangka_waktu_bulan"
                                name="jangka_waktu_bulan"
                                type="number"
                                required={true}
                                value={formData.jangka_waktu_bulan}
                                onChange={handleChange}
                                className="col-span-3 text-neutral-600"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="nilai_kontrak_inc_ppn" className="text-right">Nilai Kontrak (Inc PPN)</Label>
                            <Input
                                id="nilai_kontrak_inc_ppn"
                                name="nilai_kontrak_inc_ppn"
                                type="number"
                                required={true}
                                value={formData.nilai_kontrak_inc_ppn}
                                onChange={handleChange}
                                className="col-span-3 text-neutral-600"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="jumlah_tenaga_kerja_sesuai_kontrak_fix_cost" className="text-right">Jumlah
                                Tenaga Kerja</Label>
                            <Input
                                id="jumlah_tenaga_kerja_sesuai_kontrak_fix_cost"
                                name="jumlah_tenaga_kerja_sesuai_kontrak_fix_cost"
                                type="number"
                                required={true}
                                value={formData.jumlah_tenaga_kerja_sesuai_kontrak_fix_cost}
                                onChange={handleChange}
                                className="col-span-3 text-neutral-600"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="realisasi_di_lapangan" className="text-right">Realisasi Lapangan</Label>
                            <Input
                                id="realisasi_di_lapangan"
                                name="realisasi_di_lapangan"
                                type="number"
                                required={true}
                                value={formData.realisasi_di_lapangan}
                                onChange={handleChange}
                                className="col-span-3 text-neutral-600"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="akhir_kontrak" className="text-right">Akhir Kontrak</Label>
                            <Input
                                id="akhir_kontrak"
                                name="akhir_kontrak"
                                type="date"
                                required={true}
                                value={formData.akhir_kontrak}
                                onChange={handleChange}
                                className="col-span-3 text-neutral-600 w-fit"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status_sisa_jangka_waktu_kontrak_bulan" className="text-right">Status Sisa
                                Waktu</Label>
                            <Input
                                id="status_sisa_jangka_waktu_kontrak_bulan"
                                name="status_sisa_jangka_waktu_kontrak_bulan"
                                required={true}
                                readOnly
                                value={formData.status_sisa_jangka_waktu_kontrak_bulan}
                                onChange={handleChange}
                                className="col-span-3 text-neutral-600"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="keterangan" className="text-right">Keterangan</Label>
                            <Input
                                id="keterangan"
                                name="keterangan"
                                value={formData.keterangan}
                                onChange={handleChange}
                                className="col-span-3 text-neutral-600"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className={"bg-fountain-blue-400"} disabled={loading}>
                            {loading ? "Menambahkan..." : "Tambah"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
