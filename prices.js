// prices.js
const deliveryPrices = {
  // Each wilaya: [homeDelivery, stopDesk]
  // Note: we store [home, stop] but we'll swap in the function
  "أدرار": [1100, 600],
  "الشلف": [700, 400],
  "الأغواط": [900, 500],
  "أم البواقي": [800, 400],
  "باتنة": [800, 400],
  "بجاية": [700, 400],
  "بسكرة": [900, 500],
  "بشار": [1100, 600],
  "البليدة": [500, 250],
  "البويرة": [650, 400],
  "تمنراست": [1300, 800],
  "تبسة": [800, 500],
  "تلمسان": [800, 400],
  "تيارت": [800, 400],
  "تيزي وزو": [650, 400],
  "الجزائر": [400, 200],
  "الجلفة": [900, 500],
  "جيجل": [700, 400],
  "سطيف": [700, 400],
  "سعيدة": [800, 400],
  "سكيكدة": [700, 400],
  "سيدي بلعباس": [700, 400],
  "عنابة": [700, 400],
  "قالمة": [800, 400],
  "قسنطينة": [700, 400],
  "المدية": [600, 400],
  "مستغانم": [700, 400],
  "المسيلة": [800, 500],
  "ماسكارا": [700, 400],
  "ورقلة": [1000, 500],
  "وهران": [700, 400],
  "البيض": [1000, 500],
  "إليزي": [1300, 600],
  "برج بوعريريج": [700, 400],
  "بومرداس": [600, 350],
  "الطارف": [800, 400],
  "تندوف": [1300, 600],
  "تيسمسيلت": [800, 400],
  "الوادي": [900, 500],
  "خنشلة": [800, 500],
  "سوق أهراس": [800, 500],
  "تيبازة": [600, 350],
  "ميلة": [700, 400],
  "عين الدفلى": [600, 400],
  "النعامة": [1000, 500],
  "عين تموشنت": [700, 400],
  "غرداية": [1000, 500],
  "غليزان": [700, 400],
  "تيميمون": [1300, 600],
  "أولاد جلال": [900, 500],
  "بني عباس": [1300, 0],
  "عين صالح": [1300, 600],
  "توقرت": [900, 500],
  "المغير": [900, 0],
  "المنيعة": [1000, 500]
};

// Helper: get prices array for a wilaya
function getDeliveryPrice(wilaya) {
  return deliveryPrices[wilaya] || null;
}

// Update price display – changed places: home delivery uses the SECOND value (prices[1]),
// stop desk uses the FIRST (prices[0]). This ensures home delivery gets the higher price.
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

  const prices = deliveryPrices[wilaya]; // [home, stop] but we swap in the logic

  let price;
  if (deliveryType.trim() === "توصيل إلى المنزل") {
    price = prices[1]; // second element (now the higher one)
  } else {
    price = prices[0]; // first element (now the lower one)
  }

  if (price === 0) {
    priceDisplay.textContent = "غير متاح";
  } else {
    priceDisplay.textContent = price + " دج";
  }
}