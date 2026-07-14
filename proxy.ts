// proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

/**
 * Next.js 16+ 使用 proxy 替代 middleware
 * 功能：保护 /admin/* 和 /api/admin/* 路由
 */
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 只保护管理后台及其 API
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const token = request.cookies.get('token')?.value;

    // 如果没有 token，重定向到登录页（页面请求）或返回 401（API 请求）
    if (!token) {
      if (pathname.startsWith('/api/admin')) {
        return new NextResponse(
          JSON.stringify({ error: '未登录，请先登录' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // 验证 token 是否有效
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        console.error('❌ JWT_SECRET 未在环境变量中配置！');
        if (pathname.startsWith('/api/admin')) {
          return new NextResponse(
            JSON.stringify({ error: '服务器配置错误' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
        }
        return NextResponse.redirect(new URL('/login', request.url));
      }

      jwt.verify(token, secret);
      return NextResponse.next(); // ✅ token 有效，放行
    } catch (error) {
      console.error('❌ Token 验证失败:', error);
      // token 无效，清除 cookie 并重定向到登录页
      const response = pathname.startsWith('/api/admin')
        ? new NextResponse(
            JSON.stringify({ error: '登录已过期，请重新登录' }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
          )
        : NextResponse.redirect(new URL('/login', request.url));

      // 清除无效的 token cookie
      response.cookies.set('token', '', { maxAge: 0, path: '/' });
      return response;
    }
  }

  // 其他公开路径直接放行
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    // 注意：不包含 /api/public，它是完全公开的
  ],
};