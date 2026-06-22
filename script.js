// script.js

const PRODUCT_PRICE = 2300; // سعر المنتج ثابت

// أسعار التوصيل حسب الولاية ونوع التوصيل
// المفتاح: اسم الولاية (كما هو مكتوب في algeria.js)
// القيمة: { home: سعر التوصيل للمنزل, point: سعر نقطة التسليم }
const DELIVERY_PRICES = {
    "أدرار": { home: 1100, point: 600 },
    "الشلف": { home: 700, point: 400 },
    "الأغواط": { home: 900, point: 500 },
    "أم البواقي": { home: 800, point: 400 },
    "باتنة": { home: 800, point: 400 },
    "بجاية": { home: 700, point: 400 },
    "بسكرة": { home: 900, point: 500 },
    "بشار": { home: 1100, point: 600 },
    "البليدة": { home: 500, point: 250 },
    "البويرة": { home: 650, point: 400 },
    "تمنراست": { home: 1300, point: 800 },
    "تبسة": { home: 800, point: 500 },
    "تلمسان": { home: 800, point: 400 },
    "تيارت": { home: 800, point: 400 },
    "تيزي وزو": { home: 650, point: 400 },
    "الجزائر": { home: 400, point: 200 },
    "الجلفة": { home: 900, point: 500 },
    "جيجل": { home: 700, point: 400 },
    "سطيف": { home: 700, point: 400 },
    "سعيدة": { home: 800, point: 400 },
    "سكيكدة": { home: 700, point: 400 },
    "سيدي بلعباس": { home: 700, point: 400 },
    "عنابة": { home: 700, point: 400 },
    "قالمة": { home: 800, point: 400 },
    "قسنطينة": { home: 700, point: 400 },
    "المدية": { home: 600, point: 400 },
    "مستغانم": { home: 700, point: 400 },
    "المسيلة": { home: 800, point: 500 },
    "معسكر": { home: 700, point: 400 },
    "ورقلة": { home: 1000, point: 500 },
    "وهران": { home: 700, point: 400 },
    "البيض": { home: 1000, point: 500 },
    "إليزي": { home: 1300, point: 600 },
    "برج بوعريريج": { home: 700, point: 400 },
    "بومرداس": { home: 600, point: 350 },
    "الطارف": { home: 800, point: 400 },
    "تندوف": { home: 1300, point: 600 },
    "تيسمسيلت": { home: 800, point: 400 },
    "الوادي": { home: 900, point: 500 },
    "خنشلة": { home: 800, point: 500 },
    "سوق أهراس": { home: 800, point: 500 },
    "تيبازة": { home: 600, point: 350 },
    "ميلة": { home: 700, point: 400 },
    "عين الدفلى": { home: 600, point: 400 },
    "النعامة": { home: 1000, point: 500 },
    "عين تموشنت": { home: 700, point: 400 },
    "غرداية": { home: 1000, point: 500 },
    "غليزان": { home: 700, point: 400 },
    "تيميمون": { home: 1300, point: 600 },
    "أولاد جلال": { home: 900, point: 500 },
    "بني عباس": { home: 1300, point: 0 },  // بحسب القائمة 1300 / 0
    "عين صالح": { home: 1300, point: 600 },
    "تقرت": { home: 900, point: 500 },
    "المغير": { home: 900, point: 0 },      // 900 فقط (نعتبر point 0)
    "المنيعة": { home: 1000, point: 500 }
};

// ===== تحميل الولايات عند بدء الصفحة =====
window.onload = function() {
    loadWilayas();
    updatePriceSummary(); // تحديث أولي
};

function loadWilayas() {
    const wilayaSelect = document.getElementById("wilaya");
    wilayaSelect.innerHTML = '<option value="">اختر الولاية</option>';
    Object.keys(algeria).forEach(wilaya => {
        const option = document.createElement("option");
        option.value = wilaya;
        option.textContent = wilaya;
        wilayaSelect.appendChild(option);
    });
}

// ===== تحديث البلديات عند تغيير الولاية =====
function updateCommunes() {
    const wilaya = document.getElementById("wilaya").value;
    const communeSelect = document.getElementById("commune");
    communeSelect.innerHTML = '<option value="">اختر البلدية</option>';

    if (wilaya && algeria[wilaya]) {
        algeria[wilaya].forEach(commune => {
            const option = document.createElement("option");
            option.value = commune;
            option.textContent = commune;
            communeSelect.appendChild(option);
        });
    }
}

// ===== تحديث سعر التوصيل والمجموع =====
function updatePriceSummary() {
    const wilaya = document.getElementById("wilaya").value;
    const deliveryType = document.getElementById("delivery").value; // 'home' or 'point'

    let deliveryPrice = 0;
    if (wilaya && DELIVERY_PRICES[wilaya]) {
        deliveryPrice = DELIVERY_PRICES[wilaya][deliveryType] || 0;
    }

    const total = PRODUCT_PRICE + deliveryPrice;

    document.getElementById("summaryProduct").textContent = PRODUCT_PRICE + " دج";
    document.getElementById("summaryDelivery").textContent = deliveryPrice + " دج";
    document.getElementById("summaryTotal").textContent = total + " دج";

    // نعيد تحديث السعر المعروض في الهيرو (اختياري)
    document.getElementById("productPriceDisplay").textContent = total + " دج";
}

// ===== ربط الأحداث =====
document.getElementById("wilaya").addEventListener("change", function() {
    updateCommunes();
    updatePriceSummary();
});

document.getElementById("delivery").addEventListener("change", updatePriceSummary);

// ===== إرسال الطلب إلى تيليجرام =====
document.getElementById("orderForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const wilaya = document.getElementById("wilaya").value;
    const commune = document.getElementById("commune").value;
    const deliveryType = document.getElementById("delivery").value;
    const deliveryLabel = (deliveryType === 'home') ? 'توصيل إلى المنزل' : 'نقطة تسليم';

    // التحقق من الحقول الأساسية
    if (!name || !lastname || !phone || !wilaya || !commune) {
        alert("الرجاء تعبئة جميع الحقول المطلوبة.");
        return;
    }

    // حساب السعر مرة أخرى للتأكيد
    const deliveryPrice = DELIVERY_PRICES[wilaya] ? DELIVERY_PRICES[wilaya][deliveryType] : 0;
    const total = PRODUCT_PRICE + deliveryPrice;

    const message = `
🟢 طلب جديد - بودرة السدر

👤 الاسم: ${name} ${lastname}
📞 الهاتف: ${phone}
📍 الولاية: ${wilaya}
🏙 البلدية: ${commune}
🚚 نوع التوصيل: ${deliveryLabel}
💰 سعر المنتج: ${PRODUCT_PRICE} دج
🚚 تكلفة التوصيل: ${deliveryPrice} دج
💵 المجموع: ${total} دج
`;

    const botToken = "8955038552:AAH5UrtfQtNtkxIoFx7OvfRK7K1FNxV44Mk";
    const chatId = "-5334151238";

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })
    .then(res => {
        if (res.ok) {
            alert("✅ تم إرسال طلبك بنجاح! سنتصل بك قريباً 🌿");
            document.getElementById("orderForm").reset();
            // إعادة تعيين البلديات والقائمة
            loadWilayas();
            updateCommunes();
            updatePriceSummary();
        } else {
            alert("❌ حدث خطأ في الإرسال، حاول مرة أخرى.");
        }
    })
    .catch(() => {
        alert("❌ فشل الاتصال بالخادم، تأكد من اتصالك بالإنترنت.");
    });
});