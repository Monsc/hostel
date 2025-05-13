# Joy Hostel 全栈青旅预订系统

一个现代化的青旅预订系统，支持在线预订、支付和管理。

## 技术栈

- 前端：React + Tailwind CSS
- 后端：Cloudflare Workers
- 数据库：MongoDB
- 支付：Stripe
- 部署：Cloudflare Pages
- 邮件：Zoho SMTP

## 功能特性

- 🏠 房型展示与预订
- 💳 Stripe 在线支付
- 📧 自动发送入住指南
- 👥 多语言支持（中文/英文）
- 🔐 管理后台
- 📊 房态管理
- 📱 响应式设计

## 本地开发

1. 克隆仓库
```bash
git clone [repository-url]
cd hostel
```

2. 安装依赖
```bash
# 前端
cd frontend
npm install

# Worker
cd ../worker
npm install
```

3. 配置环境变量
```bash
cp .env.example .env
# 编辑 .env 文件，填入必要的配置信息
```

4. 启动开发服务器
```bash
# 前端
cd frontend
npm run dev

# Worker
cd ../worker
npm run dev
```

## 部署

1. 前端部署到 Cloudflare Pages
2. Worker 部署到 Cloudflare Workers
3. 配置 Stripe Webhook
4. 设置 MongoDB 连接

## 环境变量

- `MONGODB_URI`: MongoDB 连接字符串
- `STRIPE_SECRET_KEY`: Stripe 密钥
- `STRIPE_WEBHOOK_SECRET`: Stripe Webhook 密钥
- `ZOHO_SMTP_USER`: Zoho 邮箱账号
- `ZOHO_SMTP_PASS`: Zoho 邮箱密码
- `ADMIN_EMAIL`: 管理员邮箱
- `ADMIN_PASSWORD`: 管理员密码

## 许可证

MIT