# StarDash 🌟

StarDash is a premium, full-stack home services marketplace built specifically for Nairobi, Kenya. It seamlessly connects customers with trusted, verified professionals for a wide variety of cleaning and home services.

## Overview

Designed with a sleek, glassmorphism aesthetic matching the Stitch design system, the application is focused on building local trust, offering high-quality user experiences, and ensuring data security for all parties involved (Customers, Workers, and Admins).

**Target Market**: Nairobi, Kenya  
**Contact**: +254723531085 | bukhariabdiaziz22@gmail.com  
**Founder**: Nimca Abdirashid  

## Services Offered
- House & Apartment Deep Cleaning
- Laundry & Pressing
- Duvet, Carpet, & Mattress Cleaning
- Sofa Set Cleaning
- Move-in / Move-out Services
- Office Cleaning
- Security Services

---

## Tech Stack
- **Framework**: [Next.js 16+ (App Router)](https://nextjs.org) powering SSR and advanced routing.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) mapped to a bespoke, glassmorphic design system.
- **Authentication**: [Supabase Auth](https://supabase.com/docs/guides/auth) utilizing strict Email/Password flows with SSR cookies.
- **Database**: [Supabase (PostgreSQL)](https://supabase.com/docs/guides/database) with robust Row Level Security (RLS) policies.
- **State Management**: React Hooks & Server Actions.

---

## Project Structure
- `src/app`: Core Next.js App Router providing protected layouts and Role-Based views.
    - `/login`, `/signup`: Customer authentication flows.
    - `/dashboard`: Customer portal (Upcoming bookings, Recent history).
    - `/worker`, `/admin`: Protected administration & pro zones.
    - `/services`, `/booking`: Service catalogs and checkout processes.
- `src/components`:
    - `/layout`: Unified Navbars and Footers.
    - `/ui`: Reusable design system primitives (Cards, Badges, Buttons).
- `src/actions`: Next.js Server Actions managing secure Supabase modifications (Bookings, Auth, Profile edits).
- `supabase/migrations`: SQL Schema configurations for initializing the exact database structure.

---

## Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bukhaze/StarDash.git
   cd StarDash
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root directory encompassing your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   *Navigate to `http://localhost:3000` to view the application.*

---

## Deployment & Database Initialization
All logic is compatible with Vercel deployment. Ensure you execute the `0000_init_schema.sql` (found in `supabase/migrations/`) directly inside your Supabase CLI or Dashboard to safely inject all Enum rules, Tables, and RLS configurations prior to hitting production!

*Designed and Developed locally for Nairobi's highest standard.*
