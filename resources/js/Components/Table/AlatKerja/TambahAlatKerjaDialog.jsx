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
import {ProjectComboBox} from "@/Components/Table/AlatKerja/ProjectComboBox.jsx";
import {useState} from "react";
import {router} from "@inertiajs/react";

export function TambahAlatKerjaDialog({projects}) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        nama_alat: '',
        project_id: '',
        project_name: '',
        category: '',
        tgl_kontrak: '',
        masa_pakai: '',
        masa_pakai_saat_ini: '',
        sisa_masa_pakai: '',
        keterangan: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleProjectChange = (selectedProjectId) => {
        setFormData((prevData) => ({
            ...prevData,
            project_id: selectedProjectId,
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
        console.log("form data:", formData);

        setLoading(true);

        try {
            await router.post(`/admin/monitoring/alat-kerja/store`, formData, {
                onFinish: () => {
                    setLoading(false);
                    setOpen(false);
                },
            });
            console.log('Data alat kerja berhasil ditambahkan');
        } catch (error) {
            console.error('Error adding tool:', error.response?.data || error.message);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className={"bg-fountain-blue-400 text-white rounded-xl"}>Tambah Alat Kerja</Button>
            </DialogTrigger>
            <DialogContent className="mx-auto max-sm:max-w-[425px] text-fountain-blue-400">
                <DialogHeader>
                    <DialogTitle className={"text-fountain-blue-400"}>Tambah Alat Kerja</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
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
                                   value={formData?.masa_pakai_saat_ini || ""}
                                   onChange={handleInputChange}
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
                <DialogFooter>
                    <Button type="submit" className={"bg-fountain-blue-400"} disabled={loading}>
                        {loading ? "Menambahkan..." : "Tambah"}
                    </Button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
