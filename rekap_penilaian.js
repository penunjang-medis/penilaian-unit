// Rekap tetap pakai script lama kamu
db.ref('penilaian').on('value', snap => {
  tbody.innerHTML = '';
  let dataList = [];

  snap.forEach(child => {
    const d = child.val();
    let total = 0;
    for (let k = 1; k <= 11; k++) { // tetap sesuai rekap lama
      total += parseInt(d['nilai'+k] || 0);
    }
    dataList.push({
      key: child.key,
      nama: d.nama,
      total: total
    });
  });

  // Render rekap seperti biasa...
});

// Tambahan: Script tombol detail (urutan baru)
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('btnDetail')) {
    const key = e.target.getAttribute('data-key');
    db.ref('penilaian/' + key).once('value').then(s => {
      const v = s.val();
      
      const criteria = [
        'Ruangan bersih',
        'Ruangan bebas dari sampah',
        'Lemari, meja komputer bersih dan tidak berdebu',
        'Tong sampah sesuai isinya (tidak penuh)',
        'Alat-alat tersusun rapi termasuk kabel',
        'Tersedia handrub',
        'Handwash terpasang di setiap wastafel',
        'Penempatan barang sesuai tempatnya',
        'Pakaian sesuai ketentuan HRD / atribut lengkap',
        'Suhu dan kelembaban sesuai',
        'Aroma ruangan wangi',
        'Terdapat struktur organisasi dan indikator mutu',
        'Kreativitas unit (berhubungan dengan Kemerdekaan)'
      ];

      let html = '<table class="table table-bordered table-sm">';
      html += '<thead><tr><th>No</th><th>Kriteria</th><th>Nilai</th><th>Catatan</th></tr></thead><tbody>';
      criteria.forEach((c, i) => {
        html += `
          <tr>
            <td>${i+1}</td>
            <td>${c}</td>
            <td>${v['nilai'+(i+1)] || ''}</td>
            <td>${v['catatan'+(i+1)] || ''}</td>
          </tr>
        `;
      });
      html += '</tbody></table>';

      document.querySelector('#detailContainer').innerHTML = html;
    });
  }
});
