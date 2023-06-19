var pickups = [];
var editingPickup = null;

function addPickupToList(pickup) {
  var pickupItems = document.getElementById("pickup-items");

  var pickupItem = document.createElement("div");
  pickupItem.classList.add("pickup-list-item");

  var pickupInfo = document.createElement("div");

  var pickupTitle = document.createElement("h3");
  pickupTitle.innerText = pickup.name;

  var pickupAddress = document.createElement("p");
  pickupAddress.innerText = "Alamat: " + pickup.address;

  var pickupDateTime = document.createElement("p");
  pickupDateTime.innerText =
    "Tanggal: " + pickup.date + ", Waktu: " + pickup.time;

  var pickupItemName = document.createElement("p");
  pickupItemName.innerText = "Nama Item: " + pickup.item;

  var pickupItemType = document.createElement("p");
  pickupItemType.innerText = "Jenis Sampah: " + pickup.wasteType;

  var editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.addEventListener("click", function () {
    editPickup(pickup);
  });

  var deleteButton = document.createElement("button");
  deleteButton.innerText = "Hapus";
  deleteButton.addEventListener("click", function () {
    deletePickup(pickup);
  });

  pickupInfo.appendChild(pickupTitle);
  pickupInfo.appendChild(pickupAddress);
  pickupInfo.appendChild(pickupDateTime);
  pickupInfo.appendChild(pickupItemName);
  pickupInfo.appendChild(pickupItemType);
  pickupItem.appendChild(pickupInfo);
  pickupItem.appendChild(editButton);
  pickupItem.appendChild(deleteButton);

  pickupItems.appendChild(pickupItem);
}

function showPickupList() {
  var pickupItems = document.getElementById("pickup-items");
  pickupItems.innerHTML = "";

  for (var i = 0; i < pickups.length; i++) {
    addPickupToList(pickups[i]);
  }
}

function addPickup(pickup) {
  pickups.push(pickup);
  showPickupList();
}

function deletePickup(pickup) {
  var index = pickups.indexOf(pickup);
  if (index > -1) {
    pickups.splice(index, 1);
  }
  showPickupList();
}

function editPickup(pickup) {
  document.getElementById("pickup-id").value = pickup.id;
  document.getElementById("name").value = pickup.name;
  document.getElementById("address").value = pickup.address;
  document.getElementById("date").value = pickup.date;
  document.getElementById("time").value = pickup.time;
  document.getElementById("item").value = pickup.item;
  document.getElementById("waste-type").value = pickup.wasteType;

  document.getElementById("update-button").style.display = "inline-block";
  document.getElementById("cancel-button").style.display = "inline-block";
  document.getElementById("submit-button").style.display = "none";

  editingPickup = pickup;
}

function updatePickup() {
  var pickupId = document.getElementById("pickup-id").value;
  var name = document.getElementById("name").value;
  var address = document.getElementById("address").value;
  var date = document.getElementById("date").value;
  var time = document.getElementById("time").value;
  var item = document.getElementById("item").value;
  var wasteType = document.getElementById("waste-type").value;

  if (pickupId && name && address && date && time && item && wasteType) {
    var updatedPickup = {
      id: pickupId,
      name: name,
      address: address,
      date: date,
      time: time,
      item: item,
      wasteType: wasteType,
    };

    var index = pickups.findIndex(function (pickup) {
      return pickup.id === pickupId;
    });

    if (index > -1) {
      pickups[index] = updatedPickup;
      showPickupList();
      cancelUpdate();
    }
  } else {
    alert("Mohon lengkapi semua field!");
  }
}

function cancelUpdate() {
  document.getElementById("pickup-id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("address").value = "";
  document.getElementById("date").value = "";
  document.getElementById("time").value = "";
  document.getElementById("item").value = "";
  document.getElementById("waste-type").value = "";

  document.getElementById("update-button").style.display = "none";
  document.getElementById("cancel-button").style.display = "none";
  document.getElementById("submit-button").style.display = "inline-block";

  editingPickup = null;
}

document
  .getElementById("pickup-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var pickupId = document.getElementById("pickup-id").value;
    var name = document.getElementById("name").value;
    var address = document.getElementById("address").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var item = document.getElementById("item").value;
    var wasteType = document.getElementById("waste-type").value;

    if (name && address && date && time && item && wasteType) {
      var pickup = {
        id: pickupId || Date.now().toString(),
        name: name,
        address: address,
        date: date,
        time: time,
        item: item,
        wasteType: wasteType,
      };

      if (editingPickup) {
        updatePickup();
      } else {
        addPickup(pickup);
      }

      var message =
        "Pick-up request berhasil dikirim!\n\n" +
        "Nama: " +
        name +
        "\n" +
        "Alamat: " +
        address +
        "\n" +
        "Tanggal: " +
        date +
        "\n" +
        "Waktu: " +
        time +
        "\n" +
        "Nama Item: " +
        item +
        "\n" +
        "Jenis Sampah: " +
        wasteType;

      alert(message);

      document.getElementById("pickup-form").reset();
      cancelUpdate();
    } else {
      alert("Mohon lengkapi semua field!");
    }
  });

document.getElementById("update-button").addEventListener("click", function () {
  updatePickup();
});

document.getElementById("cancel-button").addEventListener("click", function () {
  cancelUpdate();
});

showPickupList();
