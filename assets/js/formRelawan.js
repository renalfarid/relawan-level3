function checkFormCompletion() {
    const provinsi = document.getElementById('provinsi').value;
    const kabupaten = document.getElementById('kabupaten').value;
    const kecamatan = document.getElementById('kecamatan').value;
    const kelurahan = document.getElementById('kelurahan').value;
    const korcam = document.getElementById('korcam').value;
    const korlu = document.getElementById('korlu').value;
    
    const allFilled = provinsi && kabupaten && kecamatan && kelurahan && korcam && korlu;
     dataRelawan.kelurahan = document.getElementById('kelurahan').value;
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

      document.getElementById('registerUser').innerHTML = `
      <span class="text-green-600 text-xl font-semibold">Username anda: ${formDataRelawan.user}</span>
      `
      document.getElementById('registerPassword').innerHTML = `
      <span class="text-green-600 text-xl font-semibold">Password anda: ${formDataRelawan.password}</span>
      `
    }
  }
  function showPreviousStep(currentStep) {
    if (currentStep === 2) {
      // Move back from step 2 to step 1
      document.getElementById('form-step-2').classList.add('hidden');
      document.getElementById('formData').classList.add('hidden');
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
    document.getElementById('errorAtas').innerHTML = ``
    document.getElementById('successData').innerHTML = ``
}

function clearError() {
  document.getElementById('errorData').innerHTML = ``
  document.getElementById('errorAtas').innerHTML = ``
}

async function validasiNik(nik) {
  resetResult()
  const data = await apiRequest.apiGet('/validasi', { nik });
    if (data.success) {
        return data.data;
    }
    resetResult()
    showError(data.error)
}

function showError(errorMessage) {
    document.getElementById('errorData').innerHTML = `
    <div class="m-4 p-4 bg-red-50">
    <span>${errorMessage}</span>
    </div>`
}

function showSuccess(successMessage) {
  document.getElementById('successData').innerHTML = `
  <div class="m-4 p-4 bg-green-50">
  <span>${successMessage}</span>
  </div>`
}

function showErrorAtas(errorMessage) {
  document.getElementById('errorAtas').innerHTML = `
  <div class="m-4 p-4 bg-red-50">
  <span>${errorMessage}</span>
  </div>`
}

function populateTps(selectElement, data, placeholder = "Pilih") {
    selectElement.innerHTML = `<option value="">${placeholder}</option>`;
    data.forEach(item => {
        selectElement.innerHTML += `<option value="${item.id}">${item.namaTps}</option>`;
    });
}

async function validasiUserName(username) {
  const response = await apiRequest.apiGet('/validasi-user', {username})
  if (response.success) {
    return true
  } else {
    return false
  }
}

function populateKorTps(id, nama, alamat) {
  
  formDataRelawan.fkPemilih = parseInt(id)
  formDataRelawan.nama = nama
  //formData.fkTps = parseInt(tps)
  formDataRelawan.fkRelawanLvl2 = parseInt(document.getElementById('korlu').value)
  formDataRelawan.verifikasi = 0
  formDataRelawan.status =1
  
  formDataRelawan.alamat = alamat
  formDataRelawan.kelurahan = document.getElementById('kelurahan').value
  
  const korTps = JSON.stringify(formDataRelawan)

  
  document.getElementById('pemilih').innerHTML = ``

  document.getElementById('konfirmasiData').innerHTML = `
  <div class="flex flex-col gap-4 m-4 p-4 bg-orange-50">
    <div class="font-semibold">Konfirmasi Data:</div>
    <ul class="list-disc pl-5">
      <li>Nama : ${formDataRelawan.nama}</li>
      <li>Alamat : ${formDataRelawan.alamat}</li>
    </ul>
    <div class=col-span-2>
        <label for="noHp" class="block text-sm font-medium text-gray-700">No WA / HP</label>
        <input type="text" id="noHp" name="noHp" placeholder="No HP/WA yang bisa dihubungi" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
    </div>
    <div class="col-span-2">
        <label for="tpsPenugasan" class="block text-sm font-medium text-gray-700">TPS Penugasan</label>
        <select id="tpsPenugasan" name="tpsPenugasan" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
         <option value="">Pilih Tps</option>
        </select>
    </div>
    <div class=col-span-2>
        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
        <input type="text" id="username" name="username" placeholder="username" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
        <div class="mt-2 p-2" id="errorUser" name="errorUser""></div>
    </div>
    <div class=col-span-2>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" name="password" placeholder="minimal 5-8 digit password" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
        <div class="mt-2 p-2" id="errorPassword" name="errorPassword""></div>
    </div>
    <button type="button" id="kirimBtn" onclick="simpanRelawan()" class="mt-4 inline-flex justify-center text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orage-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
      Kirim
    </button>
  </div>
`;

const tpsPenugasanSelect = document.getElementById('tpsPenugasan');
fetch(`${apiUrl}/tps?kelurahan=${formDataRelawan.kelurahan}`)
        .then(response => response.json())
        .then(data => {
            populateTps(tpsPenugasanSelect, data.data, "Pilih Tps Penugasan");
            tpsPenugasanSelect.disabled = false; // Enable the select
        });

}

function validateFormRelawan(formDataRelawan) {
  // Loop through each key in formDataRelawan
  for (const key in formDataRelawan) {
      if (formDataRelawan.hasOwnProperty(key)) {
          const value = formDataRelawan[key];

          // Check if value is empty string or NaN
          if (value === "" || Number.isNaN(value)) {
             showErrorAtas(`Mohon isi: ${key}`)
              return false;
          }
      }
  }

  // If all values are valid
  clearError()
  return true;
}


async function simpanRelawan() {
    const fkTps = document.getElementById('tpsPenugasan').value
    const usernameInput = document.getElementById('username');
    let username = usernameInput.value;

    // Mengubah ke huruf kecil dan menghapus semua spasi
    username = username.toLowerCase().replace(/\s+/g, '');

    // Set kembali nilai input setelah modifikasi
    usernameInput.value = username;
    
    formDataRelawan.user = usernameInput.value
    formDataRelawan.password = document.getElementById('password').value
    
    formDataRelawan.fkTps = parseInt(fkTps)
    formDataRelawan.noHp = document.getElementById('noHp').value
    const isValidUser = await validasiUserName(formDataRelawan.user)
    if(!isValidUser) {
      document.getElementById('errorUser').innerHTML = `
       <span class="mt-2 text-red-600" >Username ${formDataRelawan.user} telah digunakan, silahkan coba Username yg lain</span>
      `
      return
    } else {
      document.getElementById('errorUser').innerHTML = ``
    }
    if(formDataRelawan.password.length < 6 || formDataRelawan.password.length > 9){
      document.getElementById('errorPassword').innerHTML = `
       <span class="mt-2 text-red-600" >Password minimal 5 dan maksimal 8 digit</span>
      `
      return
    } else {
      document.getElementById('errorUser').innerHTML = ``
    }
    
    const cekForm = validateFormRelawan(formDataRelawan)
    if (cekForm) {
      const response = await apiRequest.apiPost('/relawan-lv3', formDataRelawan);
      resetResult()

      if (response.success) {
         showNextStep(2)
      } else {
        showError(response.error)
      }
      
    }

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

async function isiTpsPemilih(tpsPemilih, kelurahan) {
  
  const response = await apiRequest.apiGet("/tps", {kelurahan})
  if (response.success) {
    populateTps(tpsPemilih, response.data, "Pilih TPS Pemilih")
    tpsPemilih.disabled = false
  } else {
    populateTps(tpsPemilih, [], "Pilih TPS Pemilih")
    tpsPemilih.disabled = true
  }
}

async function openConfirmationPage(nik) {
  updatePemilih = await validasiNik(nik)
  const dataPemilih = updatePemilih.pemilih

  resetResult()
  populateKorTps(dataPemilih[0].id, dataPemilih[0].nama, dataPemilih[0].alamatKtp);
}


document.getElementById('formNik').addEventListener('submit', async function(event) {
  event.preventDefault();
  const nik = document.getElementById('nik').value;

  try {

    const data = await validasiNik(nik)  

    const pemilih = data.pemilih;

    dataRelawan.noKtp = nik

    
    if (!data.status_nik) {
        document.getElementById('formData').classList.remove('hidden');
        document.getElementById('formData').innerHTML = `
        <form id="formDataDiri" class="max-w-xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label for="noKtp" class="block text-sm font-medium text-gray-700">NIK</label>
          <input type="text" id="noKtp" name="noKtp" value="${nik}" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"/>
        </div>
        <div>
          <label for="nama" class="block text-sm font-medium text-gray-700">Nama</label>
          <input type="text" id="nama" name="nama" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
        </div>
        <div>
          <label for="fkTpsKtp" class="block text-sm font-medium text-gray-700">TPS</label>
          <select id="fkTpsKtp" name="fkTpsKtp" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
            <option value="">Pilih TPS</option>
          </select>
        </div>
        <div>
          <label for="tempatLahir" class="block text-sm font-medium text-gray-700">Tempat Lahir</label>
          <input type="text" id="tempatLahir" name="tempatLahir" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
        </div>
        
        <div>
          <label for="noHp" class="block text-sm font-medium text-gray-700">No HP/WA</label>
          <input type="tel" id="noHp" name="noHp" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
        </div>
    
        <div class="sm:col-span-2">
          <label for="alamatKtp" class="block text-sm font-medium text-gray-700">Alamat</label>
          <input type="text" id="alamatKtp" name="alamatKtp" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
        </div>
    
        <div>
          <label for="fileKtp" class="block text-sm font-medium text-gray-700">Foto KTP</label>
          <input type="file" id="fileKtp" name="fileKtp" accept="image/*" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
        </div>
    
        <div class="sm:col-span-2 flex justify-between mt-4">
          <!-- Back Button -->
          <button type="button" onclick="showPreviousStep(2)" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            Kembali
          </button>
    
          <!-- Submit Button -->
          <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Kirim
          </button>
        </div>
    
      </form>
        `;

        const tpsPemilih = document.getElementById('fkTpsKtp');
        const kelurahanPemilih = dataRelawan.kelurahan 

        isiTpsPemilih(tpsPemilih, kelurahanPemilih)

    
        // Attach the event listener to the dynamically generated form
        document.getElementById('formDataDiri').addEventListener('submit', function(event) {
            event.preventDefault();
    
            const pemilihPemula = new FormData(this);
            
            simpanDataPemilih(pemilihPemula)
            
            // Proceed with form submission via AJAX or any other logic
            async function simpanDataPemilih(pemilihPemula) {
              
              try {
                const response = await fetch(`${apiUrl}/pemilih`, {
                    method: 'POST',
                    body: pemilihPemula, // Menggunakan FormData yang sudah mencakup semua data termasuk file
                });
        
                const result = await response.json();
        
                if (result.success) {
                    openConfirmationPage(dataRelawan.noKtp)
                return
                } else {
                    resetResult()
                    showError(result.error)
                }
            } catch (error) {
                showError('Terjadi kesalahan saat mengirim data')
            }
              
            }
    
          });
    
      } else {
        const id = pemilih[0].id
        const nama = pemilih[0].nama
        const tps = pemilih[0].tps
        const namaTps = pemilih[0].namaTps
        
        document.getElementById('pemilih').innerHTML = `
<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Nama
                </th>
                <th scope="col" class="px-6 py-3">
                    Alamat
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-small text-gray-900 whitespace-nowrap dark:text-white">
                    ${pemilih[0].nama}
                </th>
                <td class="px-6 py-4">
                    ${pemilih[0].alamatKtp}
                </td>
            </tr>
        </tbody>
    </table>
    <div class="mt-2 flex justify-center items-center">
     <button type="button" id="pilihPemilihBtn" onclick="populateKorTps('${pemilih[0].id}', '${pemilih[0].nama}', '${pemilih[0].alamatKtp}')" class="flex justify-items-center text-white bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
        Pilih
        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </button>
    </div>
</div>    
    `;
}


  } catch (error) {
    console.log("Error : ", error)
  }
  

});

