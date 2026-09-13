(() => {
  // Authentication endpoint can be changed when the Billing Desk backend is connected.
  const AUTH_ENDPOINT = "/api/auth/login";
  const form = document.getElementById("staffLoginForm");
  const email = document.getElementById("loginEmail");
  const password = document.getElementById("loginPassword");
  const submit = document.getElementById("loginSubmit");
  const message = document.getElementById("loginMessage");
  const toggle = document.getElementById("togglePassword");

  toggle?.addEventListener("click", () => {
    const visible = password.type === "text";
    password.type = visible ? "password" : "text";
    toggle.textContent = visible ? "Show" : "Hide";
    toggle.setAttribute("aria-label", visible ? "Show password" : "Hide password");
  });

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    message.textContent = "";
    message.className = "login-message";
    if (!email.value.trim() || !password.value) {
      message.textContent = "Please enter your username and password.";
      message.classList.add("error");
      (!email.value.trim() ? email : password).focus();
      return;
    }
    submit.disabled = true;
    submit.classList.add("loading");
    submit.querySelector("span").textContent = "…";
    try {
      const response = await fetch(AUTH_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email.value.trim(), password: password.value })
      });
      let data = {};
      try { data = await response.json(); } catch (_) {}
      if (!response.ok) throw new Error(data.message || data.error || "Invalid login details.");
      if (data.accessToken) sessionStorage.setItem("jhuk_access_token", data.accessToken);
      if (data.refreshToken) sessionStorage.setItem("jhuk_refresh_token", data.refreshToken);
      message.textContent = "Login successful. Redirecting…";
      message.classList.add("success");
      window.location.href = data.redirect || "billing/";
    } catch (error) {
      message.textContent = error.message === "Failed to fetch" ? "Login service is currently unavailable." : error.message;
      message.classList.add("error");
    } finally {
      submit.disabled = false;
      submit.classList.remove("loading");
      submit.querySelector("span").textContent = "→";
    }
  });
})();
