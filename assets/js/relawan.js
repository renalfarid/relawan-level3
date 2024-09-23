document.addEventListener('DOMContentLoaded', function() {
    const provinsiSelect = document.getElementById('provinsi');
    const kabupatenSelect = document.getElementById('kabupaten');
    const kecamatanSelect = document.getElementById('kecamatan');
    const kelurahanSelect = document.getElementById('kelurahan');
    const korcamSelect = document.getElementById('korcam');
    const korluSelect = document.getElementById('korlu');

    function populateProvinsi(selectElement, data, placeholder = "Pilih") {
        selectElement.innerHTML = `<option value="">${placeholder}</option>`;
        data.forEach(item => {
            selectElement.innerHTML += `<option value="${item.id}">${item.namaProvinsi}</option>`;
        });
    }

    function populateKabupaten(selectElement, data, placeholder = "Pilih") {
        selectElement.innerHTML = `<option value="">${placeholder}</option>`;
        data.forEach(item => {
            selectElement.innerHTML += `<option value="${item.id}">${item.namaKabupaten}</option>`;
        });
    }

    function populateKecamatan(selectElement, data, placeholder = "Pilih") {
        selectElement.innerHTML = `<option value="">${placeholder}</option>`;
        data.forEach(item => {
            selectElement.innerHTML += `<option value="${item.id}">${item.namaKecamatan}</option>`;
        });
    }

    function populateKelurahan(selectElement, data, placeholder = "Pilih") {
        selectElement.innerHTML = `<option value="">${placeholder}</option>`;
        data.forEach(item => {
            selectElement.innerHTML += `<option value="${item.id}">${item.namaKelurahan}</option>`;
        });
    }

    function populateKorcam(selectElement, data, placeholder = "Pilih") {
        selectElement.innerHTML = `<option value="">${placeholder}</option>`;
        if (!data || data === 'undefined') {
            selectElement.disabled = true;
        } else {
            // Jika data tidak kosong, enable select dan tambahkan opsi
            selectElement.disabled = false;
            data.forEach(item => {
                selectElement.innerHTML += `<option value="${item.id}">${item.nama}</option>`;
            });
        }
    }

    function populateKorlu(selectElement, data, placeholder = "Pilih") {
        selectElement.innerHTML = `<option value="">${placeholder}</option>`;
        if (!data || data === 'undefined') {
            selectElement.disabled = true;
        } else {
            // Jika data tidak kosong, enable select dan tambahkan opsi
            selectElement.disabled = false;
            data.forEach(item => {
                selectElement.innerHTML += `<option value="${item.id}">${item.nama}</option>`;
            });
        }
    }

    fetch(`${apiUrl}/provinsi?id=5`)
        .then(response => response.json())
        .then(data => {
            populateProvinsi(provinsiSelect, data.data, "Pilih Provinsi");
            provinsiSelect.disabled = false; // Enable the select
        });

    // Event Listener for Provinsi Select
    provinsiSelect.addEventListener('change', function() {
        const provinsiId = this.value;
        if (provinsiId) {
            fetch(`${apiUrl}/kabupaten?provinsi=${provinsiId}`)
                .then(response => response.json())
                .then(data => {
                    populateKabupaten(kabupatenSelect, data.data, "Pilih Kabupaten");
                    kabupatenSelect.disabled = false; // Enable Kabupaten select
                    kecamatanSelect.disabled = true;  // Reset Kecamatan select
                    kelurahanSelect.disabled = true;  // Reset Kelurahan select
                    kecamatanSelect.innerHTML = `<option value="">Pilih Kecamatan</option>`;
                    kelurahanSelect.innerHTML = `<option value="">Pilih Kelurahan</option>`;
                });
        } else {
            kabupatenSelect.disabled = true;
            kecamatanSelect.disabled = true;
            kelurahanSelect.disabled = true;
        }
    });

    // Event Listener for Kabupaten Select
    kabupatenSelect.addEventListener('change', function() {
        const kabupatenId = this.value;
        if (kabupatenId) {
            fetch(`${apiUrl}/kecamatan?kabupaten=${kabupatenId}`)
                .then(response => response.json())
                .then(data => {
                    populateKecamatan(kecamatanSelect, data.data, "Pilih Kecamatan");
                    kecamatanSelect.disabled = false;
                    kelurahanSelect.disabled = true;
                    kelurahanSelect.innerHTML = `<option value="">Pilih Kelurahan</option>`;
                });
        } else {
            kecamatanSelect.disabled = true;
            kelurahanSelect.disabled = true;
        }
    });

    // Event Listener for Kecamatan Select
    kecamatanSelect.addEventListener('change', function() {
        const kecamatanId = this.value;
        if (kecamatanId) {
            fetch(`${apiUrl}/kelurahan?kecamatan=${kecamatanId}`)
                .then(response => response.json())
                .then(data => {
                    populateKelurahan(kelurahanSelect, data.data, "Pilih Kelurahan");
                    kelurahanSelect.disabled = false;
                });
            fetch(`${apiUrl}/korcam?kecamatan=${kecamatanId}`)
                .then(response => response.json())
                .then(data => {
                    populateKorcam(korcamSelect, data.data, "Pilih Korcam");
                    //korcamSelect.disabled = false;
                });
        } else {
            kelurahanSelect.disabled = true;
        }
    });


     // Event Listener for Kecamatan Select
     korcamSelect.addEventListener('change', function() {
        const korcamId = this.value;
        if (korcamId) {
            fetch(`${apiUrl}/korlu?korcam=${korcamId}`)
                .then(response => response.json())
                .then(data => {
                    populateKorlu(korluSelect, data.data, "Pilih Korlu");
                    korluSelect.disabled = false;
                });
        } else {
            korluSelect.disabled = true;
        }
    });


});
