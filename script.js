document.addEventListener("DOMContentLoaded", () => {
    const daySelect = document.getElementById("day");
    const monthSelect = document.getElementById("month");
    const yearSelect = document.getElementById("year");
    const reviewCard = document.getElementById("reviewCard");
    const resultCard = document.getElementById("resultCard");
    const reviewDate = document.getElementById("reviewDate");
    const ageResult = document.getElementById("ageResult");
    const daysResult = document.getElementById("daysResult");

    // Isi opsi tanggal, bulan, dan tahun
    for (let i = 1; i <= 31; i++) daySelect.innerHTML += `<option value="${i}">${i}</option>`;
    for (let i = 1; i <= 12; i++) monthSelect.innerHTML += `<option value="${i}">${i}</option>`;
    for (let i = 1900; i <= new Date().getFullYear(); i++) yearSelect.innerHTML += `<option value="${i}">${i}</option>`;

    // Handle form submission
    document.getElementById("ageForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const day = daySelect.value;
        const month = monthSelect.value;
        const year = yearSelect.value;
        reviewDate.textContent = `${day}-${month}-${year}`;
        reviewCard.style.display = "block";
    });

    // Handle konfirmasi
    document.getElementById("confirmBtn").addEventListener("click", async () => {
        const day = daySelect.value;
        const month = monthSelect.value;
        const year = yearSelect.value;

        // Kirim data ke server
        const response = await fetch("/api/calculate-age", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ day, month, year }),
        });

        const data = await response.json();
        ageResult.textContent = `${data.age} tahun`;
        daysResult.textContent = `${data.days} hari`;
        resultCard.style.display = "block";
        reviewCard.style.display = "none";
    });

    // Handle edit
    document.getElementById("editBtn").addEventListener("click", () => {
        reviewCard.style.display = "none";
    });
});
})
