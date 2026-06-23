"use client";

import { useId, useRef, useState } from "react";
import styles from "./forms.module.css";

/**
 * Polished drag-and-drop upload zone (not a default file input).
 * Controlled: parent owns the file list. Supports drag states, click-to-browse,
 * keyboard activation, type + count validation, and removable file chips.
 */

export type DropZoneProps = {
  label: string;
  hint?: string;
  /** accept attribute, e.g. "audio/*" or "video/*,.mov" */
  accept: string;
  maxFiles: number;
  files: File[];
  onChange: (files: File[]) => void;
  required?: boolean;
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let val = bytes / 1024;
  let i = 0;
  while (val >= 1024 && i < units.length - 1) {
    val /= 1024;
    i++;
  }
  return `${val.toFixed(val < 10 ? 1 : 0)} ${units[i]}`;
}

function matchesAccept(file: File, accept: string): boolean {
  const tokens = accept.split(",").map((t) => t.trim().toLowerCase());
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return tokens.some((token) => {
    if (!token) return false;
    if (token.endsWith("/*")) return type.startsWith(token.slice(0, -1));
    if (token.startsWith(".")) return name.endsWith(token);
    return type === token;
  });
}

export default function DropZone({
  label,
  hint,
  accept,
  maxFiles,
  files,
  onChange,
  required,
}: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const id = useId();

  const addFiles = (incoming: FileList | null) => {
    if (!incoming || incoming.length === 0) return;
    const picked = Array.from(incoming);

    const valid = picked.filter((f) => matchesAccept(f, accept));
    if (valid.length < picked.length) {
      setError("Some files were skipped — wrong format.");
    } else {
      setError(null);
    }

    const remaining = maxFiles - files.length;
    if (remaining <= 0) {
      setError(`You can add up to ${maxFiles} file${maxFiles > 1 ? "s" : ""}.`);
      return;
    }

    const next = [...files, ...valid.slice(0, remaining)];
    if (valid.length > remaining) {
      setError(`Only ${maxFiles} file${maxFiles > 1 ? "s" : ""} allowed.`);
    }
    onChange(next);
  };

  const removeAt = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
    setError(null);
  };

  const open = () => inputRef.current?.click();

  const isFull = files.length >= maxFiles;

  return (
    <div className={styles.field}>
      <div className={styles.uploadHead}>
        <span className={styles.label}>
          {label}
          {required ? <span className={styles.req} aria-hidden="true"> *</span> : null}
        </span>
        {maxFiles > 1 ? (
          <span className={styles.uploadCount}>
            {files.length}/{maxFiles}
          </span>
        ) : null}
      </div>

      {!isFull && (
        <div
          className={`${styles.dropzone} ${dragging ? styles.dropzoneActive : ""}`}
          role="button"
          tabIndex={0}
          aria-label={`${label}. Drag and drop or press Enter to browse.`}
          onClick={open}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              open();
            }
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragging(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            addFiles(e.dataTransfer.files);
          }}
        >
          <span className={styles.dropIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path
                d="M12 16V4m0 0L7 9m5-5 5 5M5 20h14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className={styles.dropText}>
            <strong>Drag &amp; drop</strong> or <span className={styles.dropBrowse}>browse</span>
          </span>
          {hint ? <span className={styles.dropHint}>{hint}</span> : null}

          <input
            ref={inputRef}
            id={id}
            type="file"
            accept={accept}
            multiple={maxFiles > 1}
            className={styles.visuallyHidden}
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </div>
      )}

      {files.length > 0 && (
        <ul className={styles.fileList}>
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`} className={styles.fileChip}>
              <span className={styles.fileIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    d="M14 3v5h5M7 3h8l5 5v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className={styles.fileName}>{file.name}</span>
              <span className={styles.fileSize}>{formatBytes(file.size)}</span>
              <button
                type="button"
                className={styles.fileRemove}
                onClick={() => removeAt(i)}
                aria-label={`Remove ${file.name}`}
              >
                <svg viewBox="0 0 24 24" width="15" height="15">
                  <path
                    d="M18 6 6 18M6 6l12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      {error ? (
        <p className={styles.fieldError} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
