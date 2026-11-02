# Quality Reports & Continuous Audit Artifacts

This directory contains timestamped machine-readable JSON summaries, detailed markdown reports, and baseline audit snapshots for [deardhruv.com](https://deardhruv.com).

## Directory Structure

```text
reports/
  quality/
    README.md              # This guide
    baseline/              # Baseline audit records and inventory
    latest/                # Latest generated audit scorecard and machine-readable JSON
      summary.json
      quality-audit-report.md
    history/               # Historical audit snapshots per release / sprint
    templates/             # Finding templates and audit checklists
  audit-status/
    QUALITY_AUDIT_STATUS.md # Current audit phase status and handoff ledger
```

## Running the Quality Audits

```bash
# Fast local pre-commit check
npm run quality:quick

# Domain-specific quality checks
npm run quality:a11y      # Accessibility tokens, contrast, landmarks
npm run quality:html      # HTML standards & semantic structure validator
npm run quality:links     # Internal links crawler & route verification
npm run quality:visual    # Visual landmarks and responsive assertions
npm run quality:browser   # 25-breakpoint viewport matrix verification
npm run quality:perf      # Performance budgets, bundle footprint, zero-framework
npm run quality:security  # Security headers, CSP, leak prevention

# Generate consolidated reports in reports/quality/latest/
npm run quality:report

# Full Release Candidate verification gate
npm run quality:release
```
