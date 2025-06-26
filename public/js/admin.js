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

document.addEventListener("DOMContentLoaded", function () {
  const form1 = document.getElementById("admincrypto");

  if (form1) {
    form1.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      try {
        const response = await fetch("/admin/upload-crypto-details", {
          method: "POST",
          body: formData,
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error("Server returned non-JSON response:\n" + text);
        }

        const result = await response.json();
        showAlert(result.message || "Upload successful", "success");

        if (result.success) {
          form.reset();
        }
      } catch (error) {
        console.error("❌ Submission failed:", error);
        showAlert("An error occurred: " + error.message, "error");
      }
    });
  } else {
    console.warn("⚠️ Form with ID 'admincrypto' not found.");
  }
});

const form = document.getElementById("Signup");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const fullname = form.fullname.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;

  if (!fullname || !email || !password) {
    showAlert("Please fill out all fields.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showAlert(data.error || "Please enter a valid email address.");
    return;
  }

  const formData = new FormData(form);

  try {
    const response = await fetch("/admin/signup", {
      method: "POST",
      body: formData,
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error("Non-JSON response:\n" + text);
    }

    const result = await response.json();
    if (result.success) {
      showAlert(result.message || "✅ Sign up successful!", "success");
      form.reset();
      window.location.href = "/admin/login";
    } else {
      showAlert("⚠️ " + (result.message || "Sign up failed."));
    }
  } catch (error) {
    console.error("❌ Error:", error);
    showAlert("An error occurred: " + error.message);
  }


  // function showAlert(message, type) {
  //   alert(message);
  // }
});
