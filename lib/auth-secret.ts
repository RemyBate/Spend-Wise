/** JWT signing key — read at call time so dev/server routes and proxy stay aligned. */
export function getAuthSecretKey(): Uint8Array {
    const secret = process.env.AUTH_SECRET;
    if (!secret) {
        throw new Error("AUTH_SECRET is not set. Add it to your .env file.");
    }
    return new TextEncoder().encode(secret);
}
