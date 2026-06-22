let data = {};
let deliveryPrices = {
  "أدرار": { desk: 1100, home: 600 },
  "الشلف": { desk: 700, home: 400 },
  "الأغواط": { desk: 900, home: 500 },
  "أم البواقي": { desk: 800, home: 400 },
  "باتنة": { desk: 800, home: 400 },
  "بجاية": { desk: 700, home: 400 },
  "بسكرة": { desk: 900, home: 500 },
  "بشار": { desk: 1100, home: 600 },
  "البليدة": { desk: 500, home: 250 },
  "البويرة": { desk: 650, home: 400 },
  "تمنراست": { desk: 1300, home: 800 },
  "تبسة": { desk: 800, home: 500 },
  "تلمسان": { desk: 800, home: 400 },
  "تيارت": { desk: 800, home: 400 },
  "تيزي وزو": { desk: 650, home: 400 },
  "الجزائر": { desk: 400, home: 200 },
  "الجلفة": { desk: 900, home: 500 },
  "جيجل": { desk: 700, home: 400 },
  "سطيف": { desk: 700, home: 400 },
  "سعيدة": { desk: 800, home: 400 },
  "سكيكدة": { desk: 700, home: 400 },
  "سيدي بلعباس": { desk: 700, home: 400 },
  "عنابة": { desk: 700, home: 400 },
  "قالمة": { desk: 800, home: 400 },
  "قسنطينة": { desk: 700, home: 400 },
  "المدية": { desk: 600, home: 400 },
  "مستغانم": { desk: 700, home: 400 },
  "المسيلة": { desk: 800, home: 500 },
  "وهران": { desk: 700, home: 400 },
  "بومرداس": { desk: 600, home: 350 },
  "تيبازة": { desk: 600, home: 350 },
  "عين الدفلى": { desk: 600, home: 400 },
  "النعامة": { desk: 1000, home: 500 },
  "عين تموشنت": { desk: 700, home: 400 },
  "غرداية": { desk: 1000, home: 500 }
};

// Load wilayas
window.onload = function () {
  data = algeria;
  loadWilayas();
};

// Load wilayas
function loadWilayas() {
  const wilayaSelect = document.getElementById("wilaya");
  wilayaSelect.innerHTML = '<option value="">اختر الولاية</option>';

  Object.keys(data).forEach(w => {
    let opt = document.createElement("option");
    opt.value = w;
    opt.textContent = w;
    wilayaSelect.appendChild(opt);
  });
}

// communes
function updateCommunes() {
  const w = document.getElementById("wilaya").value;
  const c = document.getElementById("commune");

  c.innerHTML = '<option value="">اختر البلدية</option>';

  if (data[w]) {
    data[w].forEach(cm => {
      let opt = document.createElement("option");
      opt.value = cm;
      opt.textContent = cm;
      c.appendChild(opt);
    });
  }
}

// PRICE CALCULATION
function updatePrice() {
  const wilaya = document.getElementById("wilaya").value;
  const delivery = document.getElementById("delivery").value;

  if (!wilaya || !deliveryPrices[wilaya]) return;

  const price = deliveryPrices[wilaya][delivery];

  document.getElementById("priceBox").innerText =
    `💰 سعر التوصيل: ${price} دج`;
}

// Telegram order
document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const lastname = document.getElementById("lastname").value;
  const phone = document.getElementById("phone").value;
  const wilaya = document.getElementById("wilaya").value;
  const commune = document.getElementById("commune").value;
  const delivery = document.getElementById("delivery").value;

  const price = deliveryPrices[wilaya][delivery];

  const message = `
🟢 طلب جديد - بودرة السدر

👤 الاسم: ${name} ${lastname}
📞 الهاتف: ${phone}
📍 الولاية: ${wilaya}
🏙 البلدية: ${commune}
🚚 التوصيل: ${delivery}
💰 التوصيل: ${price} دج
💵 السعر الإجمالي: ${2300 + price} دج
`;

  const botToken = "YOUR_TOKEN";
  const chatId = "-5334151238";

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message
    })
  });

  alert("تم إرسال طلبك بنجاح 🌿");
});