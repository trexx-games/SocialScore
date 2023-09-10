export class VerifyTwoFactorInput {
  // the input used to verify with secret
  code: string;

  // the secret has used to compare
  secret: string;
}

export class GenerateTwoFactorInput {
  // the unique reference used to generate 2fa secret
  reference: string;
  // the title display on Authenticator
  title?: string;
}
