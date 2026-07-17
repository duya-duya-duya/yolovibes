// app/commission/postcards/page.tsx
// 确保文件顶部没有 'use client' 指令

import InteractiveOrderForm from './InteractiveOrderForm';

// 在服务端获取配置数据
async function getConfig(type: string) {
    // ... 你原有的数据获取逻辑
}

export default async function CommissionPage() {
    const type = 'tapes';
    const config = await getConfig(type);

    // 将数据作为 props 传递给客户端组件
    return <InteractiveOrderForm config={config} type={type} />;
}

// generateStaticParams 现在可以安全地在这里使用了
export async function generateStaticParams() {
    // ... 你原有的静态路径生成逻辑
    // 注意：即使这里返回空数组也可能导致构建错误[reference:6]
    // 建议确保它至少返回一个有效的路径参数
    return [{ type: 'tapes' }];
}