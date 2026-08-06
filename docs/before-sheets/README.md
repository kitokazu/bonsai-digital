# "Before" spreadsheet mockups

Source for the spreadsheet screenshots in the problem section of the Apex
Autowerks Ops and RoleMap case studies. They are HTML rendered to PNG rather
than real workbooks, so the exact cells, errors and formatting stay under
version control and can be re-rendered at any size.

- `rolemap.html` reproduces the Overview tab of
  `demo/before-rolemap/Team_Staffing_Overview_v14_FINAL2.xlsx` in the RoleMap
  project. Cell references match that project's own `why_rolemap.csv`, so
  Naomi's hand-typed total really is H11 and Emma's `#REF!` really is H16.
- `apex.html` is a reconstruction. The Apex project ships no original workbook,
  so this was built from its data model using the same SKUs and prices as the
  live demo. The formula bar shows `=F7*$F$2`, and 142.00 x 1.62 = 230.04
  matches the selected cell.

Both use fictional data, matching the demos they sit next to.

## Re-rendering

```
node shoot-sheets.mjs
```

Needs `playwright` on the path. Outputs `rolemap-sheet.png` and
`apex-sheet.png` at 2x, which belong at:

- `public/rolemap/before-spreadsheet.png`
- `public/apex-autowerks/before-spreadsheet.png`
