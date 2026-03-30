import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const SERVICES = [
  {
    icon: "🏠",
    title: "House & Apartment Cleaning",
    desc: "Top-to-bottom residential cleaning by our vetted specialists.",
    badge: "Most Popular",
    color: "bg-blue-50 border-blue-200",
  },
  {
    icon: "👔",
    title: "Laundry & Ironing",
    desc: "Professional wash, fold & ironing care with pickup and delivery.",
    badge: null,
    color: "bg-purple-50 border-purple-200",
  },
  {
    icon: "🛋️",
    title: "Sofa & Carpet Cleaning",
    desc: "Industrial-grade extraction that restores your upholstery.",
    badge: null,
    color: "bg-orange-50 border-orange-200",
  },
  {
    icon: "🛏️",
    title: "Mattress & Duvet Cleaning",
    desc: "Sanitize and refresh your sleeping environment deeply.",
    badge: null,
    color: "bg-teal-50 border-teal-200",
  },
  {
    icon: "📦",
    title: "Move In / Move Out",
    desc: "Complete deep-clean before or after your property transition.",
    badge: "High Demand",
    color: "bg-green-50 border-green-200",
  },
  {
    icon: "🏢",
    title: "Office Cleaning",
    desc: "Corporate-grade office sanitation on your schedule.",
    badge: null,
    color: "bg-slate-50 border-slate-200",
  },
  {
    icon: "🛡️",
    title: "Security Services",
    desc: "Vetted security professionals for your property and events.",
    badge: null,
    color: "bg-red-50 border-red-200",
  },
  {
    icon: "✨",
    title: "Deep Cleaning",
    desc: "An intensive treatment for homes that need extra attention.",
    badge: null,
    color: "bg-yellow-50 border-yellow-200",
  },
];

const STATS = [
  { value: "500+", label: "Services Completed" },
  { value: "4.9★", label: "Average Rating" },
  { value: "50+", label: "Vetted Specialists" },
  { value: "Nairobi", label: "Currently Serving" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "edit_note",
    title: "Submit a Request",
    desc: "Tell us what service you need, when, and where. Takes less than 2 minutes.",
  },
  {
    step: "02",
    icon: "manage_accounts",
    title: "We Review & Assign",
    desc: "Our operations team reviews your request and assigns a verified specialist.",
  },
  {
    step: "03",
    icon: "verified",
    title: "Service is Delivered",
    desc: "Your specialist arrives on time, does the job, and you rate the experience.",
  },
];

const TESTIMONIALS = [
  {
    name: "Fatima M.",
    location: "Kilimani, Nairobi",
    rating: 5,
    text: "StarDash assigned a cleaner to my apartment within hours. The quality was exceptional — they even organized things I didn't ask for. I'll never go back to searching on OLX.",
    service: "Apartment Cleaning",
    avatar: "F",
    avatarBg: "bg-blue-500",
  },
  {
    name: "James O.",
    location: "Westlands, Nairobi",
    rating: 5,
    text: "My sofa looked brand new after the extraction cleaning. The specialist was professional, on time, and incredibly thorough. Book them now.",
    service: "Sofa Cleaning",
    avatar: "J",
    avatarBg: "bg-green-500",
  },
  {
    name: "Amina K.",
    location: "Karen, Nairobi",
    rating: 5,
    text: "We used StarDash for move-out cleaning. The team was thorough, professional, and we got our deposit back in full. Highly recommend.",
    service: "Move-Out Cleaning",
    avatar: "A",
    avatarBg: "bg-purple-500",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen text-slate-900 font-body bg-white">
      <Navbar />

      <main className="flex-grow">

        {/* ──────────────── HERO ──────────────── */}
        <section className="relative bg-gradient-to-br from-slate-900 via-[#0f2a6e] to-[#1a56db] text-white overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[100px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />
            {/* Grid overlay */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-24 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* LEFT */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Nairobi&apos;s #1 Managed Home Services
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
                  Your Home,<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                    Expertly Cared For.
                  </span>
                </h1>

                <p className="text-xl text-white/70 leading-relaxed max-w-lg">
                  Submit a request and our operations team assigns a verified specialist to handle your home — cleaning, laundry, security and more.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-base hover:bg-slate-100 transition-all hover:shadow-xl active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-lg text-blue-600" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                    Get Started Free
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-base hover:bg-white/20 transition-all active:scale-[0.98]"
                  >
                    View All Services
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </Link>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-white/10">
                  {STATS.map((s) => (
                    <div key={s.label}>
                      <div className="text-2xl font-black text-white">{s.value}</div>
                      <div className="text-xs text-white/50 font-medium mt-0.5 uppercase tracking-wide">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — Floating Card */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative w-full max-w-sm">
                  {/* Main card */}
                  <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>cleaning_services</span>
                      </div>
                      <div>
                        <p className="font-bold text-white">Apartment Deep Clean</p>
                        <p className="text-white/50 text-sm">Requested by Amina K.</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[
                        { label: 'Status', value: 'Worker Assigned', color: 'text-green-400' },
                        { label: 'Specialist', value: 'John M. — 4.9★', color: 'text-white' },
                        { label: 'Scheduled', value: 'Today, 2:00 PM', color: 'text-white' },
                        { label: 'Location', value: 'Kilimani, Nairobi', color: 'text-white' },
                      ].map((row) => (
                        <div key={row.label} className="flex justify-between items-center text-sm">
                          <span className="text-white/40 font-medium">{row.label}</span>
                          <span className={`font-semibold ${row.color}`}>{row.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
                    </div>
                    <p className="text-white/40 text-xs text-center">Service in progress — 75% complete</p>
                  </div>

                  {/* Floating badge */}
                  <div className="absolute -top-6 -right-6 bg-emerald-500 text-white px-5 py-3 rounded-2xl shadow-2xl font-bold text-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    Background Verified
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────── TRUST BAR ──────────────── */}
        <section className="bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {[
                { icon: 'verified_user', text: 'Background-Checked Specialists' },
                { icon: 'schedule', text: 'Same-Day Availability' },
                { icon: 'shield_with_heart', text: 'Satisfaction Guaranteed' },
                { icon: 'headset_mic', text: 'Dedicated Support' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-slate-600">
                  <span className="material-symbols-outlined text-blue-600 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                  <span className="text-sm font-semibold whitespace-nowrap">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────── SERVICES GRID ──────────────── */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
              <div className="space-y-3">
                <p className="text-blue-600 font-bold text-sm uppercase tracking-widest">Our Services</p>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                  Everything your<br />home needs.
                </h2>
                <p className="text-slate-500 text-lg max-w-md">
                  We manage every request from intake to completion. Just tell us what you need.
                </p>
              </div>
              <Link href="/services" className="inline-flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-2xl font-semibold text-sm text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex-shrink-0">
                View All Services
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {SERVICES.map((service, i) => (
                <Link href="/services" key={i}
                  className={`group relative border rounded-3xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-white ${service.color}`}
                >
                  {service.badge && (
                    <span className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                      {service.badge}
                    </span>
                  )}
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="font-black text-slate-900 mb-2 leading-tight">{service.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-blue-600 text-xs font-bold group-hover:gap-2 transition-all">
                    Request Now
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────── HOW IT WORKS ──────────────── */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center mb-16 space-y-4">
              <p className="text-blue-600 font-bold text-sm uppercase tracking-widest">How It Works</p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Simple. Fast. Managed.
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                From request to completion — StarDash handles every step of the process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-16 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" />

              {HOW_IT_WORKS.map((step, i) => (
                <div key={i} className="relative text-center space-y-5 group">
                  <div className="relative mx-auto w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform duration-300">
                    <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{step.icon}</span>
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-white border-2 border-blue-200 rounded-xl flex items-center justify-center text-blue-600 text-xs font-black shadow-sm">
                      {step.step}
                    </div>
                  </div>
                  <div className="space-y-2 px-4">
                    <h3 className="text-xl font-black text-slate-900">{step.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/signup" className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-xl active:scale-[0.98]">
                Submit Your First Request
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ──────────────── TESTIMONIALS ──────────────── */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center mb-14 space-y-3">
              <p className="text-blue-600 font-bold text-sm uppercase tracking-widest">Customer Reviews</p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Nairobi homeowners<br />love StarDash.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 hover:shadow-lg transition-all duration-300 space-y-5">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <span key={j} className="text-yellow-400 text-base">★</span>
                    ))}
                  </div>
                  <p className="text-slate-700 leading-relaxed text-[15px]">&quot;{t.text}&quot;</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                    <div className={`w-10 h-10 rounded-full ${t.avatarBg} text-white flex items-center justify-center font-bold flex-shrink-0`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                      <p className="text-slate-400 text-xs">{t.location} · {t.service}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────── COVERAGE ──────────────── */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-blue-600 font-bold text-sm uppercase tracking-widest">Coverage Area</p>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                    Serving Nairobi&apos;s<br />finest neighbourhoods.
                  </h2>
                  <p className="text-slate-500 text-lg leading-relaxed">
                    Our specialist network is currently deployed across premium Nairobi districts, ensuring fast response times and local expertise.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {['Kilimani', 'Lavington', 'Westlands', 'Karen', 'Kileleshwa', 'Parklands', 'Runda', 'Muthaiga', 'Spring Valley'].map(area => (
                    <div key={area} className="flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2.5 rounded-xl">
                      <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                      <span className="text-sm font-semibold text-slate-700">{area}</span>
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors text-sm">
                  Don&apos;t see your area? Contact us
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-slate-900 to-[#0f2a6e] rounded-[2.5rem] p-12 text-white space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>home_work</span>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-3xl font-black leading-tight">Ready to book your first service?</h3>
                    <p className="text-white/60 leading-relaxed">Create a free account, submit a request, and we&apos;ll take it from there.</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Link href="/signup" className="inline-flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:shadow-xl active:scale-[0.98]">
                      Create Free Account
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                    <Link href="/services" className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold transition-all">
                      Browse Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────── FINAL CTA BANNER ──────────────── */}
        <section className="bg-blue-600 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Your clean home is<br />one request away.
            </h2>
            <p className="text-blue-100 text-lg">
              Join hundreds of Nairobi homeowners who trust StarDash for professional home care.
            </p>
            <Link href="/signup" className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
              Get Started Today — It&apos;s Free
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
