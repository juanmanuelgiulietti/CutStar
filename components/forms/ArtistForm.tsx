"use client";

import { useState } from "react";
import FormShell from "./FormShell";
import styles from "./forms.module.css";

/**
 * Scroll 4 — Artist / creator path form.
 * Fields: Name, Email, Artist/Project Name, Upload song, Upload footage (max 2).
 * Submit: "Send It".
 *
 * NOTE (Entrega 4a): text fields are complete here. The "Upload song" and
 * "Upload footage" polished drag-and-drop zones are stubbed below and will be
 * implemented in Entrega 4b.
 */

type ArtistFormProps = {
  onBack: () => void;
};

export default function ArtistForm({ onBack }: ArtistFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <FormShell
      title="Get your free edit"
      subtitle="Claim your free edit + get notified when unlimited drops."
      onBack={onBack}
    >
      {submitted ? (
        <div className={styles.success} role="status">
          <span className={styles.successMark} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path
                d="m5 13 4 4L19 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p className={styles.successTitle}>You&apos;re in.</p>
          <p className={styles.successBody}>
            We&apos;ll get to work and notify you when your free edit is ready.
          </p>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="ar-name">
              Name
            </label>
            <input
              id="ar-name"
              name="name"
              type="text"
              className={styles.input}
              autoComplete="name"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="ar-email">
              Email
            </label>
            <input
              id="ar-email"
              name="email"
              type="email"
              className={styles.input}
              autoComplete="email"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="ar-project">
              Artist / Project Name
            </label>
            <input
              id="ar-project"
              name="project"
              type="text"
              className={styles.input}
              required
            />
          </div>

          {/* Entrega 4b: replace with polished drag-and-drop upload zones
              (Upload song — 1 file; Upload footage — max 2 files). */}
          <div className={styles.uploadPlaceholder} aria-hidden="true">
            Upload song &amp; footage — drag-and-drop zones arrive in the next
            update.
          </div>

          <button type="submit" className={styles.submit}>
            Send It
          </button>
        </form>
      )}
    </FormShell>
  );
}
