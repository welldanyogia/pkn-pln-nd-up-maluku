import { columns } from "./Column.jsx";
import { DataTable } from "./DataTable.jsx";
import {useEffect, useState} from "react";

async function getData() {
    // Fetch data from your API here.
    return [
        {
            category: "PEMBANGKIT",
            nama_pekerjaan: "LISDES ZONA MALUKU",
            alat_kerja: {
                total_alat_kerja: 10,
                kritis: 2,
                normal: 6,
                kronis: 2
            },
            tanggal_efektif_kontrak: "30-Jun-22",
            jenis_kontrak: "",
            jangka_waktu_bulan: 60,
            jumlah_tenaga_kerja_sesuai_kontrak_fix_cost: 184,
            realisasi_di_lapangan: 176,
            nilai_kontrak_inc_ppn: 10000000,
            akhir_kontrak: "31-Jul-27",
            status_sisa_jangka_waktu_kontrak_bulan: 36,
            keterangan: ""
        },
        {
            category: "PEMBANGKIT",
            nama_pekerjaan: "LISDES ZONA MALUKU UTARA",
            alat_kerja: {
                total_alat_kerja: 8,
                kritis: 1,
                normal: 6,
                kronis: 1
            },
            tanggal_efektif_kontrak: "30-Jun-22",
            jenis_kontrak: "",
            jangka_waktu_bulan: 60,
            jumlah_tenaga_kerja_sesuai_kontrak_fix_cost: 147,
            realisasi_di_lapangan: 121,
            nilai_kontrak_inc_ppn: 10000000,
            akhir_kontrak: "31-Jul-27",
            status_sisa_jangka_waktu_kontrak_bulan: 36,
            keterangan: ""
        },
        {
            category: "DISTRIBUSI",
            nama_pekerjaan: "YANTEK MMU",
            alat_kerja: {
                total_alat_kerja: 20,
                kritis: 3,
                normal: 15,
                kronis: 2
            },
            tanggal_efektif_kontrak: "17-Apr-23",
            jenis_kontrak: "",
            jangka_waktu_bulan: 60,
            jumlah_tenaga_kerja_sesuai_kontrak_fix_cost: 772,
            realisasi_di_lapangan: 772,
            nilai_kontrak_inc_ppn: 10000000,
            akhir_kontrak: "30-Apr-28",
            status_sisa_jangka_waktu_kontrak_bulan: 45,
            keterangan: ""
        },
        {
            category: "PELAYANAN PELANGGAN",
            nama_pekerjaan: "BILLMAN MMU",
            alat_kerja: {
                total_alat_kerja: 12,
                kritis: 1,
                normal: 9,
                kronis: 2
            },
            tanggal_efektif_kontrak: "08-Jun-21",
            jenis_kontrak: "Volume Based Per Juni 2023",
            jangka_waktu_bulan: 60,
            jumlah_tenaga_kerja_sesuai_kontrak_fix_cost: 355,
            realisasi_di_lapangan: 355,
            nilai_kontrak_inc_ppn: 10000000,
            akhir_kontrak: "30-Jun-28",
            status_sisa_jangka_waktu_kontrak_bulan: 47,
            keterangan: ""
        },
        {
            category: "TRANSMISI",
            nama_pekerjaan: "OPGI UIW MMU",
            alat_kerja: {
                total_alat_kerja: 15,
                kritis: 1,
                normal: 10,
                kronis: 4
            },
            tanggal_efektif_kontrak: "17-Apr-23",
            jenis_kontrak: "",
            jangka_waktu_bulan: 60,
            jumlah_tenaga_kerja_sesuai_kontrak_fix_cost: 26,
            realisasi_di_lapangan: 26,
            nilai_kontrak_inc_ppn: 10000000,
            akhir_kontrak: "30-Apr-28",
            status_sisa_jangka_waktu_kontrak_bulan: 45,
            keterangan: ""
        },
        {
            category: "TRANSMISI",
            nama_pekerjaan: "GP UIW MMU",
            alat_kerja: {
                total_alat_kerja: 12,
                kritis: 2,
                normal: 8,
                kronis: 2
            },
            tanggal_efektif_kontrak: "17-Apr-23",
            jenis_kontrak: "",
            jangka_waktu_bulan: 60,
            jumlah_tenaga_kerja_sesuai_kontrak_fix_cost: 16,
            realisasi_di_lapangan: 16,
            nilai_kontrak_inc_ppn: 10000000,
            akhir_kontrak: "30-Apr-28",
            status_sisa_jangka_waktu_kontrak_bulan: 45,
            keterangan: ""
        },
        {
            category: "AIL DOWNLOADER",
            nama_pekerjaan: "MANAJEMEN AIL",
            alat_kerja: {
                total_alat_kerja: 7,
                kritis: 0,
                normal: 5,
                kronis: 2
            },
            tanggal_efektif_kontrak: "25-Jul-23",
            jenis_kontrak: "Volume Based",
            jangka_waktu_bulan: 12,
            jumlah_tenaga_kerja_sesuai_kontrak_fix_cost: 58,
            realisasi_di_lapangan: 58,
            nilai_kontrak_inc_ppn: 10000000,
            akhir_kontrak: "25 Agustus 2024",
            status_sisa_jangka_waktu_kontrak_bulan: 1,
            keterangan: ""
        },
        {
            category: "AIL DOWNLOADER",
            nama_pekerjaan: "DOWNLOADER PLN MOBILE",
            alat_kerja: {
                total_alat_kerja: 6,
                kritis: 1,
                normal: 4,
                kronis: 1
            },
            tanggal_efektif_kontrak: "25-Jul-23",
            jenis_kontrak: "Volume Based",
            jangka_waktu_bulan: 12,
            jumlah_tenaga_kerja_sesuai_kontrak_fix_cost: 49,
            realisasi_di_lapangan: 49,
            nilai_kontrak_inc_ppn: 10000000,
            akhir_kontrak: "25 Agustus 2024",
            status_sisa_jangka_waktu_kontrak_bulan: 1,
            keterangan: ""
        }
    ];
}


export default function Table({data,category}) {
    // const [data, setData] = useState([]);
    //
    // useEffect(() => {
    //     async function fetchData() {
    //         const result = await getData();
    //         setData(result);
    //     }
    //     fetchData();
    // }, []);

    console.log(data)
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} category={category}/>
        </div>
    );
}
