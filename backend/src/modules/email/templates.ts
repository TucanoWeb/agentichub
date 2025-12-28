export const createWelcomeEmailTemplate = (userEmail: string) => ({
  subject: '🎉 Bem-vindo ao AgenticHub!',
  html: `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bem-vindo ao AgenticHub</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background-color: #f8fafc;
          line-height: 1.6;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #2F58CD 0%, #36E2B2 100%);
          color: white;
          text-align: center;
          padding: 40px 20px;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
        }
        .header .subtitle {
          margin: 8px 0 0;
          font-size: 16px;
          opacity: 0.9;
        }
        .content {
          padding: 40px 30px;
        }
        .welcome-message {
          text-align: center;
          margin-bottom: 30px;
        }
        .welcome-message h2 {
          color: #1e293b;
          font-size: 24px;
          margin: 0 0 10px;
        }
        .welcome-message p {
          color: #64748b;
          font-size: 16px;
          margin: 0;
        }
        .features {
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          border-radius: 8px;
          padding: 25px;
          margin: 30px 0;
        }
        .features h3 {
          color: #2F58CD;
          font-size: 18px;
          margin: 0 0 20px;
          text-align: center;
        }
        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .feature-list li {
          padding: 8px 0;
          color: #475569;
          font-size: 15px;
          display: flex;
          align-items: center;
        }
        .feature-list li::before {
          content: "✨";
          margin-right: 10px;
          font-size: 16px;
        }
        .cta-button {
          text-align: center;
          margin: 30px 0;
        }
        .cta-button a {
          display: inline-block;
          background: linear-gradient(135deg, #2F58CD 0%, #36E2B2 100%);
          color: white;
          text-decoration: none;
          padding: 15px 30px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          transition: transform 0.2s;
        }
        .cta-button a:hover {
          transform: translateY(-2px);
        }
        .footer {
          background-color: #f8fafc;
          text-align: center;
          padding: 25px 30px;
          border-top: 1px solid #e2e8f0;
        }
        .footer p {
          color: #64748b;
          font-size: 14px;
          margin: 5px 0;
        }
        .footer .social-links {
          margin: 15px 0 0;
        }
        .footer .social-links a {
          color: #36E2B2;
          text-decoration: none;
          margin: 0 10px;
          font-weight: 500;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>🚀 AgenticHub</h1>
          <p class="subtitle">Conectando desenvolvedores com o futuro da programação</p>
        </div>
        
        <div class="content">
          <div class="welcome-message">
            <h2>Bem-vindo à comunidade!</h2>
            <p>Estamos muito felizes em tê-lo conosco no AgenticHub.</p>
          </div>
          
          <div class="features">
            <h3>O que você pode fazer agora:</h3>
            <ul class="feature-list">
              <li>Explorar repositórios curados para agentes AI</li>
              <li>Favoritar projetos que interessam você</li>
              <li>Usar templates de prompts otimizados</li>
              <li>Acessar documentação especializada</li>
              <li>Contribuir com novos repositórios</li>
            </ul>
          </div>
          
          <div class="cta-button">
            <a href="http://localhost:5173" target="_blank">🔥 Começar a Explorar</a>
          </div>
          
          <p style="text-align: center; color: #64748b; font-size: 15px; margin-top: 30px;">
            Seu email: <strong>${userEmail}</strong><br>
            Você já pode fazer login e começar a usar a plataforma!
          </p>
        </div>
        
        <div class="footer">
          <p><strong>AgenticHub</strong> - Plataforma Open Source</p>
          <p>Desenvolvido com 💙 para a comunidade de desenvolvedores</p>
          <div class="social-links">
            <a href="https://github.com/TucanoWeb" target="_blank">GitHub</a>
            <a href="https://www.linkedin.com/in/eric-ricielle-2aa1ba237/" target="_blank">LinkedIn</a>
          </div>
          <p style="font-size: 12px; margin-top: 20px;">
            Se você tem dúvidas, responda este email ou entre em contato conosco.
          </p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
    🎉 Bem-vindo ao AgenticHub!

    Olá!

    Estamos muito felizes em tê-lo conosco no AgenticHub - a plataforma que conecta desenvolvedores com o futuro da programação usando agentes AI.

    Seu email: ${userEmail}

    O que você pode fazer agora:
    ✨ Explorar repositórios curados para agentes AI
    ✨ Favoritar projetos que interessam você
    ✨ Usar templates de prompts otimizados
    ✨ Acessar documentação especializada
    ✨ Contribuir com novos repositórios

    Acesse a plataforma: http://localhost:5173

    Você já pode fazer login e começar a usar todas as funcionalidades!

    ---
    AgenticHub - Plataforma Open Source
    Desenvolvido com 💙 para a comunidade de desenvolvedores

    Se você tem dúvidas, responda este email ou entre em contato conosco.
  `
});

export const createAdminNotificationTemplate = (userEmail: string) => ({
  subject: '👤 Novo usuário cadastrado no AgenticHub',
  html: `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Novo usuário - AgenticHub</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background-color: #f8fafc;
          line-height: 1.6;
        }
        .email-container {
          max-width: 500px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          color: white;
          text-align: center;
          padding: 30px 20px;
        }
        .header h1 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
        }
        .content {
          padding: 30px;
        }
        .notification-box {
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          border: 1px solid #10b981;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          text-align: center;
        }
        .notification-box .icon {
          font-size: 32px;
          margin-bottom: 10px;
        }
        .notification-box h2 {
          color: #065f46;
          font-size: 18px;
          margin: 0 0 10px;
        }
        .user-info {
          background-color: #f8fafc;
          border-radius: 8px;
          padding: 15px;
          margin: 20px 0;
        }
        .user-info p {
          margin: 5px 0;
          color: #475569;
        }
        .user-info strong {
          color: #1e293b;
        }
        .stats {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border-radius: 8px;
          padding: 15px;
          margin: 20px 0;
        }
        .stats p {
          margin: 5px 0;
          color: #92400e;
          text-align: center;
          font-size: 14px;
        }
        .footer {
          background-color: #f8fafc;
          text-align: center;
          padding: 20px;
          border-top: 1px solid #e2e8f0;
        }
        .footer p {
          color: #64748b;
          font-size: 12px;
          margin: 0;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>🔔 Notificação - AgenticHub</h1>
        </div>
        
        <div class="content">
          <div class="notification-box">
            <div class="icon">👤</div>
            <h2>Novo usuário cadastrado!</h2>
            <p>Um novo desenvolvedor se juntou à comunidade AgenticHub.</p>
          </div>
          
          <div class="user-info">
            <p><strong>Email:</strong> ${userEmail}</p>
            <p><strong>Data/Hora:</strong> ${new Date().toLocaleString('pt-BR')}</p>
            <p><strong>Plataforma:</strong> AgenticHub</p>
          </div>
          
          <div class="stats">
            <p><strong>📊 Lembre-se de acompanhar:</strong></p>
            <p>• Métricas de crescimento da base de usuários</p>
            <p>• Engajamento dos novos usuários</p>
            <p>• Feedback e sugestões da comunidade</p>
          </div>
        </div>
        
        <div class="footer">
          <p>Esta é uma notificação automática do sistema AgenticHub</p>
          <p>Administração • suporte@tucanoweb.com.br</p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
    🔔 Novo usuário cadastrado no AgenticHub

    Um novo desenvolvedor se juntou à comunidade AgenticHub!

    Informações do usuário:
    📧 Email: ${userEmail}
    📅 Data/Hora: ${new Date().toLocaleString('pt-BR')}
    🖥️ Plataforma: AgenticHub

    📊 Lembre-se de acompanhar:
    • Métricas de crescimento da base de usuários
    • Engajamento dos novos usuários
    • Feedback e sugestões da comunidade

    ---
    Esta é uma notificação automática do sistema AgenticHub
    Administração • suporte@tucanoweb.com.br
  `
});

export const createPasswordResetTemplate = (token: string) => ({
  subject: '🔐 Reset de senha - AgenticHub',
  html: `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset de senha - AgenticHub</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background-color: #f8fafc;
          line-height: 1.6;
        }
        .email-container {
          max-width: 500px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%);
          color: white;
          text-align: center;
          padding: 30px 20px;
        }
        .header h1 {
          margin: 0;
          font-size: 22px;
          font-weight: 600;
        }
        .content {
          padding: 30px;
        }
        .warning-box {
          background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
          border: 1px solid #f87171;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          text-align: center;
        }
        .warning-box .icon {
          font-size: 32px;
          margin-bottom: 10px;
        }
        .warning-box p {
          color: #7f1d1d;
          margin: 0;
          font-size: 15px;
        }
        .token-box {
          background-color: #1e293b;
          border-radius: 8px;
          padding: 20px;
          margin: 25px 0;
          text-align: center;
        }
        .token-box .token-label {
          color: #94a3b8;
          font-size: 14px;
          margin-bottom: 10px;
        }
        .token-box .token {
          color: #36E2B2;
          font-family: 'Courier New', monospace;
          font-size: 16px;
          font-weight: bold;
          word-break: break-all;
          line-height: 1.4;
        }
        .instructions {
          background-color: #f1f5f9;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .instructions h3 {
          color: #2F58CD;
          font-size: 16px;
          margin: 0 0 15px;
        }
        .instructions ol {
          color: #475569;
          font-size: 14px;
          margin: 0;
          padding-left: 20px;
        }
        .instructions li {
          margin-bottom: 8px;
        }
        .footer {
          background-color: #f8fafc;
          text-align: center;
          padding: 20px;
          border-top: 1px solid #e2e8f0;
        }
        .footer p {
          color: #64748b;
          font-size: 12px;
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>🔐 Reset de Senha</h1>
        </div>
        
        <div class="content">
          <div class="warning-box">
            <div class="icon">⚠️</div>
            <p>Você solicitou um reset de senha para sua conta AgenticHub.</p>
          </div>
          
          <div class="token-box">
            <div class="token-label">Seu token de reset (válido por 1 hora):</div>
            <div class="token">${token}</div>
          </div>
          
          <div class="instructions">
            <h3>📋 Como usar o token:</h3>
            <ol>
              <li>Acesse a página de reset de senha no AgenticHub</li>
              <li>Copie e cole o token acima no campo solicitado</li>
              <li>Digite sua nova senha</li>
              <li>Confirme para finalizar o processo</li>
            </ol>
          </div>
          
          <p style="color: #64748b; font-size: 14px; text-align: center; margin-top: 25px;">
            <strong>⏰ Importante:</strong> Este token expira em 1 hora por segurança.<br>
            Se você não solicitou este reset, pode ignorar este email.
          </p>
        </div>
        
        <div class="footer">
          <p><strong>AgenticHub</strong> - Segurança em primeiro lugar</p>
          <p>Se precisar de ajuda, entre em contato conosco.</p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
    🔐 Reset de senha - AgenticHub

    Você solicitou um reset de senha para sua conta AgenticHub.

    Seu token de reset (válido por 1 hora):
    ${token}

    Como usar o token:
    1. Acesse a página de reset de senha no AgenticHub
    2. Copie e cole o token acima no campo solicitado
    3. Digite sua nova senha
    4. Confirme para finalizar o processo

    ⏰ Importante: Este token expira em 1 hora por segurança.
    Se você não solicitou este reset, pode ignorar este email.

    ---
    AgenticHub - Segurança em primeiro lugar
    Se precisar de ajuda, entre em contato conosco.
  `
});