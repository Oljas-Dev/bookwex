export function signupVerificationTemplate(
  fullName: string,
  confirmationLink: string,
) {
  return `
    <div style="font-family: Arial, sans-serif; line-height:1.6">

      <h2>Welcome to Bookwex 👋</h2>

      <p>Hello ${fullName},</p>

      <p>
        Thank you for creating your Bookwex account.
      </p>

      <p>
        Please confirm your email address to activate your account.
      </p>

      <p>
        <a
          href="${confirmationLink}"
          style="
            background:#111;
            color:white;
            padding:12px 20px;
            text-decoration:none;
            border-radius:6px;
            display:inline-block;
          "
        >
          Confirm Email
        </a>
      </p>

      <p>
        If the button doesn't work, copy this link into your browser:
      </p>

      <p>${confirmationLink}</p>

      <br/>

      <p>Warm regards,</p>

      <strong>The Bookwex Team</strong>

    </div>
  `;
}
