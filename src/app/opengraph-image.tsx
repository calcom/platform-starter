import { ImageResponse } from "next/og";

import { getBrandName } from "@/lib/cal-api/env";

export const runtime = "edge";
export const alt = "Cal.com Platform Starter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const brand = getBrandName();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0a0a0a",
        color: "#fafafa",
        padding: "72px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
          background:
            "radial-gradient(ellipse 60% 60% at 20% 20%, #1f2937, transparent 60%), radial-gradient(ellipse 50% 50% at 100% 100%, #111827, transparent 60%)",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: "16px", position: "relative" }}>
        <svg
          viewBox="0 0 101 22"
          fill="#fafafa"
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: "44px", width: "auto" }}
        >
          <title>Cal.com</title>
          <path d="M10.0582 20.817C4.32115 20.817 0 16.2763 0 10.6704C0 5.04589 4.1005 0.467773 10.0582 0.467773C13.2209 0.467773 15.409 1.43945 17.1191 3.66311L14.3609 5.96151C13.2025 4.72822 11.805 4.11158 10.0582 4.11158C6.17833 4.11158 4.04533 7.08268 4.04533 10.6704C4.04533 14.2582 6.38059 17.1732 10.0582 17.1732C11.7866 17.1732 13.2577 16.5566 14.4161 15.3233L17.1375 17.7151C15.501 19.8453 13.2577 20.817 10.0582 20.817Z" />
          <path d="M29.0161 5.88601H32.7304V20.4612H29.0161V18.331C28.2438 19.8446 26.9566 20.8536 24.4927 20.8536C20.5577 20.8536 17.4133 17.4341 17.4133 13.2297C17.4133 9.02528 20.5577 5.60571 24.4927 5.60571C26.9383 5.60571 28.2438 6.61477 29.0161 8.12835V5.88601ZM29.1264 13.2297C29.1264 10.95 27.5634 9.06266 25.0995 9.06266C22.7274 9.06266 21.1828 10.9686 21.1828 13.2297C21.1828 15.4346 22.7274 17.3967 25.0995 17.3967C27.5451 17.3967 29.1264 15.4907 29.1264 13.2297Z" />
          <path d="M35.3599 0H39.0742V20.4427H35.3599V0Z" />
          <path d="M40.7291 18.5182C40.7291 17.3223 41.6853 16.3132 42.9908 16.3132C44.2964 16.3132 45.2158 17.3223 45.2158 18.5182C45.2158 19.7515 44.278 20.7605 42.9908 20.7605C41.7037 20.7605 40.7291 19.7515 40.7291 18.5182Z" />
          <path d="M59.4296 18.1068C58.0505 19.7885 55.9543 20.8536 53.4719 20.8536C49.0404 20.8536 45.7858 17.4341 45.7858 13.2297C45.7858 9.02528 49.0404 5.60571 53.4719 5.60571C55.8623 5.60571 57.9402 6.61477 59.3193 8.20309L56.4508 10.6136C55.7336 9.71667 54.7958 9.04397 53.4719 9.04397C51.0999 9.04397 49.5553 10.95 49.5553 13.211C49.5553 15.472 51.0999 17.378 53.4719 17.378C54.9062 17.378 55.8991 16.6306 56.6346 15.6215L59.4296 18.1068Z" />
          <path d="M59.7422 13.2297C59.7422 9.02528 62.9968 5.60571 67.4283 5.60571C71.8598 5.60571 75.1144 9.02528 75.1144 13.2297C75.1144 17.4341 71.8598 20.8536 67.4283 20.8536C62.9968 20.8349 59.7422 17.4341 59.7422 13.2297ZM71.3449 13.2297C71.3449 10.95 69.8003 9.06266 67.4283 9.06266C65.0563 9.04397 63.5117 10.95 63.5117 13.2297C63.5117 15.4907 65.0563 17.3967 67.4283 17.3967C69.8003 17.3967 71.3449 15.4907 71.3449 13.2297Z" />
          <path d="M100.232 11.5482V20.4428H96.518V12.4638C96.518 9.94119 95.3412 8.85739 93.576 8.85739C91.921 8.85739 90.7442 9.67958 90.7442 12.4638V20.4428H87.0299V12.4638C87.0299 9.94119 85.8346 8.85739 84.0878 8.85739C82.4329 8.85739 80.9802 9.67958 80.9802 12.4638V20.4428H77.2659V5.8676H80.9802V7.88571C81.7525 6.31607 83.15 5.53125 85.3014 5.53125C87.3425 5.53125 89.0525 6.5403 89.9903 8.24074C90.9281 6.50293 92.3072 5.53125 94.8079 5.53125C97.8603 5.54994 100.232 7.86702 100.232 11.5482Z" />
        </svg>
        <div
          style={{
            padding: "6px 14px",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "999px",
            fontSize: "18px",
            fontWeight: 600,
            color: "#a3a3a3",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Platform Starter
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: "86px",
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "#fafafa",
            display: "flex",
          }}
        >
          Scheduling, in your codebase.
        </div>
        <div
          style={{
            fontSize: "30px",
            color: "#a3a3a3",
            lineHeight: 1.4,
            maxWidth: "880px",
            display: "flex",
          }}
        >
          A Next.js starter that wires Cal.com Platform flows into your product — every component
          lives here, owned and styled by you.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "20px",
          color: "#737373",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "999px",
              background: "#10b981",
              display: "inline-block",
            }}
          />
          Open source · MIT
        </div>
        <div>{brand}</div>
      </div>
    </div>,
    { ...size },
  );
}
