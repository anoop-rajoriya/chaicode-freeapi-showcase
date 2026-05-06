import "./style.css";

const api_base = "https://api.freeapi.app/api/v1/users";

// services
class Service {
  static async register(fields) {
    const url = `${api_base}/register`;
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(fields),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return { data: data.data, message: data.message };
  }
}

// utils
function setLoading(btn, state) {
  const button = document.getElementById(btn);
  button.setAttribute("disabled", state);
  if (state) {
    button.orig = button.innerHTML;
    button.innerHTML = "Processing";
  } else {
    button.innerHTML = button.orig || button.innerHTML;
  }
}

let toastTimer;
function toast(message, type = "success") {
  const toastEl = document.getElementById("toast");

  if (!toastEl) {
    console.warn("Toast element not found in the DOM.");
    return;
  }

  clearTimeout(toastTimer);

  toastEl.classList.remove(
    "text-green-400",
    "border-green-500/30",
    "text-red-400",
    "border-red-500/30",
    "text-neutral-100",
    "border-neutral-700",
  );

  if (type === "error") {
    toastEl.classList.add("text-red-400", "border-red-500/30");
  } else if (type === "success") {
    toastEl.classList.add("text-green-400", "border-green-500/30");
  } else {
    toastEl.classList.add("text-neutral-100", "border-neutral-700");
  }

  toastEl.textContent = message;

  toastTimer = setTimeout(() => {
    toastEl.textContent = ""; // empty:hidden immediately hides it
  }, 3000);
}

// Switch Forms
function switchForm(selector) {
  ["screen-login", "screen-register"].forEach((id) => {
    const elm = document.getElementById(id);
    elm.classList.toggle("hidden", !id.includes(selector));
  });
}
document.getElementById("register-toggle").addEventListener("click", () => {
  switchForm("login");
});
document.getElementById("login-toggle").addEventListener("click", () => {
  switchForm("register");
});

// handler
async function handleRegister(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const fields = Object.fromEntries(formData.entries());
  setLoading("register-btn", true);
  try {
    const res = await Service.register(fields);
    toast("Users registered successfully", "success");
    switchForm("login");
  } catch (error) {
    console.error(error);
    toast(error.message, "error");
  } finally {
    setLoading("register-btn", false);
  }
}

async function handleLogin(event) {}

document
  .querySelector("#screen-register form")
  .addEventListener("submit", handleRegister);
document
  .querySelector("#screen-login form")
  .addEventListener("submit", handleLogin);
