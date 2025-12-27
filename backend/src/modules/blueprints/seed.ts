import bcrypt from 'bcrypt';
import { User } from '../../db/models/User';
import { createBlueprint } from './service';

async function ensureSeedUser(): Promise<User> {
  const email =
    process.env.SEED_DEFAULT_EMAIL ||
    process.env.SEED_SUPPORT_EMAIL ||
    process.env.GMAIL_USER ||
    'seed@agentichub.local';

  const password =
    process.env.SEED_DEFAULT_PASSWORD ||
    process.env.SEED_SUPPORT_PASSWORD ||
    // Random password is fine; this user exists only to own seeded blueprints.
    require('crypto').randomBytes(24).toString('base64url');

  const passwordHash = await bcrypt.hash(String(password), 12);
  const [user] = await User.findOrCreate({
    where: { email: String(email) },
    defaults: { email: String(email), passwordHash } as any
  });

  if (process.env.SEED_DEFAULT_OVERWRITE_PASSWORD === 'YES') {
    user.passwordHash = passwordHash;
    await user.save();
  }

  return user;
}

const EMAIL_BLUEPRINT_FILES = [
  {
    path: 'backend/src/modules/email/service.ts',
    content: `import nodemailer from 'nodemailer';\nimport { env } from '../../config/env';\n\nexport type SendEmailInput = {\n  to: string;\n  subject: string;\n  text?: string;\n  html?: string;\n};\n\nexport async function sendEmail(input: SendEmailInput) {\n  const transporter = nodemailer.createTransport({\n    service: 'gmail',\n    auth: {\n      type: 'OAuth2',\n      user: env.gmail.user,\n      clientId: env.gmail.clientId,\n      clientSecret: env.gmail.clientSecret,\n      refreshToken: env.gmail.refreshToken\n    }\n  });\n\n  return transporter.sendMail({\n    from: env.gmail.user,\n    to: input.to,\n    subject: input.subject,\n    text: input.text,\n    html: input.html\n  });\n}\n`
  },
  {
    path: 'backend/src/config/env.ts',
    content: `// Requer as vars: GMAIL_USER, GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN\n`
  }
];

const EMAIL_BLUEPRINT_INSTRUCTIONS = `# Envio de e-mail (Gmail OAuth2)\n\nEste blueprint adiciona um serviço de envio de e-mails via **Nodemailer** com autenticação **OAuth2** do Gmail.\n\n## Variáveis de ambiente\n- GMAIL_USER\n- GMAIL_CLIENT_ID\n- GMAIL_CLIENT_SECRET\n- GMAIL_REFRESH_TOKEN\n\n## Uso\n- Importe o serviço e chame \`sendEmail({ to, subject, text/html })\`.\n\n## Observações\n- Não faça commit de credenciais.\n`;

export async function seedDefaultBlueprints(): Promise<void> {
  const seedUser = await ensureSeedUser();

  await createBlueprint({
    userId: seedUser.id,
    name: 'Email via Gmail OAuth2 (Nodemailer)',
    description: 'Serviço de envio de e-mail usando Nodemailer com OAuth2 do Gmail.',
    instructions: EMAIL_BLUEPRINT_INSTRUCTIONS,
    files: EMAIL_BLUEPRINT_FILES
  });

  // Extra public samples (unowned)
  await createBlueprint({
    userId: seedUser.id,
    name: 'Auth JWT (Hapi + hapi-auth-jwt2)',
    description: 'Blueprint de autenticação JWT com Hapi (login + strategy).',
    instructions:
      '# Auth JWT (Hapi)\n\nEste blueprint mostra um setup mínimo de JWT no Hapi usando `hapi-auth-jwt2`.\n\n## Passos\n1) Configure `JWT_SECRET`\n2) Registre o plugin e a strategy\n3) Proteja rotas com `auth: \"jwt\"`\n\n## Observações\n- Em produção, ajuste expiração e audience/issuer conforme necessário.\n',
    files: [
      {
        path: 'backend/src/server.ts',
        content:
          "// Exemplo (trecho):\n// server.auth.strategy('jwt', 'jwt', {\n//   key: env.jwtSecret,\n//   validate: async (decoded) => ({ isValid: true, credentials: { userId: decoded.sub } })\n// });\n"
      },
      {
        path: 'backend/src/modules/auth/routes.ts',
        content: "// Exemplo: POST /auth/login retornando { token } e GET /auth/me protegido.\n"
      }
    ]
  });

  await createBlueprint({
    userId: seedUser.id,
    name: 'Reset de senha por token (email)',
    description: 'Fluxo simples de forgot/reset password com token, expiração e uso único.',
    instructions:
      '# Reset de senha por token\n\n## Endpoints\n- POST /auth/forgot-password { email }\n- POST /auth/reset-password { token, newPassword }\n\n## Regras\n- Token expira (ex.: 1h)\n- Token é uso único\n- Resposta do forgot não revela se usuário existe\n',
    files: [
      {
        path: 'backend/src/db/models/PasswordResetToken.ts',
        content: '// Modelo de token de reset com tokenHash + expiresAt + usedAt\n'
      },
      {
        path: 'backend/src/modules/auth/service.ts',
        content: '// requestPasswordReset() gera token e envia email; resetPassword() valida e troca senha\n'
      }
    ]
  });

  await createBlueprint({
    userId: seedUser.id,
    name: 'DB reset (Postgres schema drop/recreate)',
    description: 'Script destrutivo para resetar schema public e re-seedar (ambiente dev).',
    instructions:
      '# Reset de banco (Postgres)\n\nEste blueprint mostra como limpar o schema `public` e recriar tudo via Sequelize.\n\n## Uso\n- Defina `DB_RESET_CONFIRM=YES`\n- Rode: `npm -w backend run db:reset`\n\n## Atenção\n- Operação destrutiva. Use somente em dev/homolog.\n',
    files: [
      {
        path: 'backend/src/db/reset.ts',
        content: '// DROP SCHEMA public CASCADE; CREATE SCHEMA public; sequelize.sync(); seedDefaultBlueprints();\n'
      }
    ]
  });

  const supportEmail = process.env.SEED_SUPPORT_EMAIL;
  const supportPassword = process.env.SEED_SUPPORT_PASSWORD;
  const shouldSeedSupport = process.env.SEED_SUPPORT_ENABLE === 'YES' && !!supportEmail && !!supportPassword;

  if (!shouldSeedSupport) return;

  const passwordHash = await bcrypt.hash(String(supportPassword), 12);
  const [supportUser] = await User.findOrCreate({
    where: { email: String(supportEmail) },
    defaults: { email: String(supportEmail), passwordHash } as any
  });

  // If the user already exists, keep the password as-is unless explicitly requested.
  if (process.env.SEED_SUPPORT_OVERWRITE_PASSWORD === 'YES') {
    supportUser.passwordHash = passwordHash;
    await supportUser.save();
  }

  await createBlueprint({
    userId: supportUser.id,
    name: '[Suporte] Auth JWT (Hapi + hapi-auth-jwt2)',
    description: 'Blueprint de autenticação JWT com Hapi (login + strategy).',
    instructions:
      '# Auth JWT (Hapi)\n\nEste blueprint mostra um setup mínimo de JWT no Hapi usando `hapi-auth-jwt2`.\n\n## Passos\n1) Configure `JWT_SECRET`\n2) Registre o plugin e a strategy\n3) Proteja rotas com `auth: \"jwt\"`\n\n## Observações\n- Em produção, ajuste expiração e audience/issuer conforme necessário.\n',
    files: [
      {
        path: 'backend/src/server.ts',
        content:
          "// Exemplo (trecho):\n// server.auth.strategy('jwt', 'jwt', {\n//   key: env.jwtSecret,\n//   validate: async (decoded) => ({ isValid: true, credentials: { userId: decoded.sub } })\n// });\n"
      },
      {
        path: 'backend/src/modules/auth/routes.ts',
        content:
          "// Exemplo: POST /auth/login retornando { token } e GET /auth/me protegido.\n"
      }
    ]
  });

  await createBlueprint({
    userId: supportUser.id,
    name: '[Suporte] Reset de senha por token (email)',
    description: 'Fluxo simples de forgot/reset password com token, expiração e uso único.',
    instructions:
      '# Reset de senha por token\n\n## Endpoints\n- POST /auth/forgot-password { email }\n- POST /auth/reset-password { token, newPassword }\n\n## Regras\n- Token expira (ex.: 1h)\n- Token é uso único\n- Resposta do forgot não revela se usuário existe\n',
    files: [
      {
        path: 'backend/src/db/models/PasswordResetToken.ts',
        content: '// Modelo de token de reset com tokenHash + expiresAt + usedAt\n'
      },
      {
        path: 'backend/src/modules/auth/service.ts',
        content: '// requestPasswordReset() gera token e envia email; resetPassword() valida e troca senha\n'
      }
    ]
  });

  await createBlueprint({
    userId: supportUser.id,
    name: '[Suporte] DB reset (Postgres schema drop/recreate)',
    description: 'Script destrutivo para resetar schema public e re-seedar (ambiente dev).',
    instructions:
      '# Reset de banco (Postgres)\n\nEste blueprint mostra como limpar o schema `public` e recriar tudo via Sequelize.\n\n## Uso\n- Defina `DB_RESET_CONFIRM=YES`\n- Rode: `npm -w backend run db:reset`\n\n## Atenção\n- Operação destrutiva. Use somente em dev/homolog.\n',
    files: [
      {
        path: 'backend/src/db/reset.ts',
        content: '// DROP SCHEMA public CASCADE; CREATE SCHEMA public; sequelize.sync(); seedDefaultBlueprints();\n'
      }
    ]
  });
}
