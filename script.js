/* ===========================================================================
   Bellum Security — sign-in portal (client-side flow only)

   This handles the two-step UX: identifier (email/username) → password.
   It does NOT authenticate anyone by itself. Wire submitCredentials() to
   your real identity provider (Entra ID / OIDC / Auth0 / your own API).

   Nothing is stored, logged, or transmitted anywhere in this file.
   =========================================================================== */

(function () {
  "use strict";

  const form           = document.getElementById("signin-form");
  const stepId         = document.getElementById("step-identifier");
  const stepPw         = document.getElementById("step-password");
  const identifier     = document.getElementById("identifier");
  const identifierErr  = document.getElementById("identifier-error");
  const password       = document.getElementById("password");
  const passwordErr    = document.getElementById("password-error");
  const nextBtn        = document.getElementById("next-btn");
  const signinBtn      = document.getElementById("signin-btn");
  const accountPill    = document.getElementById("account-pill");
  const accountName    = document.getElementById("account-name");
  const rememberRow    = document.getElementById("remember-row");

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let currentStep = "identifier";

  /* --- Step navigation --------------------------------------------------- */
  function showStep(step) {
    currentStep = step;
    const onId = step === "identifier";

    stepId.hidden      = !onId;
    stepPw.hidden      = onId;
    rememberRow.hidden = onId;
    stepId.dataset.active = String(onId);
    stepPw.dataset.active = String(!onId);

    if (onId) {
      identifier.focus();
    } else {
      accountName.textContent = identifier.value.trim();
      password.value = "";
      clearError(passwordErr, password);
      password.focus();
    }
  }

  /* --- Error helpers ----------------------------------------------------- */
  function setError(el, input, msg) {
    el.textContent = msg;
    el.hidden = false;
    input.setAttribute("aria-invalid", "true");
  }
  function clearError(el, input) {
    el.hidden = true;
    el.textContent = "";
    input.removeAttribute("aria-invalid");
  }

  /* --- Validation -------------------------------------------------------- */
  function validateIdentifier() {
    const value = identifier.value.trim();
    if (!value) {
      setError(identifierErr, identifier, "Enter your email, phone, or username.");
      return false;
    }
    // Accept an email or a plain username (>= 2 chars). Adjust to your policy.
    if (value.includes("@") && !EMAIL_RE.test(value)) {
      setError(identifierErr, identifier, "Enter a valid email address.");
      return false;
    }
    clearError(identifierErr, identifier);
    return true;
  }

  function validatePassword() {
    if (!password.value) {
      setError(passwordErr, password, "Please enter your password.");
      return false;
    }
    clearError(passwordErr, password);
    return true;
  }

  /* --- Submit handling --------------------------------------------------- */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (currentStep === "identifier") {
      if (validateIdentifier()) showStep("password");
      return;
    }

    if (currentStep === "password") {
      if (!validatePassword()) return;
      submitCredentials({
        username: identifier.value.trim(),
        password: password.value,
        remember: document.getElementById("remember").checked
      });
    }
  });

  /* --- Back to identifier ------------------------------------------------ */
  accountPill.addEventListener("click", function () {
    showStep("identifier");
  });

  /* --- Live-clear errors as the user types ------------------------------- */
  identifier.addEventListener("input", () => clearError(identifierErr, identifier));
  password.addEventListener("input", () => clearError(passwordErr, password));

  /* --- Placeholder links ------------------------------------------------- */
  ["cant-access", "forgot-password", "signin-options"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        // TODO: route these to your recovery / passkey / alt sign-in pages.
        console.info(`[bellum] "${id}" clicked — wire this to your flow.`);
      });
    }
  });

  /* =========================================================================
     submitCredentials — THE ONE PLACE TO INTEGRATE YOUR BACKEND

     Replace the body below with a real request to your identity provider.
     Always submit over HTTPS to your own server; never handle raw passwords
     in third-party client code.

     Example:
       const res = await fetch("/api/auth/login", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(creds),
         credentials: "same-origin"
       });
     ========================================================================= */
  function submitCredentials(creds) {
    signinBtn.disabled = true;
    signinBtn.textContent = "Signing in…";

    // Demo-only stub. No network call, no storage — replace with real auth.
    setTimeout(() => {
      signinBtn.disabled = false;
      signinBtn.textContent = "Sign in";
      setError(
        passwordErr,
        password,
        "This is a demo front-end. Connect submitCredentials() to your auth provider."
      );
    }, 700);
  }

  /* --- Init -------------------------------------------------------------- */
  showStep("identifier");
})();
