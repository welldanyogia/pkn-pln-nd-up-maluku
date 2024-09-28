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
import { ProjectComboBox } from "@/Components/Table/AlatKerja/ProjectComboBox.jsx";
import { useState } from "react";
import { useForm } from "@inertiajs/react"; // Import Inertia useForm

export function TambahTenagaKerjaDialog({ projects }) {
    const [open, setOpen] = useState(false); // State untuk mengatur buka/tutup dialog
    const { data, setData, post, reset, errors } = useForm({
        nama: "",
        jabatan: "",
        nip: "",
        tempat_lahir: "",
        tgl_lahir: "",
        project_id: "",
        unit_pln: "",
        penempatan: "",
        no_spk: "",
    });

    const handleProjectChange = (projectId) => {
        if (projectId) {
            setData((prevData) => ({
                ...prevData,
                project_id: projectId,
            }));
        }
    };

    // Handler untuk submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("tenagakerja.store"), {
            onSuccess: () => {
                reset(); // Reset form setelah sukses
                setOpen(false); // Tutup dialog setelah pengiriman berhasil
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}> {/* Atur open dan setOpen untuk mengontrol dialog */}
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className={"bg-fountain-blue-400 text-white rounded-xl"}
                    onClick={() => setOpen(true)} // Buka dialog saat tombol di klik
                >
                    Tambah Tenaga Kerja
                </Button>
            </DialogTrigger>
            <DialogContent className="mx-auto max-sm:max-w-[425px] text-fountain-blue-400">
                <DialogHeader>
                    <DialogTitle className={"text-fountain-blue-400"}>Tambah Tenaga Kerja</DialogTitle>
                    <DialogDescription>
                        Isi formulir di bawah ini untuk menambahkan tenaga kerja baru. Klik simpan setelah selesai.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="nama" className="text-right">Nama</Label>
                            <Input
                                id="nama"
                                value={data.nama}
                                onChange={(e) => setData("nama", e.target.value)}
                                className="col-span-3 text-neutral-600"
                            />
                            {errors.nama && <span className="text-red-500 col-span-4 text-xs">{errors.nama}</span>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="jabatan" className="text-right">Jabatan</Label>
                            <Input
                                id="jabatan"
                                value={data.jabatan}
                                onChange={(e) => setData("jabatan", e.target.value)}
                                className="col-span-3 text-neutral-600"
                            />
                            {errors.jabatan && <span className="text-red-500 col-span-4 text-xs">{errors.jabatan}</span>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="nip" className="text-right">NIP</Label>
                            <Input
                                id="nip"
                                value={data.nip}
                                onChange={(e) => setData("nip", e.target.value)}
                                className="col-span-3 text-neutral-600"
                            />
                            {errors.nip && <span className="text-red-500 col-span-4 text-xs">{errors.nip}</span>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="tempat_lahir" className="text-right">Tempat Lahir</Label>
                            <Input
                                id="tempat_lahir"
                                value={data.tempat_lahir}
                                onChange={(e) => setData("tempat_lahir", e.target.value)}
                                className="col-span-3 text-neutral-600"
                            />
                            {errors.tempat_lahir && <span className="text-red-500 col-span-4 text-xs">{errors.tempat_lahir}</span>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="tgl_lahir" className="text-right">Tanggal Lahir</Label>
                            <Input
                                id="tgl_lahir"
                                type="date"
                                value={data.tgl_lahir}
                                onChange={(e) => setData("tgl_lahir", e.target.value)}
                                className="col-span-3 w-fit text-neutral-600"
                            />
                            {errors.tgl_lahir && <span className="text-red-500 col-span-4 text-xs">{errors.tgl_lahir}</span>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="project" className="text-right">Proyek</Label>
                            <ProjectComboBox
                                projects={projects}
                                onProjectChange={handleProjectChange}
                            />
                            {errors.project_id && <span className="text-red-500 col-span-4 text-xs">{errors.project_id}</span>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="unit_pln" className="text-right">Unit PLN</Label>
                            <Input
                                id="unit_pln"
                                value={data.unit_pln}
                                onChange={(e) => setData("unit_pln", e.target.value)}
                                className="col-span-3 text-neutral-600"
                            />
                            {errors.unit_pln && <span className="text-red-500 col-span-4 text-xs">{errors.unit_pln}</span>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="penempatan" className="text-right">Penempatan</Label>
                            <Input
                                id="penempatan"
                                value={data.penempatan}
                                onChange={(e) => setData("penempatan", e.target.value)}
                                className="col-span-3 text-neutral-600"
                            />
                            {errors.penempatan && <span className="text-red-500 col-span-4 text-xs">{errors.penempatan}</span>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="no_spk" className="text-right">No SPK</Label>
                            <Input
                                id="no_spk"
                                value={data.no_spk}
                                onChange={(e) => setData("no_spk", e.target.value)}
                                className="col-span-3 text-neutral-600"
                            />
                            {errors.no_spk && <span className="text-red-500 col-span-4 text-xs">{errors.no_spk}</span>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="bg-fountain-blue-400">Tambah</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
