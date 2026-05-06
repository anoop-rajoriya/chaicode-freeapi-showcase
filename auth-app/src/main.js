import "./style.css";

const api_base = "https://api.freeapi.app/api/v1/users";

// state with localstorage
const state = {
  key: "freeapi-auth",
  data: {
    accessToken: null,
    refreshToken: null,
    user: null,
  },
  fetch() {
    const storedData = localStorage.getItem(this.key);
    if (storedData) {
      this.data = { ...this.data, ...JSON.parse(storedData) };
    }
  },
  save() {
    localStorage.setItem(this.key, JSON.stringify(this.data));
  },
  clear() {
    localStorage.clear(this.key);
    this.data.refreshToken = null;
    this.data.accessToken = null;
    this.data.user = null;
  },
};

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

  static async login(fields) {
    const url = `${api_base}/login`;
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

  static async getUser() {
    const url = `${api_base}/current-user`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${state.data.accessToken}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return { data: data.data, message: data.message };
  }

  static async logout() {
    const url = `${api_base}/logout`;
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${state.data.accessToken}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return { message: data.message };
  }
}

// utils
function setLoading(btn, state) {
  const button = document.getElementById(btn);

  button.disabled = state;

  if (state) {
    button.orig = button.innerHTML;
    button.innerHTML = "Processing...";
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

function switchScreen(selector) {
  ["screen-login", "screen-register", "screen-profile"].forEach((id) => {
    const elm = document.getElementById(id);
    if (elm) {
      elm.classList.toggle("hidden", id !== `screen-${selector}`);
    }
  });
}

async function loadProfile() {
  const { data } = await Service.getUser();
  // Guard clause in case empty data is passed
  if (!data) {
    console.error("No data provided to loadProfile");
    throw new Error("No data provided to loadProfile");
  }

  // 1. Update Avatar
  const avatarImg = document.getElementById("profile-avatar-img");
  const avatarFallback = document.getElementById("profile-avatar-fallback");

  if (avatarFallback) {
    avatarFallback.textContent = data.username.charAt(0);
  }

  if (avatarImg && data.avatar && data.avatar.url) {
    // If we have a URL, try to load it
    avatarImg.src = data.avatar.url;
    avatarImg.classList.remove("hidden");

    // CRITICAL: If the image link is broken, hide the image element
    // so the letter fallback underneath becomes visible again.
    avatarImg.onerror = () => {
      avatarImg.classList.add("hidden");
    };
  } else if (avatarImg) {
    // If no URL exists in the data, ensure the image is hidden
    avatarImg.classList.add("hidden");
  }

  // 2. Update Basic Text Information
  // Using the logical OR (||) operator to provide fallbacks if data is missing
  document.getElementById("profile-username").textContent =
    data.username || "Unknown";
  document.getElementById("profile-email").textContent = data.email || "N/A";
  document.getElementById("profile-role").textContent = data.role || "N/A";
  document.getElementById("profile-login-type").textContent =
    data.loginType || "N/A";
  document.getElementById("profile-id").textContent = data._id || "N/A";

  // 3. Format and Update Created Date
  const createdEl = document.getElementById("profile-created");
  if (createdEl && data.createdAt) {
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(data.createdAt).toLocaleDateString(
      "en-US",
      dateOptions,
    );
    createdEl.textContent = formattedDate;
  }

  // 4. Handle Email Verified Status (with dynamic Tailwind colors)
  const verifiedEl = document.getElementById("profile-verified");
  if (verifiedEl) {
    if (data.isEmailVerified) {
      verifiedEl.textContent = "True";
      // Swap to a green success color
      verifiedEl.className = "text-emerald-400 font-medium";
    } else {
      verifiedEl.textContent = "False";
      // Keep the red/rose warning color
      verifiedEl.className = "text-rose-400 font-medium";
    }
  }
}

// handlers
async function handleRegister(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const fields = Object.fromEntries(formData.entries());
  setLoading("register-btn", true);
  try {
    const res = await Service.register(fields);
    toast("Users registered successfully", "success");
    switchScreen("login");
  } catch (error) {
    console.error(error);
    toast(error.message, "error");
  } finally {
    setLoading("register-btn", false);
  }
}

async function handleLogin(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const fields = Object.fromEntries(formData.entries());
  setLoading("login-btn", true);

  try {
    const res = await Service.login(fields);
    const { accessToken, refreshToken, user } = res.data;
    state.data.accessToken = accessToken;
    state.data.refreshToken = refreshToken;
    state.data.user = user;
    state.save();
    toast("User logged in successfully", "success");
    switchScreen("profile");
  } catch (error) {
    console.error(error);
    toast(error.message, "error");
  } finally {
    setLoading("login-btn", false);
  }
}

async function handleLogout(event) {
  try {
    setLoading("logout-btn", true);
    const res = await Service.logout();
    toast(res.message, "success");
    state.clear();
    switchScreen("login");
  } catch (error) {
    console.error(error);
    toast(error.message, "error");
  } finally {
    setLoading("logout-btn", false);
  }
}

// Event registration
document
  .querySelector("#screen-register form")
  .addEventListener("submit", handleRegister);
document
  .querySelector("#screen-login form")
  .addEventListener("submit", handleLogin);

document.getElementById("register-toggle").addEventListener("click", () => {
  switchScreen("login");
});
document.getElementById("login-toggle").addEventListener("click", () => {
  switchScreen("register");
});

document.getElementById("logout-btn").addEventListener("click", handleLogout);

// main logic
try {
  state.fetch();

  // Only attempt to load the profile if an access token actually exists
  if (state.data.accessToken) {
    await loadProfile();
    switchScreen("profile");
  } else {
    // No token? Go straight to login/register without hitting the API
    switchScreen("login");
  }
} catch (error) {
  console.error("Session expired or invalid:", error);
  state.clear(); // Clear the bad tokens
  switchScreen("login");
}
