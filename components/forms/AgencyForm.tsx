"use client";

import { useState } from "react";
import FormShell from "./FormShell";
import styles from "./forms.module.css";

/**
 * Scroll 4 — Agency path form.
 * Fields: Name, Email, Company Name, dropdown (Label/Agency/Management/Other).
 * Submit: "Request Access". No upload fields (per brief).
 */

type AgencyFormProps = {
  onBack: () => void;
};

const ROLE_OPTIONS = ["Label", "Agency", "Management", "Other"] as const;

export default function AgencyForm({ onBack }: AgencyFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Wiring to a backend/endpoint is out of scope for this delivery.
    setSubmitted(true);
  };

  return (
    <FormShell
      title="Apply for a demo"
      subtitle="See what we can do for your roster."
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
          <p className={styles.successTitle}>Application received.</p>
          <p className={styles.successBody}>
            We review every application. If selected, you&apos;ll receive a
            private access code by email.
          </p>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit} noValidate={false}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="ag-name">
              Name
            </label>
            <input
              id="ag-name"
              name="name"
              type="text"
              className={styles.input}
              autoComplete="name"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="ag-email">
              Email
            </label>
            <input
              id="ag-email"
              name="email"
              type="email"
              className={styles.input}
              autoComplete="email"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="ag-company">
              Company Name
            </label>
            <input
              id="ag-company"
              name="company"
              type="text"
              className={styles.input}
              autoComplete="organization"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="ag-role">
              You represent a
            </label>
            <div className={styles.selectWrap}>
              <select
                id="ag-role"
                name="role"
                className={styles.select}
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select one
                </option>
                {ROLE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <svg
                className={styles.selectChevron}
                viewBox="0 0 24 24"
                width="18"
                height="18"
                aria-hidden="true"
              >
                <path
                  d="m6 9 6 6 6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <button type="submit" className={styles.submit}>
            Request Access
          </button>
        </form>
      )}
    </FormShell>
  );
}
