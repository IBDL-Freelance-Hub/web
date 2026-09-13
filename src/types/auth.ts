export interface ActivateAccountPayload {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ResendActivationPayload {
  email: string;
}

export interface PasswordPolicyRequirement {
  id: string;
  labelEn: string;
  labelAr: string;
  met: boolean;
}
