import {Head, router} from "@inertiajs/react";
import {Card, CardContent, CardHeader} from "@/Components/ui/card.jsx";
import {Button} from "@/Components/ui/button.jsx";
import AuthenticatedAdmin from "@/Layouts/AuthenticatedAdminLayout.jsx";
import PDFViewer from "tailwind-pdf-viewer";
import "tailwind-pdf-viewer/style.css";
import {useState} from "react";
import axios from 'axios';
import {Viewer, Worker} from "@react-pdf-viewer/core";
import {Badge} from "@/Components/ui/badge.jsx";
import {Input} from "@/Components/ui/input.jsx";

export default function DetailTenagaKerja({auth, tenagakerja}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [pdfURL, setPdfURL] = useState(
        tenagakerja.documents && tenagakerja.documents.length > 0
            ? `${tenagakerja.documents[tenagakerja.documents.length - 1].file_path}`
            : null
    );
    const [openPDF, setOpenPDF] = useState(false)
    const [addDocument, setAddDocument] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleLihat = (filename) => {
        const pdfURL = filename;
        window.open(pdfURL, '_blank');
    };

    const handleFileUpload = async () => {
        setLoading(true)
        const formData = new FormData();
        const fileInput = document.getElementById('file-input');
        // const selectedFile = fileInput.files[0];

        if (!selectedFile) {
            console.error('No file selected');
            return;
        }

        formData.append('file', selectedFile);
        formData.append('tenaga_kerja_id', tenagakerja.id); // Ensure this is set

        try {
            console.log("Uploading file with data: ", {
                tenaga_kerja_id: tenagakerja.id,
                file: selectedFile,
            });

            const response = await axios.post(route('tenagakerja.documentUpload'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSelectedFile(null)
            setLoading(false)
            setAddDocument(false)
            router.reload()
            console.log(response.data);
        } catch (error) {
            setLoading(false)
            setAddDocument(false)
            console.error('Upload failed:', error.response ? error.response.data : error.message);
        }
    };


    return (
        <AuthenticatedAdmin
            user={auth.user}
            title="Detail Tenaga Kerja"
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detail Tenaga Kerja</h2>}
        >
            <Head title="Dashboard"/>

            <div className="py-12 space-y-6">
                <Card className={"bg-fountain-blue-400 shadow drop-shadow-lg max-w-7xl"}>
                    <CardHeader className={"text-white text-3xl max-sm:text-lg font-bold"}>
                        Detail Tenaga Kerja : {tenagakerja.nama}
                    </CardHeader>
                </Card>

                <Card className="shadow drop-shadow-lg max-w-7xl">
                    <CardContent
                        className="grid grid-rows-6 grid-flow-col gap-4 max-sm:gap-3 px-10 py-6 max-sm:text-xs max-sm:grid-cols-2">
                        <div className={"grid gap-2"}>
                            <h2>Nama</h2>
                            <span
                                className="font-bold break-words overflow-hidden whitespace-normal">{tenagakerja.nama}</span>
                        </div>
                        <div>
                            <div>Unit PLN</div>
                            <div
                                className="font-bold break-words overflow-hidden whitespace-normal">{tenagakerja.unit_pln}</div>
                        </div>
                        <div>
                            <h2>Penempatan</h2>
                            <span
                                className="font-bold break-words overflow-hidden whitespace-normal">{tenagakerja.penempatan}</span>
                        </div>
                        <div>
                            <h2>No. SPK</h2>
                            <span
                                className="font-bold break-words overflow-hidden whitespace-normal">{tenagakerja.no_spk}</span>
                        </div>
                        <div>
                            <h2>Proyek</h2>
                            <span
                                className="font-bold break-words overflow-hidden whitespace-normal">{tenagakerja.project.nama_pekerjaan}</span>
                        </div>
                        <div>
                            <h2>NIP</h2>
                            <span
                                className="font-bold break-words overflow-hidden whitespace-normal">{tenagakerja.nip}</span>
                        </div>
                        <div>
                            <h2>Jabatan</h2>
                            <span
                                className="font-bold break-words overflow-hidden whitespace-normal">{tenagakerja.jabatan}</span>
                        </div>
                        <div>
                            <h2>Tanggal Lahir</h2>
                            <span
                                className="font-bold break-words overflow-hidden whitespace-normal">{tenagakerja.tanggal_lahir}</span>
                        </div>
                        <div>
                            <h2>Usia</h2>
                            <span
                                className="font-bold break-words overflow-hidden whitespace-normal">{tenagakerja.usia} Tahun</span>
                        </div>
                        <div>
                            <h2>Sisa Masa Pensiun</h2>
                            {tenagakerja.sisa_masa_pensiun !== null && (
                                tenagakerja.sisa_masa_pensiun < 0 ? (
                                    <Badge className="font-bold bg-red-500 text-white px-2 py-1 rounded-lg">
                                        Pensiun
                                    </Badge>
                                ) : (
                                    <span className="font-bold break-words overflow-hidden whitespace-normal">
                                        {Math.floor(tenagakerja.sisa_masa_pensiun / 12)} Tahun {tenagakerja.sisa_masa_pensiun % 12} Bulan
                                    </span>
                                )
                            )}
                        </div>

                        <div>
                            <h2>Status Tanda Tangan Kontrak</h2>
                            <span className="font-bold break-words overflow-hidden whitespace-normal">
                                {tenagakerja.documents.length > 0 ?
                                    <Badge className={"bg-green-600"}>
                                        Sudah
                                    </Badge> :
                                    <Badge className={"bg-red-600"}>
                                        Belum
                                    </Badge>
                                }
            </span>
                        </div>
                    </CardContent>
                </Card>


                <Card className={"bg-fountain-blue-400 shadow drop-shadow-lg max-w-7xl"}>
                    <CardHeader className={"text-white font-bold"}>
                        Dokumen {tenagakerja.nama}
                    </CardHeader>
                    <CardContent>
                        <div className={"rounded flex max-sm:grid max-sm:gap-2 max-sm:justify-start gap-2"}>
                            <div>
                                {pdfURL !== null ? (
                                    <div>
                                        <Button onClick={() => setAddDocument(true)}
                                                className={addDocument ? 'hidden' : ''}
                                        >
                                            Ganti Dokumen
                                        </Button>
                                        <Button onClick={() => setAddDocument(false)}
                                                className={!addDocument ? 'hidden' : ''}
                                                variant={'destructive'}
                                        >
                                            Batal
                                        </Button>
                                    </div>
                                ) : (
                                    <Button onClick={() => setAddDocument(true)}>
                                        Upload Dokumen
                                    </Button>
                                )}
                                <div className={'flex mt-2'}>
                                    {addDocument && (
                                        <Input
                                            id="file-upload"
                                            type="file"
                                            className="w-fit"
                                            onChange={handleFileChange}
                                        />
                                    )}
                                    {selectedFile && (
                                        <Button className={"ml-4"} onClick={handleFileUpload}>
                                            {loading ? 'Menyimpan' : 'Simpan'}
                                        </Button>
                                    )}
                                </div>
                            </div>
                            {openPDF === false && pdfURL !== null ? (
                                <Button className={""} onClick={() => setOpenPDF(true)}>
                                    Lihat Dokumen
                                </Button>
                            ) : (
                                <Button className={!pdfURL ? 'hidden' : ''}
                                        variant={'destructive'}
                                        onClick={() => setOpenPDF(false)}>
                                    Tutup Dokumen
                                </Button>
                            )}
                        </div>
                        {openPDF === true && pdfURL !== null && (
                            <div className="mt-4 flex justify-center items-center p-4 relative">
                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                    <div
                                        style={{
                                            border: '1px solid rgba(0, 0, 0, 0.3)',
                                            // height: '750px',
                                        }}
                                        className="pdf-viewer-container mx-auto w-5/6 h-96 overflow-auto">
                                        <Viewer fileUrl={pdfURL}/>
                                    </div>
                                </Worker>
                            </div>
                        )}
                    </CardContent>

                </Card>
            </div>
        </AuthenticatedAdmin>
    );
}
