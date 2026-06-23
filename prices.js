// prices.js
const deliveryPrices = {
  // Wilaya: [homeDelivery, stopDesk]
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

// Get delivery price for a wilaya
function getDeliveryPrice(wilaya, deliveryType) {
  const prices = deliveryPrices[wilaya];
  if (!prices) return [null, null];
  return prices;
}

// Update price display
function updatePrice() {
  const wilaya = document.getElementById("wilaya").value;
  const delivery = document.getElementById("delivery").value;
  const priceDisplay = document.getElementById("priceDisplay");

  if (!wilaya || !deliveryPrices[wilaya]) {
    priceDisplay.textContent = "2300 دج";
    return;
  }

  const prices = deliveryPrices[wilaya];
  let price = delivery === "توصيل إلى المنزل" ? prices[1] : prices[0];
  
  if (price === 0) {
    priceDisplay.textContent = "غير متاح";
  } else {
    priceDisplay.textContent = price + " دج";
  }
}