import localFont from "next/font/local";

export const neueHaasUnica = localFont({
  src: [
    
    // Extra Light
    {
      path: "./NeueHaasUnica-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    // Light
    {
      path: "./NeueHaasUnica-Light.woff2",
      weight: "300",
      style: "normal",
    },
    // Regular
    {
      path: "./NeueHaasUnica-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    // Medium
    {
      path: "./NeueHaasUnica-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    // Bold
    {
      path: "./NeueHaasUnica-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    // Extra Bold
    {
      path: "./NeueHaasUnica-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    // Black
    {
      path: "./NeueHaasUnica-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-neue-haas-unica",
  display: "swap",
});
