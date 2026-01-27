# NAP Consistency Audit

**Date:** 2026-01-27
**Status:** PARTIALLY UPDATED - UK/IE have real Belfast GBP data, other locales placeholder
**Auditor:** Performance & Launch Validation Phase (05-03)
**Last Updated:** 2026-01-27 (post-05-03 fixes)

## Executive Summary

This audit verifies that NAP (Name, Address, Phone) data is managed through a single source of truth and used consistently across all website components. **Current data is placeholder-only and must be replaced with real contact information before Google Business Profile setup.**

**Finding:** NAP architecture is correct - all components use `src/lib/locales.ts` as the single source of truth. Footer hardcoded phone bug FIXED in commit af46cb3. UK and IE locales updated with verified Belfast GBP data.

## Current NAP Data (from locales.ts)

### United States (us)
- **Name:** Rosey Co.
- **Phone:** +1 (555) 123-4567 (PLACEHOLDER)
- **Address:** Missouri, United States
- **Currency:** USD
- **Timezone:** America/Chicago

### Netherlands (nl)
- **Name:** Rosey Co.
- **Phone:** +31 20 123 4567 (PLACEHOLDER)
- **Address:** Amsterdam, Nederland
- **Currency:** EUR
- **Timezone:** Europe/Amsterdam

### Denmark (dk)
- **Name:** Rosey Co.
- **Phone:** +45 12 34 56 78 (PLACEHOLDER)
- **Address:** København, Danmark
- **Currency:** DKK
- **Timezone:** Europe/Copenhagen

### Australia (au)
- **Name:** Rosey Co.
- **Phone:** +61 2 1234 5678 (PLACEHOLDER)
- **Address:** Sydney, Australia
- **Currency:** AUD
- **Timezone:** Australia/Sydney

### United Kingdom (uk)
- **Name:** Rosey Co.
- **Phone:** +44 7722 432679 ✅ VERIFIED (Belfast GBP)
- **Address:** 1 Hollycroft Avenue, Belfast, BT5 5JE, United Kingdom ✅ VERIFIED
- **Currency:** GBP
- **Timezone:** Europe/London
- **Notes:** Belfast GBP covers UK market

### Ireland (ie)
- **Name:** Rosey Co.
- **Phone:** +44 7722 432679 ✅ VERIFIED (Belfast GBP)
- **Address:** 1 Hollycroft Avenue, Belfast, BT5 5JE, United Kingdom ✅ VERIFIED
- **Currency:** EUR
- **Timezone:** Europe/Dublin
- **Notes:** Belfast GBP covers Ireland market (same contact point)

## Components Using NAP Data

| Component | File | Uses locales.ts | Hardcoded Values | Notes |
|-----------|------|-----------------|------------------|-------|
| LocalBusinessStructuredData | `src/components/seo/structured-data.tsx` | ✅ Yes | None | Correctly imports and uses `locales[locale]` for phone and address in JSON-LD schema |
| Footer | `src/components/layout/footer.tsx` | ✅ Yes | Email only (global) | ✅ FIXED: Now uses `locales[locale]?.phone` (commit af46cb3). Email `team@roseyco.com` intentionally global. |
| Contact Page | `src/app/[locale]/contact/page-client.tsx` | ✅ Yes | None | Uses `localeConfig.phone` (line 164, 271) and `localeConfig.address` (line 273) |

## Inconsistencies Found

### ✅ FIXED Issues

1. **Footer Phone Number Hardcoded** - ✅ RESOLVED
   - **Location:** `src/components/layout/footer.tsx` line 236
   - **Was:** `+1 (234) 567-890` (hardcoded)
   - **Now:** `locales[locale as keyof typeof locales]?.phone` (dynamic)
   - **Fix Commit:** af46cb3 - "fix(05-03): use dynamic locale phone in footer instead of hardcoded"
   - **Impact:** Footer now shows correct phone for each locale
   - **Status:** ✅ RESOLVED

2. **Footer Not Using Locale-Specific Data** - ✅ RESOLVED
   - **Location:** `src/components/layout/footer.tsx` lines 226-238
   - **Was:** Hardcoded phone number
   - **Now:** Uses `locales[locale]?.phone` dynamically with fallback
   - **Status:** ✅ RESOLVED

### No Issues Remaining

3. **Email Address Hardcoded (Intentional)**
   - **Location:** `src/components/layout/footer.tsx` line 208
   - **Current:** `team@roseyco.com` (hardcoded)
   - **Status:** ✅ ACCEPTABLE - Email is global, not locale-specific
   - **Rationale:** Single global email address for all markets

## Phone Number Format Standards

All phone numbers in `locales.ts` use international format with country code. This format MUST be used exactly in Google Business Profile.

| Locale | Format Pattern | Example (Placeholder) | Notes |
|--------|----------------|----------------------|-------|
| US | +1 (XXX) XXX-XXXX | +1 (555) 123-4567 | Include parentheses and hyphen |
| NL | +31 XX XXX XXXX | +31 20 123 4567 | Space-separated groups |
| DK | +45 XX XX XX XX | +45 12 34 56 78 | Four 2-digit groups |
| AU | +61 X XXXX XXXX | +61 2 1234 5678 | Area code + 8 digits |
| UK | +44 XX XXXX XXXX | +44 20 1234 5678 | London format shown |
| IE | +353 X XXX XXXX | +353 1 234 5678 | Dublin format shown |

**Critical:** When updating with real data, maintain exact same format including spaces and punctuation.

## Address Format Standards

Current addresses are city-level placeholders. For GBP verification, addresses must include:

- **Street address:** Full street number and name
- **Suite/Unit:** If applicable (e.g., "Suite 100")
- **City:** Full city name (not abbreviated)
- **State/Province:** Full name or standard abbreviation
- **Postal/ZIP code:** Required for most locales
- **Country:** Full country name

**Example of acceptable format:**
```
123 Main Street, Suite 100, Kansas City, MO 64101, United States
```

## Architecture Verification

### Single Source of Truth: ✅ PASSED

The architecture correctly implements a single source of truth pattern:

1. **Data Definition:** `src/lib/locales.ts` exports `locales` object (lines 19-86)
2. **Type Safety:** TypeScript interfaces ensure type consistency (`LocaleConfig`, `LocaleCode`)
3. **Helper Functions:** `isValidLocale()` and `getLocale()` provide safe access (lines 92-101)
4. **Export Structure:** Clean exports enable importing exactly what's needed

### Component Integration: ⚠️ MOSTLY CORRECT

| Component | Integration Status | Notes |
|-----------|-------------------|-------|
| Structured Data | ✅ Correct | Uses `locales[locale]` directly (line 198 in structured-data.tsx) |
| Contact Page | ✅ Correct | Uses `getLocale()` helper, accesses via `localeConfig` (line 30 in page-client.tsx) |
| Footer | ❌ Incorrect | Hardcodes phone number instead of using locale data |

## Required Actions Before GBP Setup

### 1. ✅ Fix Footer Component - COMPLETED
**Status:** ✅ FIXED in commit af46cb3
- Footer now uses dynamic locale phone from locales.ts
- Pattern matches contact page implementation
- Ensures NAP consistency across all components

### 2. Provide Real Contact Information for Remaining Locales

Bailey must provide real contact information for remaining locales:

| Locale | Required Data | Format Notes | Status |
|--------|--------------|--------------|--------|
| US | Phone, Full address with ZIP | Missouri or Kansas City location | ⚠️ PLACEHOLDER |
| AU | Phone, Full address with postcode | Sydney location | ⚠️ PLACEHOLDER |
| UK | ✅ Provided | Belfast GBP | ✅ VERIFIED |
| IE | ✅ Provided | Belfast GBP (covers IE) | ✅ VERIFIED |
| NL | Phone, Full address with postcode | Amsterdam location | ⚠️ PLACEHOLDER |
| DK | Phone, Full address with postcode | Copenhagen location | ⚠️ PLACEHOLDER |

**Update:** UK and IE now have verified Belfast GBP data:
- Phone: +44 7722 432679
- Address: 1 Hollycroft Avenue, Belfast, BT5 5JE, United Kingdom
- This single Belfast GBP covers both UK and Ireland markets

### 3. Update locales.ts with Real Data

Once Bailey provides data:
1. Open `src/lib/locales.ts`
2. Replace placeholder phone numbers (lines 27, 38, 49, 60, 71, 82)
3. Replace placeholder addresses (lines 28, 39, 50, 61, 72, 83)
4. Remove "(PLACEHOLDER)" comments
5. Run `npm run build` to verify no errors
6. Deploy to production

### 4. Verify NAP Consistency

After updating, verify NAP appears consistently:

1. **Footer contact section:** Check phone displays correctly for each locale
2. **Contact page:** Verify phone placeholder matches locale data
3. **Structured data:** Inspect page source, search for "LocalBusiness" schema
4. **Compare:** Ensure all three locations show EXACT same format

### 5. Coordinate with Bailey for GBP Setup

Once website NAP data is finalized and deployed:
1. Share exact NAP data with Bailey (see `gbp-coordination.md` checklist)
2. Bailey creates/claims GBP listings using EXACT same data
3. Verify website link appears in GBP listings
4. Monitor local search rankings

## Verification Checklist

Before marking NAP audit complete:

- [x] Audited all components for NAP data usage
- [x] Verified single source of truth architecture
- [x] Identified hardcoded values (footer phone)
- [x] Documented phone number format standards
- [x] Documented address format requirements
- [x] ✅ Footer component fixed to use locale data (commit af46cb3)
- [x] ✅ Real contact information received for UK/IE (Belfast GBP)
- [x] ✅ locales.ts updated with Belfast data for UK/IE (commit 1ec4243)
- [ ] ⚠️ Production deployment pending
- [ ] ⚠️ NAP consistency verified across all components (pending deployment)
- [ ] ⚠️ Real contact info needed for US, AU, NL, DK
- [ ] ⚠️ GBP coordination initiated with Bailey

## Recommendations

### Priority 1 (Before GBP Setup)
1. **Fix footer component** to use `locales[locale].phone` instead of hardcoded value
2. **Obtain real contact information** from Bailey for all 6 locales
3. **Update locales.ts** with real data, maintaining exact format standards
4. **Deploy to production** and verify NAP displays correctly

### Priority 2 (Nice to Have)
1. **Display address in footer** contact section (optional, depends on design)
2. **Add address validation** to ensure format consistency when updating
3. **Create NAP update documentation** for future contact info changes

### Priority 3 (Future Enhancement)
1. **Automated NAP testing** to detect inconsistencies in CI/CD
2. **GBP API integration** for automated verification (if available)
3. **Multi-location expansion** procedures for additional locales

## Notes for Future Reference

- **NAP Format Lock:** Once GBP is set up, changing NAP format requires updating BOTH website AND GBP simultaneously
- **Citation Consistency:** Future directory listings (Yelp, Yellow Pages, etc.) must use exact same NAP format
- **Verification Process:** GBP verification typically takes 1-2 weeks (postcard or video verification)
- **Local SEO Impact:** NAP consistency is non-negotiable for local search rankings
- **Documentation:** Keep records of exact NAP data used for all external services

## Appendix: Code References

### locales.ts Structure
```typescript
// File: src/lib/locales.ts
export interface LocaleConfig {
  code: LocaleCode;
  language: string;
  languageCode: string;
  country: string;
  countryCode: string;
  currency: string;
  phone: string;        // ← NAP data
  address: string;      // ← NAP data
  timezone: string;
}

export const locales: Record<LocaleCode, LocaleConfig> = {
  us: { ... },  // Lines 20-30
  nl: { ... },  // Lines 31-41
  dk: { ... },  // Lines 42-52
  au: { ... },  // Lines 53-63
  uk: { ... },  // Lines 64-74
  ie: { ... },  // Lines 75-85
}
```

### Structured Data Usage
```typescript
// File: src/components/seo/structured-data.tsx (line 198)
const config = locales[locale]
const schema: LocalBusinessSchema = {
  telephone: config.phone,  // ✅ Correct usage
  address: {
    addressLocality: config.address.split(',')[0].trim(),  // ✅ Correct usage
    addressCountry: config.countryCode,
  },
}
```

### Contact Page Usage
```typescript
// File: src/app/[locale]/contact/page-client.tsx (line 30)
const localeConfig = getLocale(validLocale)

// Line 164: Phone input placeholder
<Input placeholder={localeConfig.phone} />  // ✅ Correct usage

// Line 271: Phone display
value: localeConfig.phone  // ✅ Correct usage

// Line 273: Address display
value: localeConfig.address  // ✅ Correct usage
```

---

**Audit Complete:** NAP architecture is sound. Fix footer hardcoded phone, obtain real data, then proceed to GBP setup.
