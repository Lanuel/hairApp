import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  HelpCircle,
  Mail,
  MapPin,
  MessageCircle,
  PhoneCall,
} from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";

const SUPPORT_EMAIL = "gracethair@gmail.com";
const WHATSAPP_PHONE = "+234 904 651 0072";
const SUPPORT_PHONES = ["+234 906 710 8396", WHATSAPP_PHONE] as const;
const WHATSAPP_LINK =
  "https://wa.me/2349046510072?text=Hello%20GraceT%20Hair%2C%20I%20need%20help%20with%20an%20order.";

const faqs = [
  {
    question: "How quickly will GraceT Hair respond?",
    answer:
      "We aim to respond to all emails within 24-48 business hours. For faster support, you can call or send a WhatsApp message during business hours.",
  },
  {
    question: "Can I chat with customer support on WhatsApp?",
    answer:
      "Yes. Use the WhatsApp chat button for +234 904 651 0072 to ask about products, order assistance, delivery updates, or custom requests.",
  },
  {
    question: "What are your business hours?",
    answer:
      "Customer support is available Monday - Friday, 9:00 AM - 5:00 PM WAT.",
  },
  {
    question: "Where is GraceT Hair located?",
    answer:
      "You can visit GraceT Hair Company at 12 Edo Street, Jikwoyi Phase I, Abuja, FCT, Nigeria.",
  },
  {
    question: "Can I request help with a custom order?",
    answer:
      "Absolutely. Send your preferred length, texture, color, lace preference, and any reference photo by email, WhatsApp, or through the custom order page.",
  },
] as const;

export const metadata: Metadata = {
  title: "Contact GraceT Hair | Customer Support",
  description:
    "Contact GraceT Hair for product questions, order support, WhatsApp chat, store visits, and customer service.",
};

function phoneHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export default function ContactPage() {
  return (
    <main className="bg-black text-white min-h-screen page-below-nav">
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-36">
              <p className="text-gold text-xs font-semibold tracking-[0.22em] uppercase mb-4">
                Customer Support
              </p>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-tight font-light">
                Contact Us
              </h1>
              <p className="mt-6 text-white/65 text-base sm:text-lg leading-8 max-w-2xl">
                We&apos;re here to help. Whether you have questions about our
                products, need assistance with an order, or would like to share
                feedback, our team is always happy to assist.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25d366]/70"
                  aria-label={`Chat with GraceT Hair on WhatsApp at ${WHATSAPP_PHONE}`}
                >
                  <MessageCircle className="h-5 w-5" aria-hidden />
                  WhatsApp Chat
                </a>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-accent/60 hover:bg-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                >
                  <Mail className="h-5 w-5" aria-hidden />
                  Email Support
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-lg border border-white/10 bg-white/4 p-6">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/20 text-gold">
                  <Mail className="h-5 w-5" aria-hidden />
                </div>
                <h2 className="font-serif text-2xl">Email</h2>
                <p className="mt-3 text-sm leading-6 text-white/60">
                  For general inquiries or customer support, email us anytime.
                </p>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-white"
                >
                  {SUPPORT_EMAIL}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </article>

              <article className="rounded-lg border border-white/10 bg-white/4 p-6">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/20 text-gold">
                  <PhoneCall className="h-5 w-5" aria-hidden />
                </div>
                <h2 className="font-serif text-2xl">Phone</h2>
                <p className="mt-3 text-sm leading-6 text-white/60">
                  Speak with our customer support team during business hours.
                </p>
                <div className="mt-5 grid gap-2">
                  {SUPPORT_PHONES.map((phone) => (
                    <a
                      key={phone}
                      href={phoneHref(phone)}
                      className="inline-flex items-center justify-between rounded-md border border-white/10 px-3 py-2 text-sm text-white/80 transition-colors hover:border-accent/60 hover:text-gold"
                    >
                      <span>{phone}</span>
                      <PhoneCall className="h-4 w-4" aria-hidden />
                    </a>
                  ))}
                </div>
              </article>

              <article className="rounded-lg border border-white/10 bg-white/4 p-6">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/20 text-gold">
                  <Clock className="h-5 w-5" aria-hidden />
                </div>
                <h2 className="font-serif text-2xl">Business Hours</h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="text-white/45">Days</dt>
                    <dd className="mt-1 text-white">Monday - Friday</dd>
                  </div>
                  <div>
                    <dt className="text-white/45">Time</dt>
                    <dd className="mt-1 text-white">9:00 AM - 5:00 PM WAT</dd>
                  </div>
                </dl>
              </article>

              <article className="rounded-lg border border-white/10 bg-white/4 p-6">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/20 text-gold">
                  <MapPin className="h-5 w-5" aria-hidden />
                </div>
                <h2 className="font-serif text-2xl">Visit Us</h2>
                <address className="mt-4 not-italic text-sm leading-7 text-white/70">
                  GraceT Hair Company
                  <br />
                  12 Edo Street
                  <br />
                  Jikwoyi Phase I
                  <br />
                  Abuja, FCT
                  <br />
                  Nigeria
                </address>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#080808] px-4 sm:px-6 py-12">
        <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="text-gold text-xs font-semibold tracking-[0.22em] uppercase mb-3">
              Follow Us
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light">
              Stay connected with GraceT Hair
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/60 max-w-xl">
              Follow us for new arrivals, promotions, beauty tips, and customer
              support.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
            <a
              href="https://www.instagram.com/GraceThair"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-accent/60 hover:text-gold"
            >
              <FaInstagram className="h-5 w-5" aria-hidden />
              Instagram: @GraceThair
            </a>
            <a
              href="https://www.facebook.com/GraceThair"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-accent/60 hover:text-gold"
            >
              <FaFacebookF className="h-5 w-5" aria-hidden />
              Facebook: @GraceThair
            </a>
          </div>
        </div>
      </section>

      <section id="faq" className="px-4 sm:px-6 py-16 scroll-mt-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20 text-gold">
              <HelpCircle className="h-6 w-6" aria-hidden />
            </div>
            <p className="text-gold text-xs font-semibold tracking-[0.22em] uppercase mb-3">
              FAQ
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-light">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y divide-white/10 rounded-lg border border-white/10 bg-white/3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group p-5 sm:p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium text-white">
                  <span>{faq.question}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-gold transition-transform group-open:rotate-90">
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-white/60">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-10 rounded-lg border border-accent/30 bg-accent/10 p-6 text-center">
            <h2 className="font-serif text-3xl font-light">
              We&apos;re here for you
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/65">
              Thank you for choosing GraceT Hair. We appreciate your trust and
              look forward to serving you with premium-quality hair products and
              exceptional customer service.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/custom-order"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-gold"
              >
                Custom Order
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-accent/60 hover:text-gold"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
