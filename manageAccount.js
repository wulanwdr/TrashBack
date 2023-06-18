
// Fetch data provinsi
fetch('../data/provinces.json')
  .then(response => response.json())
  .then(data => {
    const selectProvinsi = document.getElementById('inputProvince');
    data.provinces.forEach(provinsi => {
      const option = document.createElement('option');
      option.value = provinsi;
      option.textContent = provinsi;
      selectProvinsi.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
  
