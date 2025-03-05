import { jwtVerify, SignJWT } from "jose";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Next.js 的中间件（Middleware）可以直接访问 cookie 并基于 session 进行路由保护或重定向。
// 如果只依赖前端请求头中的 token，中间件无法在请求到达 API 路由之前进行身份验证。而通过 session cookie，中间件可以更方便地实现全局认证逻辑。

export type SessionUser = {
  id?: string;
  name?: string;
  avatar?: string;
};

export type Session = {
  user: SessionUser;
  accessToken: string;
};

const secretKey = process.env.SESSION_SECRET_KEY!;
const encodedKey = new TextEncoder().encode(secretKey);

export const createSession = async (payload: Session) => {
  const session = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(encodedKey);

  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiredAt,
    sameSite: "lax",
    path: "/",
  });
};

export async function getSession() {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as Session;
  } catch (err) {
    console.error("Failed to verify the session: ", err);
    redirect("/auth/signin");
  }
}

export async function deleteSession() {
  await (await cookies()).delete("session");
}
