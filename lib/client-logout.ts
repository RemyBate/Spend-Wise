/** Shared browser logout: clears cookie + localStorage and sends user to login. */
export async function performClientLogout() {
    try {
        await fetch("/api/logout", {
            method: "POST",
            credentials: "include",
        });
    } catch {
        /* still clear local session */
    }
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
}
