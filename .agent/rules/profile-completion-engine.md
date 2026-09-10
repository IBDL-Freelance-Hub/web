# Rule: Profile Completion Engine

## 1. Single Centralized Engine

Profile completion percentage MUST be computed strictly through a single centralized utility function or hook (`useProfileCompletion`). Never compute or inline completion percentages inside individual UI components.

---

## 2. Canonical Fields (Exactly 11 Fields)

The calculation MUST evaluate exactly 11 canonical fields, each carrying an equal weight of **1/11 (~9.09%)**:

1. Full Name
2. Bio / Summary
3. Phone Number
4. Country / Region
5. Primary Language
6. Years of Experience
7. Specialization / Category
8. Education Level
9. Certification / Accreditation Status
10. Work History / Experience Log
11. Portfolio / Sample Materials

---

## 3. Strict Exclusion Ban

- **ABSOLUTE BAN**: **Profile Photo** and **LinkedIn URL** MUST NEVER be included in the calculation of profile completion percentage.
- Any calculation logic referencing photo or LinkedIn as a field for completion percentage will be rejected during verification.
