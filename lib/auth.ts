import { SignJWT, jwtVerify } from "jose";
import { getAuthSecretKey } from "@/lib/auth-secret";

export type SessionPayload = {
    userId: string;
    email: string;
    name: string;
};

export async function createSessionToken(payload: SessionPayload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(getAuthSecretKey());
}

export async function verifySessionToken(token: string) {
    const { payload } = await jwtVerify(token, getAuthSecretKey());
    return payload as SessionPayload;
}