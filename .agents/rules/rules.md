---
trigger: always_on
---

# StarDash Workspace Rules

## Project Context
This workspace is for building **StarDash**, a premium full-stack home services marketplace based in Nairobi, Kenya.

StarDash connects customers with trusted workers for:
- house cleaning
- apartment cleaning
- laundry washing
- duvet cleaning
- sofa set cleaning
- carpet cleaning
- mattress cleaning
- move in / move out cleaning
- office cleaning
- security services

Business identity:
- Business name: StarDash
- Location: Nairobi, Kenya
- Contact phone: +254723531085
- Contact email: nimcaz22@gmail.com
- Founder: Nimca Abdirashid

Important context:
- The UI has already been designed in Stitch
- The Stitch-exported workspace contains multiple screens and sections
- The Stitch design is the visual source of truth
- The goal is to transform the current workspace into a production-ready full-stack application
- Deployment target is GitHub + Vercel

## Core Behavior Rules
- Always inspect the existing folder structure before making major changes
- Understand what already exists before editing, replacing, or generating new code
- Prefer improving, merging, and connecting the existing project instead of rebuilding it unnecessarily
- Keep the premium, trustworthy, modern StarDash look and feel across the application
- Preserve the Stitch visual direction for layout, spacing, style, hierarchy, and responsiveness
- Avoid generic templates that do not match the StarDash brand
- Keep the project clean, modular, scalable, and production-ready

## UI and Design Rules
- Preserve the premium modern service marketplace aesthetic
- Maintain strong white space, clean structure, and polished visual hierarchy
- Keep pages visually consistent with the Stitch design
- Reuse components wherever possible
- Merge duplicate UI patterns into reusable components
- Do not introduce clashing colors, inconsistent spacing, or low-quality placeholder sections
- Keep interactions smooth, modern, and professional
- Ensure the design feels secure, trustworthy, and startup-level

## Local Business Rules
- Keep StarDash clearly grounded in Nairobi, Kenya
- Use Nairobi service coverage naturally where relevant
- Preserve the contact details and founder identity in appropriate sections
- Ensure local trust and professionalism are reflected in the UI and content

## Engineering Rules
- Use clean folder structure and readable code
- Use reusable components instead of duplicating code
- Keep business logic separated from UI logic where possible
- Avoid unnecessarily large, messy files
- Avoid unnecessary dependencies
- Do not break working functionality while adding new features
- Before major edits, inspect dependencies and affected files
- Explain major file changes clearly while working

## Functional Scope
The application should support:
- public landing page
- services listing
- service detail pages
- booking flow
- customer dashboard
- worker dashboard
- admin dashboard
- authentication
- role-based access
- worker onboarding and verification
- booking history
- profile management
- reviews
- support
- service area coverage
- payment-ready architecture

## Security Rules
- Use secure email and password authentication
- Support email verification and forgot password
- Do not rely on SMS OTP
- Protect customer, worker, and admin routes properly
- Never expose secrets in frontend code
- Never hardcode sensitive keys
- Validate all server-side inputs
- Ensure users can only access their own private data
- Ensure workers can only access their own jobs, earnings, and settings
- Ensure admins have protected elevated access
- Protect uploaded verification documents and private records
- Keep the platform safe for production deployment

## Quality Rules
- Handle loading, empty, success, and error states properly
- Ensure routes are connected correctly
- Ensure forms are validated properly
- Ensure mobile responsiveness is a priority
- Remove duplicate code, broken imports, and placeholder content
- Keep the final result deployable and professional
- Do not ship unfinished dummy flows as production features

## Working Method
- First inspect the entire workspace
- Then summarize what exists
- Then identify reusable parts
- Then identify missing pages, flows, and backend logic
- Then create a phased implementation plan
- Then implement carefully phase by phase
- Verify the system still runs after each major change
- Prioritize production readiness over quick temporary fixes

## Final Goal
Transform this workspace into a polished, secure, full-stack, Nairobi-based premium home services platform called StarDash, aligned with the Stitch design and ready for GitHub and Vercel deployment.