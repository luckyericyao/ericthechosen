export type PrivateDoorContent = {
  enabled: boolean;
  entryLabel: string;
  backLabel: string;
  emptyEyebrow: string;
  emptyBody: string;
  eyebrow: string;
  title: string;
  body: string;
  signature: string;
  audioSrc?: string;
};

/**
 * Intentionally empty in the first public build.
 * Add content here only when you want to expose /for-you. A static route is
 * discoverable and is not a substitute for server-side access control.
 */
export const privateDoorContent: PrivateDoorContent = {
  enabled: false,
  entryLabel: "A SMALL DOOR",
  backLabel: "BACK TO THE FILM",
  emptyEyebrow: "THE DOOR IS NOT OPEN",
  emptyBody: "There is nothing here yet.",
  eyebrow: "",
  title: "",
  body: "",
  signature: "",
};
