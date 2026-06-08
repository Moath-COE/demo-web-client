export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
      phoneNumberCollected?: boolean;
    };
  }
}
