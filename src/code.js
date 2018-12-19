//  200 OK
//  301 System error
//  4xx Validation error
//  5xx Data not found
//  6xx Log data

const Code = {
    User: {
        200: 'Sukses',
        301: 'Terjadi kesalahan sistem',
        400: 'Username tidak boleh kosong',
        401: 'Password tidak boleh kosong',
        600: 'Login User - Validasi salah',
        601: 'Login User - Login',
        602: 'Login User - Kesalahan system',
        603: 'Registrasi User - Validasi salah',
        604: 'Registrasi User - Registrasi',
        605: 'Registrasi User - Kesalahan system',
    },
    Rekening: {
        200: 'Sukses',
        301: 'Terjadi kesalahan sistem',
        400: 'Kode aktivasi tidak boleh kosong',
        401: 'Nomor rekening tidak boleh kosong',
        402: 'Nomor rekening baru tidak boleh kosong',
        403: 'Value blokir tidak boleh kosong',
        404: 'Tujuan rekening tidak boleh kosong',
        405: 'Balance tidak boleh kosong',
        406: 'Asal rekening tidak boleh kosong',
        500: 'Data tidak ditemukan',
        600: 'Aktivasi Rekening - Validasi salah',
        601: 'Aktivasi Rekening - Aktivasi data',
        602: 'Aktivasi Rekening - Kesalahan system',
        603: 'Update Rekening - Validasi salah',
        604: 'Update Rekening - Update data',
        605: 'Update Rekening - Kesalahan system',
        606: 'Blokir Rekening - Validasi salah',
        607: 'Blokir Rekening - Update data',
        608: 'Blokir Rekening - Kesalahan system',
        609: 'Transaction - Validasi salah',
        610: 'Transaction - Update data',
        611: 'Transaction - Kesalahan system',
        612: 'History Transaction - Validasi salah',
        613: 'History Transaction - Get data',
        614: 'History Transaction - Kesalahan system',
    },
}

module.exports = Code
