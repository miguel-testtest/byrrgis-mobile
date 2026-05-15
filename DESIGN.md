---
name: Byrrgis
description: Mobile-first crypto trading and portfolio management — built for traders who move fast.
colors:
  execution-teal: "#1ABCA3"
  exit-red: "#FD4991"
  void: "#050A0A"
  surface-deep: "#081110"
  surface-mid: "#0D1C1A"
  surface-lift: "#132E2A"
  border: "#1C3432"
  text-primary: "#EEF0F5"
  text-secondary: "#8892A4"
  text-muted: "#7B8799"
typography:
  display:
    fontFamily: "'Hanken Grotesk', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Hanken Grotesk', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  title:
    fontFamily: "'Hanken Grotesk', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "'Hanken Grotesk', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'Hanken Grotesk', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.01em"
  data:
    fontFamily: "'JetBrains Mono', 'SF Mono', 'Courier New', monospace"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.01em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
components:
  button-buy:
    backgroundColor: "{colors.execution-teal}"
    textColor: "{colors.void}"
    rounded: "{rounded.lg}"
    padding: "14px 24px"
    typography: "{typography.label}"
  button-sell:
    backgroundColor: "{colors.exit-red}"
    textColor: "{colors.void}"
    rounded: "{rounded.lg}"
    padding: "14px 24px"
    typography: "{typography.label}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "14px 24px"
  score-badge-low:
    backgroundColor: "{colors.execution-teal}"
    textColor: "{colors.void}"
    rounded: "{rounded.sm}"
    padding: "2px 6px"
  score-badge-high:
    backgroundColor: "{colors.exit-red}"
    textColor: "{colors.void}"
    rounded: "{rounded.sm}"
    padding: "2px 6px"
  score-badge-mid:
    backgroundColor: "{colors.surface-lift}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.sm}"
    padding: "2px 6px"
  tab-active:
    backgroundColor: "transparent"
    textColor: "{colors.execution-teal}"
  tab-inactive:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
  input-search:
    backgroundColor: "{colors.surface-mid}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "10px 16px"
---

# Design System: Byrrgis

## 1. Overview

**Creative North Star: "The Sharp Edge"**

Byrrgis is a tool for traders who already know what they're doing. The visual system never softens the data or apologizes for complexity — it cuts straight to the signal. Every design choice is justified by one question: does this help a user make a faster, better-informed decision?

The system is built on deep dark surfaces that recede completely (#050A0A through #132E2A), so data occupies the foreground without competition. Two semantic colors do the entire expressive work: Execution Teal (#1ABCA3) for positive signal and opportunity, Exit Red (#FD4991) for risk, loss, and alert. Everything else is neutral. There is no decoration. Components are contained and tense — no padding excess, no softening radius, no expressive shadow.

What this system explicitly rejects: the information overload and competing hierarchies of Binance and classic exchanges; the neon-on-pure-black DeFi hacker-terminal aesthetic; the navy-and-gold conservative fintech visual language that signals "bank" instead of "sharp"; the SaaS dashboard template with its hero metric number, tiny label, and gradient accent strip that reads as AI-generated from ten meters away.

**Key Characteristics:**
- Dark-first, high-contrast — optimized for varied lighting including direct sunlight on mobile
- Exactly two accent colors, used with semantic precision; rarity is the point
- Split typographic registers: Hanken Grotesk for language, JetBrains Mono for financial truth
- 430px max-width, iOS-optimized, primary actions in the bottom 40% of screen
- Tonal depth — flat surfaces, no decorative shadows, depth through surface lightness steps

## 2. Colors: The Signal Palette

Two voices, one vocabulary. Color means something specific here or it doesn't appear.

### Primary
- **Execution Teal** (#1ABCA3): The signal of opportunity. Active tab indicators, positive price deltas, buy CTAs, Risk Score low-risk badges, focus borders, interactive selection states. If something means "go" or "positive", it's this color. Warm enough to read against near-black without burning.

### Secondary
- **Exit Red** (#FD4991): The signal of risk. Negative price deltas, sell CTAs, loss indicators, Risk Score high-risk badges, and any destructive action. The magenta hue — closer to hot pink than arterial red — reads as high-alert without triggering the physiological stress of pure red. Used sparingly; its rarity makes it land with force.

### Neutral
- **Void** (#050A0A): The absolute base. The darkest background layer. Near-black with a barely-perceptible teal tint — never pure #000000.
- **Surface Deep** (#081110): The primary app shell background. Recedes behind interactive content.
- **Surface Mid** (#0D1C1A): Cards, list backgrounds, sheet surfaces. One step up from the shell.
- **Surface Lift** (#132E2A): Active containers, selected states, the highest surface. Three steps up from Void.
- **Border** (#1C3432): Hairline separators and card outlines. Visible but never loud.
- **Text Primary** (#EEF0F5): Main readable text. Warm-tinted so it doesn't create visual vibration against the teal-tinted backgrounds.
- **Text Secondary** (#8892A4): Supporting labels, timestamps, secondary data points.
- **Text Muted** (#7B8799): Placeholder text, disabled states, and tertiary context.

### Named Rules
**The Two Voices Rule.** Execution Teal and Exit Red are the only hues on any screen. They carry meaning because nothing else competes with them. Introducing a third accent — even a subtle one — dilutes both signals and breaks the system's legibility under pressure.

**The Rarity Rule.** Each accent occupies ≤20% of any given screen. Their scarcity is why they read instantly. A screen that's half-teal has no signal at all.

**The Non-Black Rule.** The darkest value in the system is #050A0A, not #000000. The background is void-adjacent but teal-tinted. Pure black reads as cheaper.

## 3. Typography

**UI Font:** Hanken Grotesk (400, 500, 600, 700), with -apple-system, BlinkMacSystemFont, sans-serif fallbacks
**Data Font:** JetBrains Mono (400, 500, 600), with SF Mono, Courier New, monospace fallbacks

**Character:** Hanken Grotesk is warm but technical — its geometry reads confidence without feeling sterile or corporate. JetBrains Mono was built for code; on financial data it signals precision and immutability. Together they divide the interface into two registers: human language (Grotesk) and machine truth (Mono). The pairing makes numbers feel authoritative.

### Hierarchy
- **Display** (700, 24px, 1.2, −0.02em tracking): Portfolio total value, coin price hero. The number a user looks for first. Used once per screen maximum.
- **Headline** (600, 20px, 1.3, −0.01em): Section headers, page titles. Rare — one per view.
- **Title** (600, 16px, 1.4): Card titles, list item primary labels, active tab labels.
- **Body** (400, 14px, 1.5): Supporting descriptions, transaction notes. Max ~40 characters per line on mobile.
- **Label** (500, 12px, 1.3, 0.01em): Badges, category chips, timestamps, secondary stats. Often uppercase for additional distinction.
- **Data** (JetBrains Mono 500, 14px, 1.2, −0.01em): All price values, percentages, token amounts, portfolio stats. Every financial number. No exceptions.

### Named Rules
**The Two Register Rule.** Grotesk for language, Mono for financial numbers. Never mix them within the same label. A price value in Grotesk feels soft and approximate. A coin name in Mono feels cold and inhuman.

**The Flat Scale Rule.** No font size below 11px on mobile. No font size above 24px for body content. Hierarchy comes from weight contrast (400 vs 600 vs 700) and color contrast (Text Primary vs Text Muted), not dramatic size jumps.

## 4. Elevation

This system is flat by default. Depth is expressed through tonal layering — four progressively lighter dark surfaces (#050A0A → #081110 → #0D1C1A → #132E2A) — not shadows. A surface that sits "above" another is a step lighter, not shadowed beneath it.

No box-shadows exist in the current component system. If a state change needs spatial feedback, the treatment is a 1px border shift to Execution Teal or a background tint step up, not a drop shadow.

### Named Rules
**The Tonal Hierarchy Rule.** Depth is communicated by surface lightness, not by elevation shadows. To place a component "above" another, move up one surface token. Adding a box-shadow is prohibited — it breaks the tonal language and introduces an alien visual idiom.

**The Flat-at-Rest Rule.** All interactive surfaces are flat until acted upon. Press states use transform: scale(0.97). No hover glow, no floating card effect, no pre-emptive elevation.

## 5. Components

### Buttons
*Contained and tense: sized to the action, no expressive padding, color carries the semantic weight.*

- **Shape:** Gently rounded edges (8px, `--r-lg`)
- **Buy (Primary CTA):** Execution Teal (#1ABCA3) fill, Void (#050A0A) text, Label typography (500/12px), 14px vertical 24px horizontal padding
- **Sell (Destructive CTA):** Exit Red (#FD4991) fill, Void (#050A0A) text, identical geometry to Buy. Never softened — the color says everything.
- **Ghost / Secondary:** Transparent fill, 1px Surface Lift (#132E2A) border, Text Primary label. For non-destructive secondary actions only.
- **States:** Press triggers transform: scale(0.97), 120ms ease-out. No hover glow. No outline rings. The scale depression is the only response.

### Score Badge (Risk Score — Signature Component)
*The product's core differentiator. Must be immediately legible — never understated.*

- **Low Risk:** Execution Teal fill, Void text, 4px radius (`--r-sm`), 2px top/bottom 6px left/right padding, Label typography (500/12px uppercase)
- **High Risk:** Exit Red fill, Void text, same geometry
- **Mid Risk:** Surface Lift (#132E2A) fill, Text Secondary label, 1px Border outline, no fill color
- **Rule:** Never renders without a value. A missing Risk Score means no badge — not a gray or neutral badge. Absence is informative; a placeholder badge is noise.

### Category Chips / Filter Tabs
- **Active:** Text Primary color, 1px Execution Teal underline or Surface Lift background tint
- **Inactive:** Text Muted color, no border, no background
- State is communicated by color contrast only — no pill border on inactive states
- Horizontal scroll on overflow; no "more…" button or truncation

### Cards / List Items (Asset Cells, Coin Rows)
- **Background:** Surface Mid (#0D1C1A)
- **Corner Style:** 6px rounded (`--r-md`) on standalone cards; flush with hairline Border divider on inline list items
- **Border:** 1px Border (#1C3432) on standalone cards; top or bottom hairline only on list items
- **Internal Padding:** 12px–16px (`--md` to `--lg`), consistent across rows
- **Layout:** Left — coin avatar (40px); Center — name (Title) + secondary label (Label/Muted); Right — price (Data/Mono) + change badge. Columns align across all rows.
- **Rule:** No nested cards. A list item inside a surface container is fine. A card inside a card is prohibited.

### Tab Bar (Bottom Navigation)
- **Background:** Surface Deep (#081110) + safe-area-inset-bottom
- **Active:** Icon + label in Execution Teal, no underline or pill indicator
- **Inactive:** Icon + label in Text Muted
- Color contrast is the only state indicator. No animated badge, no selection pill, no shifting geometry.

### Search Input
- **Background:** Surface Mid (#0D1C1A)
- **Border:** 1px Surface Lift (#132E2A) at rest; 1px Execution Teal (#1ABCA3) on focus
- **Radius:** 8px (`--r-lg`)
- **Typography:** Body (Grotesk 400/14px) for input text; Text Muted for placeholder
- **No focus glow, no box-shadow.** The border color shift is the complete focus treatment.

### Action Sheets / Bottom Sheets
- **Background:** Surface Mid (#0D1C1A), full-width
- **Handle:** 3px × 32px rounded pill in Border (#1C3432), centered at top, 8px top margin
- **Content padding:** 24px horizontal, 20px top
- **Scrim:** Void (#050A0A) at 60% opacity
- **Dismiss:** Drag down past threshold or tap scrim. No close button required.

## 6. Do's and Don'ts

### Do:
- **Do** use JetBrains Mono for every price, percentage, token amount, and financial figure — no exceptions. Numbers in Grotesk feel imprecise and untrustworthy.
- **Do** step up one surface token to establish depth. Let tonal lightness do the spatial work that shadows would otherwise do.
- **Do** keep Execution Teal and Exit Red as the only two hues on any screen. Every other color is a neutral.
- **Do** make the Risk Score badge the most visually prominent non-data element on any coin view. It is the product's reason for existing.
- **Do** place primary actions in the bottom 40% of the screen, within thumb reach. Design for how people actually hold a phone.
- **Do** use 120ms ease-out for all state transitions. Fast enough to feel instant; long enough to feel physical.
- **Do** establish hierarchy through weight (400 vs 600 vs 700) and color (Text Primary vs Text Muted) before increasing font size.
- **Do** let column layout align across all list rows using fixed-width left (avatar) and right (price + badge) slots.

### Don't:
- **Don't** introduce a third accent color — no purple, no orange, no brand gradient. Two voices only.
- **Don't** use gradient fills on text (`background-clip: text` with a gradient). Solid colors, always.
- **Don't** add decorative drop shadows. Surfaces are flat at rest. The tonal surface system handles all depth.
- **Don't** design like Binance or classic exchanges: no competing visual hierarchies, no information overload, no element that exists just to fill space.
- **Don't** use neon on pure black. The DeFi hacker-terminal aesthetic — electric green on #000000 — is an explicit anti-reference. The background is near-black with a teal tint, never pure black.
- **Don't** use navy + gold, passive voice copy, or any visual language that reads as "bank" or "conservative fintech".
- **Don't** use the SaaS dashboard template: big metric, small label, gradient accent strip. It reads as anonymous and AI-generated.
- **Don't** nest cards inside cards.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored decorative stripe on cards or list items. Use background tints or full borders instead.
- **Don't** animate layout properties (width, height, top, left, margin). Animate `transform` and `opacity` only.
- **Don't** use font sizes below 11px. Legibility on mobile in bright sunlight is non-negotiable.
