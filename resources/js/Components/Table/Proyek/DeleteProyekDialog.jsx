import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useForm } from '@inertiajs/react'

export function DeleteProyekDialog({ data }) {
    const { delete: destroy, processing } = useForm()

    const capitalizeStr = (str) => {
        return str.split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    };


    const handleDelete = () => {
        console.log("data",data)
        destroy(route('proyek.destroy', data.original.id), {
            preserveScroll: true,
            onSuccess: () => {
                // Anda dapat menambahkan logika khusus di sini jika diperlukan, seperti menampilkan notifikasi toast
            },
            onError: (errors) => {
                console.error(errors)
            },
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" onClick={() => console.log("data:", data.original)}>
                    Hapus
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className={"text-base"}>Apakah anda yakin untuk menghapus proyek <strong>{capitalizeStr(data.original.nama_pekerjaan)}</strong>?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tindakan ini tidak dapat dibatalkan. Ini akan menghapus proyek Anda secara permanen.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                        className={"bg-red-600"}
                        onClick={handleDelete}
                        disabled={processing}
                    >
                        {processing ? "Menghapus..." : "Lanjutkan"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
