document.addEventListener("DOMContentLoaded", () => {
    fetch("https://www.f232e6c6-0d39-457d-956a-42ef6e8fff59-00-3bgx654x4kes0.pike.replit.dev/api/admin/orders")

        .then((res) => res.json())
        .then((data) => {
            const container = document.getElementById("pesanan-container");
            container.innerHTML = "";

            if (!data.length) {
                container.innerHTML = "<p class='text-gray-600'>Belum ada pesanan.</p>";
                return;
            }

            data.reverse().forEach((order) => {
                const statusColor =
                    order.status === "settlement" ? "text-green-600" : "text-red-500";

                container.innerHTML += `
          <div class="bg-white shadow rounded p-4 mb-6">
            <div class="flex justify-between items-center border-b pb-2">
              <div class="font-semibold text-gray-700">${order.name}</div>
              <div class="${statusColor} font-medium">${order.status.toUpperCase()}</div>
            </div>
            <div class="mt-4">
              <p class="text-gray-700">Metode Pembayaran: <strong>${order.method}</strong></p>
              <p class="text-gray-700">Email: ${order.email}</p>
              <p class="text-gray-700">Nomor HP: ${order.phone}</p>
              <p class="text-gray-700 mt-2">Total: <span class="text-red-600 font-semibold">Rp${Number(order.amount).toLocaleString()}</span></p>
              <p class="text-gray-500 text-sm">Dibayar pada: ${new Date(order.paid_at).toLocaleString("id-ID")}</p>
            </div>
            <div class="flex justify-end mt-4">
              <button class="px-4 py-1 border rounded text-gray-600">Beli Lagi</button>
            </div>
          </div>
        `;
            });
        })
        .catch((err) => {
            console.error("Gagal memuat pesanan:", err);
            document.getElementById("pesanan-container").innerHTML =
                "<p class='text-red-600'>Gagal memuat data pesanan.</p>";
        });
});
