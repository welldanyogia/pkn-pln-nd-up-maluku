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
import {ProjectComboBox} from "@/Components/Table/AlatKerja/ProjectComboBox.jsx";

export function EditTenagaKerjaDialog({dataTK,projects}) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { data, setData, post, reset, errors } = useForm({
        nama: dataTK.nama,
        jabatan: dataTK.jabatan,
        nip: dataTK.nip,
        tempat_lahir: dataTK.tempat_lahir,
        tgl_lahir: dataTK.tanggal_lahir,
        project_id: dataTK.project_id,
        unit_pln: dataTK.unit_pln,
        penempatan: dataTK.penempatan,
        no_spk: dataTK.no_spk
    });

    // Handler untuk submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Gunakan method 'put' untuk update
        router.put(`/admin/monitoring/tenagakerja/${dataTK.id}`, data, {
            onSuccess: () => {
                setLoading(false);
                setOpen(false);
                reset();
            },
            onError: () => {
                setLoading(false); // Reset loading jika terjadi kesalahan
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline"
                        className={"bg-fountain-blue-400 text-white rounded-xl"}>Edit</Button>
            </DialogTrigger>
            <DialogContent
                className="mx-auto sm:max-w-[425px] lg:max-w-[800px] text-fountain-blue-400 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className={"text-fountain-blue-400"}>Edit Tenaga Kerja</DialogTitle>
                    <DialogDescription>
                        Lakukan perubahan pada proyek Anda di sini. Klik simpan setelah selesai.
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
                            {errors.nama && <span className="text-red-500">{errors.nama}</span>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="jabatan" className="text-right">Jabatan</Label>
                            <Input
                                id="jabatan"
                                value={data.jabatan}
                                onChange={(e) => setData("jabatan", e.target.value)}
                                className="col-span-3 text-neutral-600"
                            />
                            {errors.jabatan && <span className="text-red-500">{errors.jabatan}</span>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="nip" className="text-right">NIP</Label>
                            <Input
                                id="nip"
                                value={data.nip}
                                onChange={(e) => setData("nip", e.target.value)}
                                className="col-span-3 text-neutral-600"
                            />
                            {errors.nip && <span className="text-red-500">{errors.nip}</span>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="tempat_lahir" className="text-right">Tempat Lahir</Label>
                            <Input
                                id="tempat_lahir"
                                value={data.tempat_lahir}
                                onChange={(e) => setData("tempat_lahir", e.target.value)}
                                className="col-span-3 text-neutral-600"
                            />
                            {errors.tempat_lahir && <span className="text-red-500">{errors.tempat_lahir}</span>}
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
                            {errors.tgl_lahir && <span className="text-red-500">{errors.tgl_lahir}</span>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="project" className="text-right">Proyek</Label>
                            <ProjectComboBox
                                projects={projects}
                                project={dataTK}
                                project_id={dataTK.project_id} // Memastikan ID proyek disimpan di form state
                            />
                            {errors.project_id && <span className="text-red-500">{errors.project_id}</span>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="unit_pln" className="text-right">Unit PLN</Label>
                            <Input
                                id="unit_pln"
                                value={data.unit_pln}
                                onChange={(e) => setData("unit_pln", e.target.value)}
                                className="col-span-3 text-neutral-600"
                            />
                            {errors.unit_pln && <span className="text-red-500">{errors.unit_pln}</span>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="penempatan" className="text-right">Penempatan</Label>
                            <Input
                                id="penempatan"
                                value={data.penempatan}
                                onChange={(e) => setData("penempatan", e.target.value)}
                                className="col-span-3 text-neutral-600"
                            />
                            {errors.penempatan && <span className="text-red-500">{errors.penempatan}</span>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="no_spk" className="text-right">No SPK</Label>
                            <Input
                                id="no_spk"
                                value={data.no_spk}
                                onChange={(e) => setData("no_spk", e.target.value)}
                                className="col-span-3 text-neutral-600"
                            />
                            {errors.no_spk && <span className="text-red-500">{errors.no_spk}</span>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className={"bg-fountain-blue-400"} onClick={handleSubmit}
                                disabled={loading}>
                            {loading ? "Memperbarui..." : "Simpan Perubahan"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
