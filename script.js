/**
 * EmployeeDex — Client-side JavaScript
 * Handles: password toggle, delete confirmation, flash auto-dismiss,
 *          form validation, keyboard shortcuts
 */

// ── Toggle password visibility on login page ─────────────────────────
function togglePassword() {
    const input = document.getElementById("password");
    const icon = document.getElementById("eyeIcon");
    if (!input || !icon) return;
    if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

// ── Delete confirmation ──────────────────────────────────────────────
function confirmDelete(name) {
    return confirm(`Delete "${name}"?\nThis action cannot be undone.`);
}

// ── DOM-ready logic ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {

    // Auto-dismiss flash messages after 5 seconds
    document.querySelectorAll(".flash-msg").forEach((el) => {
        setTimeout(() => {
            el.style.transition = "opacity 0.4s, transform 0.4s";
            el.style.opacity = "0";
            el.style.transform = "translateX(100%)";
            setTimeout(() => el.remove(), 400);
        }, 5000);
    });

    // Form validation
    const form = document.getElementById("employeeForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            const salary = document.getElementById("salary");
            if (salary && Number(salary.value) < 0) {
                e.preventDefault();
                alert("Salary cannot be negative.");
                salary.focus();
                return false;
            }
            const phone = document.getElementById("phone");
            if (phone && !/^\d{10,15}$/.test(phone.value.replace(/[\s\-]/g, ""))) {
                e.preventDefault();
                alert("Please enter a valid phone number (10–15 digits).");
                phone.focus();
                return false;
            }
        });
    }

    // Keyboard shortcut: "/" to focus search bar
    document.addEventListener("keydown", (e) => {
        const tag = document.activeElement.tagName;
        if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA" && tag !== "SELECT") {
            e.preventDefault();
            const search = document.querySelector('input[name="search"]');
            if (search) search.focus();
        }
    });
});
