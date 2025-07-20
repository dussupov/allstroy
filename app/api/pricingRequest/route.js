import {NextResponse} from 'next/server';

export async function POST(req) {
  const {name, phone, packages} = await req.json();

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const text = `
💬 Новая заявка с сайта!
👤 Имя: ${name}
📧 Телефон: ${phone}
📦 Пакет ремонта: ${packages}
  `;

  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  await fetch(telegramUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    }),
  });

  return NextResponse.json({success: true});
}
