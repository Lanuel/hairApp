import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((request) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const isLoginPage = pathname === "/admin/login";
  const isAuthenticated = request.auth?.user?.role === "admin";

  if (!isAuthenticated && !isLoginPage) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("callbackUrl", `${pathname}${url.search}`);

    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
});

export const config = {
  matcher: "/admin/:path*",
};
