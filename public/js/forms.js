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

document
  .getElementById("crypto")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const form1 = e.target;
    const submitBtn = form1.querySelector("button[type='submit']");
    const originalText = submitBtn.innerHTML;

    // 🔄 Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Please wait...";

    const formData = new FormData(form1);

    try {
      const response = await fetch("/donate/crypto", {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error("Server returned non-JSON response:\n" + text);
      }

      const result = await response.json();
      showAlert(result.message || "Thank you for your donation", "success");

      if (result.success) form1.reset();
    } catch (error) {
      console.error("❌ Submission failed:", error);
      showAlert("An error occurred: " + error.message, "error");
    } finally {
      // ✅ Restore button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });

document
  .getElementById("gift-card")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const form2 = e.target;
    const submitBtn = form2.querySelector("button[type='submit']");
    const originalText = submitBtn.innerHTML;

    // 🔄 Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Please wait...";

    const formData = new FormData(form2);

    try {
      const response = await fetch("/donate/giftcard", {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error("Server returned non-JSON response:\n" + text);
      }

      const result = await response.json();
      showAlert(result.message || "Thank you for your donation!", "success");

      if (result.success) {
        form2.reset();
      }
    } catch (error) {
      console.error("❌ Submission failed:", error);
      showAlert("An error occurred: " + error.message, "error");
    } finally {
      // ✅ Restore button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });

document
  .getElementById("leave-a-message")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("/message", {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error("Server returned non-JSON response:\n" + text);
      }

      const result = await response.json();
      showAlert(result.message || "Message delivered!", "success");

      if (result.success) {
        form.reset();
      }
    } catch (error) {
      console.error("❌ Submission failed:", error);
      showAlert("An error occurred: " + error.message, "error");
    }
  });

document
  .getElementById("newsletter")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("/newsletter", {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error("Server returned non-JSON response:\n" + text);
      }

      const result = await response.json();
      showAlert(result.message || "subscribed successfully!", "success");

      if (result.success) {
        form.reset();
      }
    } catch (error) {
      console.error("❌ Submission failed:", error);
      showAlert("An error occurred: " + error.message, "error");
    }
  });
