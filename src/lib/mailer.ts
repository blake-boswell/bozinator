import * as FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { SendVerificationRequestParams } from 'next-auth/providers/email';
import { Theme } from 'next-auth';
const mailgun = new Mailgun(FormData as any);
const mailer = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '',
});

export async function sendVerificationRequest({
  identifier: email,
  url,
  provider: { from },
  theme,
}: SendVerificationRequestParams) {
  const { host } = new URL(url);
  try {
    const result = await mailer.messages.create(from || '', {
      from: `Parker the Parkbot <mailgun@${from}>`,
      to: [email],
      subject: `Sign in to ${host}`,
      text: text({ url, host }),
      html: emailVerificationHtml({ url, host, theme }),
    });
    if (result.status >= 400) {
      throw new Error(`Email could not be sent to ${email}`);
    }
  } catch (err) {
    console.log('Error sending verification email: ', err);
    throw err;
  }
}

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
function emailVerificationHtml(params: {
  url: string;
  host: string;
  theme: Theme;
}) {
  const { url, host, theme } = params;

  const escapedHost = host.replace(/\./g, '&#8203;.');

  const brandColor = theme.brandColor || '#346df1';
  const color = {
    background: '#f9f9f9',
    text: '#444',
    mainBackground: '#fff',
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || '#fff',
  };

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Sign in to <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}

// mailer.messages
//   .create('sandbox8eae26c6863f4e31ad9b5d02a77cb5ee.mailgun.org', {
//     from:
//       'Parker the Parkbot <mailgun@sandbox8eae26c6863f4e31ad9b5d02a77cb5ee.mailgun.org>',
//     to: ['test@example.com'],
//     subject: 'Hello',
//     text: 'Testing some Mailgun awesomeness!',
//     html: '<h1>Testing some Mailgun awesomeness!</h1>',
//   })
//   .then(msg => console.log(msg)) // logs response data
//   .catch(err => console.log(err)); // logs any error

export default mailer;
