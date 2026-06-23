// prices.js
// Each wilaya: [stopDesk, homeDelivery]  (lower price first, higher price second)
const deliveryPrices = {
  "أدرار": [600, 1100],
  "الشلف": [400, 700],
  "الأغواط": [500, 900],
  "أم البواقي": [400, 800],
  "باتنة": [400, 800],
  "بجاية": [400, 700],
  "بسكرة": [500, 900],
  "بشار": [600, 1100],
  "البليدة": [250, 500],
  "البويرة": [400, 650],
  "تمنراست": [800, 1300],
  "تبسة": [500, 800],
  "تلمسان": [400, 800],
  "تيارت": [400, 800],
  "تيزي وزو": [400, 650],
  "الجزائر": [200, 400],
  "الجلفة": [500, 900],
  "جيجل": [400, 700],
  "سطيف": [400, 700],
  "سعيدة": [400, 800],
  "سكيكدة": [400, 700],
  "سيدي بلعباس": [400, 700],
  "عنابة": [400, 700],
  "قالمة": [400, 800],
  "قسنطينة": [400, 700],
  "المدية": [400, 600],
  "مستغانم": [400, 700],
  "المسيلة": [500, 800],
  "ماسكارا": [400, 700],
  "ورقلة": [500, 1000],
  "وهران": [400, 700],
  "البيض": [500, 1000],
  "إليزي": [600, 1300],
  "برج بوعريريج": [400, 700],
  "بومرداس": [350, 600],
  "الطارف": [400, 800],
  "تندوف": [600, 1300],
  "تيسمسيلت": [400, 800],
  "الوادي": [500, 900],
  "خنشلة": [500, 800],
  "سوق أهراس": [500, 800],
  "تيبازة": [350, 600],
  "ميلة": [400, 700],
  "عين الدفلى": [400, 600],
  "النعامة": [500, 1000],
  "عين تموشنت": [400, 700],
  "غرداية": [500, 1000],
  "غليزان": [400, 700],
  "تيميمون": [600, 1300],
  "أولاد جلال": [500, 900],
  "بني عباس": [0, 1300],
  "عين صالح": [600, 1300],
  "توقرت": [500, 900],
  "المغير": [0, 900],
  "المنيعة": [500, 1000]
};

// Helper: get prices array for a wilaya
function getDeliveryPrice(wilaya) {
  return deliveryPrices[wilaya] || null;
}

// Update price display – home delivery now uses the second (higher) value
function updatePrice() {
  const wilayaSelect = document.getElementById("wilaya");
  const deliverySelect = document.getElementById("delivery");
  const priceDisplay = document.getElementById("priceDisplay");

  const wilaya = wilayaSelect ? wilayaSelect.value : "";
  const deliveryType = deliverySelect ? deliverySelect.value : "";

  if (!wilaya || !deliveryPrices[wilaya]) {
    if (priceDisplay) priceDisplay.textContent = "2300 دج";
    return;
  }

  const prices = deliveryPrices[wilaya]; // [stopDesk, homeDelivery]

  let price;
  if (deliveryType.trim() === "توصيل إلى المنزل") {
    price = prices[1]; // second element = home (higher)
  } else {
    price = prices[0]; // first element = stop (lower)
  }

  if (price === 0) {
    priceDisplay.textContent = "غير متاح";
  } else {
    priceDisplay.textContent = price + " دج";
  }
}