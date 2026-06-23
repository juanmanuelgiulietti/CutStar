"use client";

import { useState } from "react";
import FormShell from "./FormShell";
import DropZone from "./DropZone";
import styles from "./forms.module.css";

/**
 * Scroll 4 — Artist / creator path form.
 * Fields: Name, Email, Artist/Project Name, Upload song, Upload footage (max 2).
 * Submit: "Send It".
 * Uploads are polished drag-and-drop zones (DropZone), not default file inputs.
 */

type ArtistFormProps = {
  onBack: () => void;
};

export default function ArtistForm({ onBack }: ArtistFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [song, setSong] = useState<File[]>([]);
  const [footage, setFootage] = useState<File[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (song.length === 0) {
      setFormError("Please add your song before sending.");
      return;
    }
    setFormError(null);
    // Wiring to a backend/endpoint is out of scope for this delivery.
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

          <DropZone
            label="Upload song"
            hint="MP3, WAV or similar — one track"
            accept="audio/*"
            maxFiles={1}
            files={song}
            onChange={setSong}
            required
          />

          <DropZone
            label="Upload footage"
            hint="Video clips — up to 2 files"
            accept="video/*"
            maxFiles={2}
            files={footage}
            onChange={setFootage}
          />

          {formError ? (
            <p className={styles.fieldError} role="alert">
              {formError}
            </p>
          ) : null}

          <button type="submit" className={styles.submit}>
            Send It
          </button>
        </form>
      )}
    </FormShell>
  );
}
