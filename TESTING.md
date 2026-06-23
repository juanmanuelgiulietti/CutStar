# CUTSTAR — Testing & QA

Manual QA checklist for the landing page. No automated test suite is set up yet
(see "Future automation" at the end). Until then, this document is the source of
truth for verifying a build before handoff.

## How to run a QA pass

```bash
npm install
npm run build      # must compile with no type errors; 4/4 static pages
npm run start      # serve the production build, then open http://localhost:3000
```

Run the checklist below in a desktop browser. Mark each item pass/fail and note
the browser + viewport you tested at. Target browsers: latest Chrome, Firefox,
Safari, Edge. Reference viewport: 1440 × 900.

---

## 1. Build & static checks

- [ ] `npm run build` completes with "Compiled successfully".
- [ ] No TypeScript errors in "Linting and checking validity of types".
- [ ] 4/4 static pages generated.
- [ ] No console errors or warnings on first load of `/`.
- [ ] No 404s for fonts or assets in the Network tab.

## 2. Global / design system

- [ ] Background is `#0A0A0F`; card surfaces `#1A1A24` read as visibly distinct.
- [ ] Violet `#7C5CFC` appears only on CTAs and small accents — not on large
      surfaces.
- [ ] Text is white `#FFFFFF`; muted/faint text is legible against the dark bg.
- [ ] Barlow Condensed renders on headings/wordmark; Inter on body/UI.
- [ ] No horizontal scrollbar at any point.
- [ ] With OS "reduce motion" enabled, animations are disabled (no fade/pulse).

## 3. Scroll 1 — Hero

- [ ] No nav bar is present.
- [ ] The star sits semi-transparent behind the headline.
- [ ] The star pulses slowly (scale + opacity) and does **not** rotate.
- [ ] Copy hierarchy, largest → smallest: headline → subheadline → body →
      credibility line (muted).
- [ ] Headline reads: "Months of content. Delivered within a day."
- [ ] Subheadline reads: "The internet never stops. Neither should your content."
- [ ] CUTSTAR wordmark shows the distorted/misaligned baseline (not perfectly
      aligned), and is identical on reload (deterministic).
- [ ] Layout is asymmetric with generous whitespace.

## 4. Scroll 2 — How It Works

- [ ] Three cards: Upload / We handle the rest / Post (copy matches brief).
- [ ] Cards are staggered asymmetrically (different vertical offsets), not a
      flat grid.
- [ ] Each card is a visibly styled surface with a 9:16 video placeholder.
- [ ] Cards fade/scale in as they enter the viewport (scroll down to trigger).
- [ ] Hover lifts the card and shows the accent border.

## 5. Scroll 3 — Choose Your Path

- [ ] Two cards side by side.
- [ ] Card 1: "I'm an artist or creator" / "Claim your free edit + get notified
      when unlimited drops." / button "Get My Free Edit".
- [ ] Card 2: "I represent a label, agency, or management" / "See what we can do
      for your roster." / button "Apply for a Demo".
- [ ] Artist (primary) card has the accent wash + filled violet CTA; agency card
      uses the outline CTA.
- [ ] Cards fade in on scroll; hover lift works.

## 6. Scroll 4 — Forms (click swap)

### Swap behaviour
- [ ] Clicking the artist CTA replaces **both** cards with the artist form only.
- [ ] Clicking the agency CTA replaces **both** cards with the agency form only.
- [ ] The X/back control returns to the two cards.
- [ ] Swap is a click interaction (no scrolling required) and crossfades.

### Agency form
- [ ] Fields: Name, Email, Company Name, dropdown
      (Label / Agency / Management / Other). No upload fields.
- [ ] Dropdown starts on "Select one" (disabled) and lists all four options.
- [ ] Submit button reads "Request Access".
- [ ] Submitting valid fields shows the success state.
- [ ] Required fields block submit when empty (browser validation).

### Artist form
- [ ] Fields: Name, Email, Artist/Project Name, Upload song, Upload footage.
- [ ] Submit button reads "Send It".
- [ ] Required text fields block submit when empty.
- [ ] Submitting with no song shows the inline error "Please add your song
      before sending."

### Drag-and-drop (artist uploads)
- [ ] Upload song zone is a styled drag-and-drop area, **not** a default file
      input.
- [ ] Dragging a file over a zone shows the active (accent) state.
- [ ] Dropping a file adds it; the zone shows a file chip with name + size.
- [ ] Clicking a zone opens the file browser; selecting a file adds it.
- [ ] Pressing Enter/Space while a zone is focused opens the file browser.
- [ ] The remove (X) button on a chip removes that file.
- [ ] Upload song accepts a single file; once added, the zone is replaced by the
      chip (no second add).
- [ ] Upload footage accepts up to 2 files; the counter shows e.g. "1/2".
- [ ] Adding a 3rd footage file is rejected with a "max" message.
- [ ] Dropping a wrong-type file (e.g. an image into the song zone) is skipped
      with a "wrong format" message.

### Shared
- [ ] Below both forms: "We review every application. Selected applicants
      receive a private access code."

## 7. Accessibility spot-checks

- [ ] Tab order is logical through each form.
- [ ] All inputs have visible labels.
- [ ] Drop zones are reachable and operable by keyboard.
- [ ] Focus-visible rings appear on inputs, buttons, drop zones, and the
      back/remove controls.
- [ ] Error messages are announced (they use `role="alert"`).
- [ ] The star and decorative icons are hidden from screen readers
      (`aria-hidden`).

## 8. Cross-browser

Repeat sections 3–6 in: Chrome, Firefox, Safari, Edge. Note any rendering
differences in the star gradient, the `aspect-ratio` placeholders, or the custom
select chevron.

---

## Known limitations (not bugs)

- Forms do not POST to a backend; success is a local UI state.
- Desktop only — no mobile breakpoints yet.
- The star is an SVG recreation, not the original PNG asset.

## Future automation (suggested)

When the project warrants it:

- **Unit**: Vitest + React Testing Library for `DropZone` (type/count
  validation, add/remove, keyboard) and form submit/validation logic.
- **E2E**: Playwright for the card → form swap, drag-and-drop simulation, and
  the success states. Run `next build` in CI as a smoke test.
- **a11y**: `@axe-core/playwright` over the rendered page.
