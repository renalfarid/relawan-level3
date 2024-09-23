function checkFormCompletion() {
    const provinsi = document.getElementById('provinsi').value;
    const kabupaten = document.getElementById('kabupaten').value;
    const kecamatan = document.getElementById('kecamatan').value;
    const kelurahan = document.getElementById('kelurahan').value;
    const korcam = document.getElementById('korcam').value;
    const korlu = document.getElementById('korlu').value;
  
    // Check if all select elements have a value
    const allFilled = provinsi && kabupaten && kecamatan && kelurahan && korcam && korlu;
  
    // Enable or disable the button based on the form completion
    document.getElementById('nextButton').disabled = !allFilled;
  }
  
function showNextStep(currentStep) {
    if (currentStep === 1) {
      // Move from step 1 to step 2
      document.getElementById('form-step-1').classList.add('hidden');
      document.getElementById('form-step-2').classList.remove('hidden');
      
      // Update step indicators
      document.getElementById('step-1-indicator').classList.remove('text-blue-600');
      document.getElementById('step-2-indicator').classList.add('text-blue-600');

    } else if (currentStep === 2) {
       
      // Move from step 2 to step 3 (Final step with the congratulatory message)
      document.getElementById('form-step-2').classList.add('hidden');
      document.getElementById('form-step-3').classList.remove('hidden');
      
      // Update step indicators
      document.getElementById('step-2-indicator').classList.remove('text-blue-600');
      document.getElementById('step-3-indicator').classList.add('text-blue-600');
    }
  }
  function showPreviousStep(currentStep) {
    if (currentStep === 2) {
      // Move back from step 2 to step 1
      document.getElementById('form-step-2').classList.add('hidden');
      document.getElementById('form-step-1').classList.remove('hidden');
      
      // Update step indicators
      document.getElementById('step-2-indicator').classList.remove('text-blue-600');
      document.getElementById('step-1-indicator').classList.add('text-blue-600');
    } else if (currentStep === 3) {
      // Move back from step 3 to step 2
      document.getElementById('form-step-3').classList.add('hidden');
      document.getElementById('form-step-2').classList.remove('hidden');
      
      // Update step indicators
      document.getElementById('step-3-indicator').classList.remove('text-blue-600');
      document.getElementById('step-2-indicator').classList.add('text-blue-600');
    }
  }

function resetResult() {
    document.getElementById('formData').innerHTML = ``
    document.getElementById('pemilih').innerHTML = ``
    document.getElementById('konfirmasiData').innerHTML = ``
    document.getElementById('errorData').innerHTML = ``
}

async function validasiNik(nik) {
  resetResult()
  try {
    const response = await fetch(`${apiUrl}/validasi?nik=${nik}`);
    const data = await response.json();
   return data.data;
  } catch (error) {
    return false; 
  }
}

function showError(errorMessage) {
    document.getElementById('errorData').innerHTML = `
    <div class="m-4 p-4 bg-red-50">
    <span>${errorMessage}</span>
    </div>`
}

function populateKorTps(id, nama, tps) {

  let formData = {}
  formData.fkPemilih = parseInt(id)
  formData.nama = nama
  formData.fkTps = parseInt(tps)
  formData.fkRelawanLvl2 = parseInt(document.getElementById('korlu').value)
  formData.verifikasi = 1
  formData.username = ""
  formData.password = "" 

  const korTps = JSON.stringify(formData)
  
  document.getElementById('pemilih').innerHTML = ``

  document.getElementById('konfirmasiData').innerHTML = `
  <div class="flex flex-col gap-4 m-4 p-4 bg-orange-50">
    <div class="font-semibold">Konfirmasi Data:</div>
    <ul class="list-disc pl-5">
      <li>ID: ${formData.fkPemilih}</li>
      <li>Nama Relawan Level 3: ${formData.nama}</li>
      <li>ID Relawan Level 2 (Korlu): ${formData.fkRelawanLvl2}</li>
      <li>Kode TPS: ${formData.fkTps}</li>
    </ul>
    <button type="button" id="kirimBtn" data-form='${JSON.stringify(formData)}' class="mt-4 text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orage-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
      Kirim
    </button>
  </div>
`;

document.getElementById('kirimBtn').addEventListener('click', function() {
    const formData = JSON.parse(this.getAttribute('data-form'));
    simpanDataRelawan(formData);
  });

}

function simpanDataRelawan(korTps) {
    const data = typeof korTps === 'string' ? JSON.parse(korTps) : korTps;

    const dataRelawanLv3 = JSON.stringify(korTps)
    
    fetch(`${apiUrl}/relawan-lv3`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: dataRelawanLv3,
      })
        .then(response => response.json())
        .then(result => {
          if (result.success) { 
            resetResult();
            showNextStep(2);
          } else {
            resetResult();
            showError(result.error)
            showPreviousStep(1)
          }
        })
        .catch(error => {
          resetResult();
          showError(error)
          showPreviousStep(1)
        });

  }


document.getElementById('formNik').addEventListener('submit', async function(event) {
  event.preventDefault();
  const cariBtn = document.getElementById('cariBtn');
  cariBtn.disabled = true

  const nik = document.getElementById('nik').value;
  const data = await validasiNik(nik)
  const pemilih = data.pemilih
  
  if (!data.status_nik) {
    document.getElementById('formData').innerHTML = `
      <form id="formDataDiri" class="max-w-2xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2">

        <div>
          <label for="nama" class="block text-sm font-medium text-gray-700">Nama</label>
          <input type="text" id="nama" name="nama" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
        </div>

        <div>
          <label for="tempat-lahir" class="block text-sm font-medium text-gray-700">Tempat Lahir</label>
          <input type="text" id="tempat-lahir" name="tempat-lahir" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
        </div>

        <div>
          <label for="tgl-lahir" class="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
          <input type="date" id="tgl-lahir" name="tgl-lahir" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
        </div>

        <div>
          <label for="jenis-kelamin" class="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
          <select id="jenis-kelamin" name="jenis-kelamin" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" required>
            <option value="">Pilih Jenis Kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        <div>
          <label for="no-hp" class="block text-sm font-medium text-gray-700">No HP/WA</label>
          <input type="tel" id="no-hp" name="no-hp" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
        </div>

        <div class="sm:col-span-2">
          <label for="alamat" class="block text-sm font-medium text-gray-700">Alamat</label>
          <input type="text" id="alamat" name="alamat" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
        </div>

        <div>
          <label for="tps" class="block text-sm font-medium text-gray-700">TPS</label>
          <input type="text" id="tps" name="tps" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
        </div>

        <div>
          <label for="foto-ktp" class="block text-sm font-medium text-gray-700">Foto KTP</label>
          <input type="file" id="foto-ktp" name="foto-ktp" accept="image/*" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
        </div>

        <div class="sm:col-span-2 flex justify-between">
          <!-- Back Button -->
          <button type="button" onclick="showPreviousStep()" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            Kembali
          </button>

          <!-- Submit Button -->
          <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Kirim
          </button>
        </div>

      </form>
    `;
  } else {
    const id = pemilih[0].id
    const nama = pemilih[0].nama
    const tps = pemilih[0].tps
    const namaTps = pemilih[0].namaTps
    
    document.getElementById('pemilih').innerHTML = `
    <div class="flex flex-col gap-4 m-4 p-4 bg-orange-50">
      <div class="flex justify-items-start font-semibold">ID: ${pemilih[0].id} - Nama: ${pemilih[0].nama} - TPS: ${pemilih[0].namaTps}</div>
      <button type="button" id="pilihPemilihBtn" onclick="populateKorTps('${pemilih[0].id}', '${pemilih[0].nama}', '${pemilih[0].tps}', '${pemilih[0].namaTps}')" class="flex justify-items-center text-white bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
        Pilih
        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
      </button>
    </div>
    
    `;
  }

  cariBtn.disabled = false


});

