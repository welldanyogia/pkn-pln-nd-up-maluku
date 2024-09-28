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

export function TambahAlatKerjaDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className={"bg-fountain-blue-400 text-white rounded-xl"}>Tambah Tenaga Kerja</Button>
            </DialogTrigger>
            <DialogContent className="mx-auto max-sm:max-w-[425px] text-fountain-blue-400">
                <DialogHeader>
                    <DialogTitle className={"text-fountain-blue-400"}>Tambah Tenaga Kerja</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nama_pekerjaan" className="text-right">
                            Nama Pekerjaan
                        </Label>
                        <Input id="nama_pekerjaan" className="col-span-3 text-neutral-600"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">
                            Kategori
                        </Label>
                        <Input id="category" className="col-span-3 text-neutral-600"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="tanggal_efektif_kontrak" className="text-right">
                            Tanggal Efektif
                        </Label>
                        <Input id="tanggal_efektif_kontrak" type={"date"}
                               className="col-span-3 text-neutral-600 w-fit"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="jenis_kontrak" className="text-right">
                            Jenis Kontrak
                        </Label>
                        <Input id="jenis_kontrak" className="col-span-3 text-neutral-600"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="jangka_waktu_bulan" className="text-right">
                            Jangka Waktu (Bulan)
                        </Label>
                        <Input id="jangka_waktu_bulan" type={"number"} className="col-span-3 text-neutral-600"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="jumlah_tenaga_kerja_sesuai_kontrak_fix_cost" className="text-right">
                            Jumlah Tenaga Kerja Sesuai Kontrak (Fix Cost)
                        </Label>
                        <Input id="jumlah_tenaga_kerja_sesuai_kontrak_fix_cost" type={"number"}
                               className="col-span-3 text-neutral-600"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="realisasi_di_lapangan" className="text-right">
                            Realisasi di Lapangan
                        </Label>
                        <Input id="realisasi_di_lapangan" type={"number"}
                               className="col-span-3 text-neutral-600"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="akhir_kontrak" className="text-right">
                            Akhir Kontrak
                        </Label>
                        <Input id="akhir_kontrak" type={"date"}
                               className="col-span-3 text-neutral-600 w-fit"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status_sisa_jangka_waktu_kontrak_bulan" className="text-right">
                            Status Sisa Jangka Waktu Kontrak Bulan
                        </Label>
                        <Input id="status_sisa_jangka_waktu_kontrak_bulan" type={"number"}
                               className="col-span-3 text-neutral-600"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="keterangan" className="text-right">
                            Keterangan
                        </Label>
                        <Input id="keterangan"
                               className="col-span-3 text-neutral-600"/>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className={"bg-fountain-blue-400"}>Tambah</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
