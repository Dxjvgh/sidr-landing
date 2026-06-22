// script.js
let data = {};

// Load wilayas on page start
window.onload = function () {
  data = algeria;
  loadWilayas();
};

// Load wilayas into dropdown
function loadWilayas() {
  const wilayaSelect = document.getElementById("wilaya");

  // prevent duplicates
  wilayaSelect.innerHTML = '<option value="">اختر الولاية</option>';

  Object.keys(data).forEach(wilaya => {
    let option = document.createElement("option");
    option.value = wilaya;
    option.textContent = wilaya;
    wilayaSelect.appendChild(option);
  });
}

// Update communes and price when wilaya changes
function updateCommuneAndPrice() {
  const wilaya = document.getElementById("wilaya").value;
  const communeSelect = document.getElementById("commune");

  communeSelect.innerHTML = '<option value="">اختر البلدية</option>';

  if (data[wilaya]) {
    data[wilaya].forEach(commune => {
      let option = document.createElement("option");
      option.value = commune;
      option.textContent = commune;
      communeSelect.appendChild(option);
    });
  }

  // Update price
  updatePrice();
}

// Telegram form submission
document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const lastname = document.getElementById("lastname").value;
  const phone = document.getElementById("phone").value;
  const wilaya = document.getElementById("wilaya").value;
  const commune = document.getElementById("commune").value;
  const delivery = document.getElementById("delivery").value;
  const price = document.getElementById("priceDisplay").textContent;

  const message = `
🟢 طلب جديد - بودرة السدر

👤 الاسم: ${name} ${lastname}
📞 الهاتف: ${phone}
📍 الولاية: ${wilaya}
🏙 البلدية: ${commune}
🚚 التوصيل: ${delivery}
💰 السعر: ${price}
`;

  const botToken = "8955038552:AAH5UrtfQtNtkxIoFx7OvfRK7K1FNxV44Mk";
  const chatId = "-5334151238";

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message
    })
  });

  alert("تم إرسال طلبك بنجاح 🌿");
});