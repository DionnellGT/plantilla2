import { escapeHtml } from "./email-template";

interface AutoresponderData {
  nombre: string;
}

const LOGO_URL = "https://res.cloudinary.com/drhk7ng4v/image/upload/v1781824927/logo1_szpgxq.png";

export function buildAutoresponderHtml(data: AutoresponderData): string {
  const { nombre } = data;

  return `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Hemos recibido tu mensaje</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f0eb; font-family: Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f0eb; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.06);">

          <!-- Header con logo -->
          <tr>
            <td style="background-color:#a07030; padding:28px 32px; text-align:center;">
              <img src="${LOGO_URL}" alt="El Avellano" width="185" height="50" style="display:block; margin:0 auto 12px; border-radius:10px; background-color:#ffffff; padding:6px;" />
              <p style="margin:0; color:#ffffff; font-size:11px; letter-spacing:2px; text-transform:uppercase; opacity:0.85;">
                El Avellano
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 32px;">

              <h1 style="margin:0 0 16px; color:#1c1917; font-size:24px; font-weight:700; text-align:center;">
                ¡Gracias por escribirnos, ${escapeHtml(nombre)}!
              </h1>

              <p style="margin:0 0 24px; color:#57534e; font-size:15px; line-height:1.7; text-align:center;">
                Hemos recibido tu mensaje correctamente. Nuestro equipo lo revisará
                y se pondrá en contacto contigo a la brevedad para ayudarte a
                encontrar el terreno ideal para ti.
              </p>

              <!-- Línea divisoria -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-top:1px solid #e7e5e4; padding-top:24px;">
                    <p style="margin:0 0 16px; color:#a8a29e; font-size:13px; line-height:1.6; text-align:center;">
                      Mientras esperas, te invitamos a conocer más sobre
                      nuestros proyectos disponibles.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-top:8px;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="border-radius:999px; background-color:#a07030;">
                          <a href="https://elavellano.cl/#proyectos"
                             style="display:inline-block; padding:12px 28px; color:#ffffff; font-size:13px; font-weight:700; text-decoration:none; text-transform:uppercase; letter-spacing:1px; border-radius:999px;">
                            Ver nuestros proyectos
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px; background-color:#f5f0eb;">
              <p style="margin:0 0 8px; color:#a8a29e; font-size:11px; text-align:center;">
                Este es un mensaje automático, no es necesario que lo respondas.
              </p>
              <p style="margin:0; color:#a8a29e; font-size:11px; text-align:center;">
                <a href="https://elavellano.cl" style="color:#a07030; text-decoration:none;">elavellano.cl</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}