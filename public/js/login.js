document.addEventListener("DOMContentLoaded", async function () {
  const customAlertModal = document.getElementById("customAlertModal");
  const customAlertMessage = document.getElementById("customAlertMessage");
  const customAlertCloseButton = document.getElementById(
    "customAlertCloseButton"
  );
  function showAlert(message, type = "info") {
    customAlertMessage.textContent = message;

    if (type === "success") {
      customAlertMessage.classList.remove("text-red-700");
      customAlertMessage.classList.add("text-green-700");
    } else if (type === "error") {
      customAlertMessage.classList.remove("text-green-700");
      customAlertMessage.classList.add("text-red-700");
    } else {
      customAlertMessage.classList.remove("text-green-700", "text-red-700");
      customAlertMessage.classList.add("text-gray-800");
    }
    customAlertModal.classList.remove("hidden");
  }

  function hideAlert() {
    customAlertModal.classList.add("hidden");
  }

  if (customAlertCloseButton) {
    customAlertCloseButton.addEventListener("click", hideAlert);
  }

  const loginform = document.getElementById("admin-login-form");
  loginform.addEventListener("submit", async function (e) {
    e.preventDefault();

    try {
      const data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };

      const response = await fetch("/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      showAlert(result.message || "Login successful!", "success");

      if (result.success) {
        console.log("✅ Redirecting to /admin...");
        setTimeout(() => {
          window.location.href = "/admin/";
        }, 1000);
      }
    } catch (error) {
      console.error("❌ Login failed:", error);
      showAlert("An error occurred: " + error.message, "error");
    }
  });
});
