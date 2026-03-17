# Task Handoff: IMAGE-OPTIMIZE

**From:** ORCHESTRATOR  
**To:** CODER  
**Priority:** P1 (Ready → InProgress)  
**Date:** 2026-03-17

---

## Task Description

Convert raw JPGs to WebP and apply NgOptimizedImage to About/Media/Contact pages.

**Source:** HANDOVER.md "What's NOT Done" section (item 6) + TODO.md Ready queue

---

## Acceptance Criteria

1. **Image Conversion:**
   - Convert existing JPG images in `angular-app/public/assets/pastor/` to WebP format
   - Maintain quality while reducing file size (target: 30-50% reduction)
   - Keep original JPGs as fallback or remove if WebP is fully compatible

2. **NgOptimizedImage Integration:**
   - Apply `NgOptimizedImage` directive to **About page** (`about.html`)
   - Apply `NgOptimizedImage` directive to **Media page** (`media.html`)
   - Apply `NgOptimizedImage` directive to **Contact page** (`contact.html`)
   - Use `fill` directive with appropriate parent containers for responsive sizing

3. **Build Verification:**
   - `npm run build` completes with 0 errors
   - No Angular image optimization warnings

4. **Documentation:**
   - Update HANDOVER.md to mark this task as complete
   - Add handoff note to USER_MESSAGES.md

---

## Context

From HANDOVER.md:
> "Images are raw JPGs (31–341 KB). Consider WebP conversion or responsive `srcset` for production performance."

Current images in `angular-app/public/assets/pastor/`:
- hero-main.jpg (288 KB)
- speaking-hero.jpg (244 KB)
- leadership-card.jpg (123 KB)
- discipleship-card.jpg (84 KB)
- strategy-card.jpg (80 KB)
- ministry-1.jpg (129 KB)
- gallery-1.jpg (31 KB)
- testimonial-1.jpg (170 KB)
- testimonial-2.jpg (170 KB)
- topic-insight.jpg (136 KB)
- pastor-portrait.jpg (341 KB)

---

## Notes

- Home, Speaking, Topic Detail, and Invite pages already use NgOptimizedImage correctly
- Use those implementations as reference patterns
- Angular's `NgOptimizedImage` automatically generates optimized formats including WebP when configured

---

**Action Required:** Implement WebP conversion and NgOptimizedImage integration for About, Media, and Contact pages.
