---
description: 
---

# StarDash Workspace Workflow

## Phase 1: Inspect the Workspace
1. Inspect the full opened workspace first
2. Identify the framework, routing structure, styling setup, components, backend structure, and data setup
3. Review all exported Stitch folders and identify what each one contains
4. Determine what is already complete, partially complete, missing, broken, duplicated, or disconnected
5. Summarize findings before making major implementation changes

## Phase 2: Organize and Plan
1. Create a phased implementation plan based on the current workspace state
2. Decide which exported folders should be merged into shared reusable components
3. Preserve the strongest parts of the Stitch design
4. Remove or avoid redundant duplication where necessary
5. Prioritize building from the current workspace rather than rebuilding everything

## Phase 3: Create a Clean App Structure
1. Consolidate reusable UI pieces such as:
   - navbar
   - footer
   - hero sections
   - trust badges
   - service cards
   - worker profile cards
   - booking forms
   - buttons
   - inputs
   - dashboard widgets
2. Organize pages into a clean app structure
3. Ensure responsive behavior across desktop and mobile
4. Keep visual consistency with the Stitch design throughout

## Phase 4: Complete Public Customer-Facing Pages
Build or complete:
- Home page
- Services listing page
- Service details page
- Booking flow page
- About page
- Contact page
- Become a Worker page
- FAQ or support-oriented section if applicable

Important public content to preserve:
- Nairobi-based brand identity
- contact phone: +254723531085
- contact email: nimcaz22@gmail.com
- founder mention: Nimca Abdirashid
- service areas in Nairobi

## Phase 5: Implement Authentication
1. Implement secure email and password authentication
2. Implement email verification
3. Implement forgot password flow
4. Support role-based access for:
   - customer
   - worker
   - admin
5. Protect routes based on role
6. Ensure session handling is secure and production-ready

## Phase 6: Implement Backend and Database
Create or refine the database schema for:
- users
- worker_profiles
- worker_documents
- services
- service_categories
- bookings
- booking_items
- addresses
- reviews
- support_tickets
- notifications
- admin_settings
- transactions or payment-ready records

Then:
1. connect frontend pages to real backend logic
2. ensure data persists correctly
3. ensure role-based access works correctly
4. ensure services, workers, and bookings are queryable and manageable

## Phase 7: Implement Core Marketplace Logic
1. Implement service browsing
2. Implement service detail logic
3. Implement booking flow:
   - choose service
   - choose location
   - choose date and time
   - choose extras if applicable
   - assign or match worker
   - booking summary
   - confirmation
4. Support booking status flow such as:
   - pending
   - confirmed
   - worker_assigned
   - in_progress
   - completed
   - cancelled
5. Support worker availability
6. Support customer booking history
7. Support ratings and reviews after completed services

## Phase 8: Build Customer Dashboard
Build or complete:
- profile page
- active bookings
- booking history
- addresses
- reviews
- support requests
- settings

## Phase 9: Build Worker Dashboard
Build or complete:
- worker profile
- verification status
- job requests
- accepted jobs
- availability
- earnings overview
- ratings
- settings

## Phase 10: Build Admin Dashboard
Build or complete:
- dashboard overview
- worker management
- worker approval / rejection
- services management
- booking management
- reviews moderation
- support ticket management
- analytics and reporting basics
- settings

## Phase 11: Security and Cleanup
1. validate role-based access control
2. secure private routes and private data access
3. secure uploaded worker verification files
4. remove hardcoded placeholders and demo content
5. remove broken imports and duplicate components
6. ensure form validation and server-side checks are in place
7. ensure the app is safe for public deployment

## Phase 12: Testing
1. test all main routes
2. test auth flows
3. test customer dashboard flows
4. test worker dashboard flows
5. test admin dashboard flows
6. test booking flow end to end
7. test responsiveness across page types
8. fix issues before deployment readiness

## Phase 13: GitHub and Vercel Readiness
1. ensure environment variables are correctly used
2. ensure no secrets are committed
3. ensure the app builds successfully for production
4. optimize assets and performance where possible
5. confirm the project is cleanly deployable to GitHub and Vercel

## Execution Rules
- Do not skip workspace inspection
- Do not blindly rebuild the entire project
- Prefer careful phased implementation
- After each major phase, verify the project still runs
- Keep the Stitch design aligned throughout
- Focus on production-ready quality and clean structure