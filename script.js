const codeInput = document.getElementById("codeInput");
const explainBtn = document.getElementById("explainBtn");
const resultArea = document.getElementById("resultArea");

explainBtn.addEventListener("click", async () => {
  const code = codeInput.value;

  if (!code.trim()) {
    resultArea.innerText = "Please paste some code first!";
    return;
  }

  resultArea.innerText = "⏳ AI is analyzing your code... Please wait.";

  // تعطيل الزر أثناء التحميل لمنع النقر المتكرر
  explainBtn.disabled = true;

  try {
    // إرسال الكود إلى الخادم الخاص بنا
    const response = await fetch("http://localhost:3000/api/explain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code }),
    });

    const data = await response.json();

    // التحقق من وجود خطأ من الخادم
    if (data.error) {
      resultArea.innerText = "❌ Error: " + data.error;
    } else {
      // عرض الشرح القادم من الذكاء الاصطناعي
      resultArea.innerText = data.explanation;
    }
  } catch (error) {
    resultArea.innerText = "❌ Connection error. Is the server running?";
  } finally {
    // إعادة تفعيل الزر بعد انتهاء العملية
    explainBtn.disabled = false;
  }
});
