"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Filter,
  Mail,
  Menu,
  MessageSquare,
  Phone,
  Search,
  User,
  X,
} from "lucide-react";
import type { Artwork } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";

const faqs = [
  {
    q: "What is the price of each painting?",
    a: "Pricing is shared upon inquiry. Each work may have different terms depending on availability, provenance, and collection status.",
  },
  {
    q: "I am interested in a painting, what should I do?",
    a: "Select the artwork and click 'Acquire painting'. Fill in your details, and a member of the collection team will contact you directly to continue the conversation.",
  },
  {
    q: "Can I see the painting in person?",
    a: "Yes. Private viewings can be arranged by appointment, subject to artwork availability and location.",
  },
  {
    q: "How will the painting be delivered?",
    a: "Delivery options depend on the work's size, destination, and condition requirements. Secure packing and specialized art logistics can be arranged as needed.",
  },
];

const TOKENS = {
  bg: "#ffffff",
  text: "#111111",
  textSoft: "#666666",
  textMuted: "#8a8a8a",
  border: "#e7e7e7",
  panel: "#f7f7f5",
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80";

function artworkImageUrl(art: Artwork | null): string {
  if (!art) return FALLBACK_IMAGE;
  if (art.image?.asset) {
    const url = urlFor(art.image as Record<string, unknown>);
    if (url) return url.width(1200).quality(80).url();
  }
  return FALLBACK_IMAGE;
}

type BadgeProps = {
  value: Artwork["availability"];
};

function Badge({ value }: BadgeProps) {
  const styles = {
    Available: {
      background: "#111111",
      color: "#ffffff",
      border: "1px solid #111111",
    },
    Sold: {
      background: "#f0f0f0",
      color: "#666666",
      border: "1px solid #f0f0f0",
    },
    "Not for sale": {
      background: "#fbfbfb",
      color: "#666666",
      border: `1px solid ${TOKENS.border}`,
    },
  } as const;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: 999,
        padding: "8px 14px",
        fontSize: 12,
        fontWeight: 600,
        ...styles[value],
      }}
    >
      {value}
    </span>
  );
}

type FieldProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
};

function Field({ icon, children }: FieldProps) {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          left: 14,
          top: 12,
          color: TOKENS.textMuted,
          pointerEvents: "none",
        }}
      >
        {icon}
      </div>
      {children}
    </div>
  );
}

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: number;
};

function Modal({ open, onClose, children, maxWidth = 640 }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.28)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            zIndex: 1000,
          }}
        >
          <motion.div
            initial={{ y: 18, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth,
              borderRadius: 28,
              background: TOKENS.bg,
              border: `1px solid ${TOKENS.border}`,
              padding: 28,
              boxSizing: "border-box",
              boxShadow: "0 18px 60px rgba(0,0,0,0.10)",
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type FaqItemProps = {
  item: (typeof faqs)[number];
  open: boolean;
  onToggle: () => void;
};

function FaqItem({ item, open, onToggle }: FaqItemProps) {
  return (
    <div style={{ borderTop: `1px solid ${TOKENS.border}` }}>
      <button
        onClick={onToggle}
        style={{
          border: "none",
          background: "transparent",
          padding: "22px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          cursor: "pointer",
          textAlign: "left",
          fontSize: 18,
          fontWeight: 500,
          color: TOKENS.text,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <span>{item.q}</span>
        <ChevronDown
          size={18}
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            flexShrink: 0,
          }}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div
              style={{
                padding: "0 0 22px 0",
                color: TOKENS.textSoft,
                lineHeight: 1.8,
                maxWidth: 760,
              }}
            >
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function GalleryClient({ artworks }: { artworks: Artwork[] }) {
  const [selectedArtwork, setSelectedArtwork] = useState(
    artworks.length > 0 ? artworks[0] : null
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [filters, setFilters] = useState({ style: "All", artist: "All", title: "" });
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Hello, I am interested in ${artworks[0]?.title || "this artwork"}. I would like to learn more about its availability and arrange a viewing if possible.`,
  });
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const styleOptions = ["All", ...new Set(artworks.map((art) => art.style))];
  const artistOptions = ["All", ...new Set(artworks.map((art) => art.artist))];

  const filteredArtworks = useMemo(() => {
    return artworks.filter((art) => {
      const matchStyle = filters.style === "All" || art.style === filters.style;
      const matchArtist = filters.artist === "All" || art.artist === filters.artist;
      const matchTitle = art.title.toLowerCase().includes(filters.title.toLowerCase());
      return matchStyle && matchArtist && matchTitle;
    });
  }, [artworks, filters]);

  const openInquiry = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setForm((prev) => ({
      ...prev,
      message: `Hello, I am interested in ${artwork.title} by ${artwork.artist}. I would like to learn more about its availability and arrange a viewing if possible.`,
    }));
    setInquiryOpen(true);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInquiryOpen(false);
    setConfirmationOpen(true);
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: TOKENS.bg,
      color: TOKENS.text,
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    shell: {
      width: "100%",
      maxWidth: 1320,
      margin: "0 auto",
      paddingLeft: "28px",
      paddingRight: "28px",
      boxSizing: "border-box" as const,
    },
    header: {
      position: "sticky" as const,
      top: 0,
      zIndex: 40,
      borderBottom: `1px solid ${TOKENS.border}`,
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(12px)",
    },
    headerRow: {
      minHeight: 72,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
    },
    brand: {
      textDecoration: "none",
      color: TOKENS.text,
      fontSize: 12,
      textTransform: "uppercase" as const,
      letterSpacing: "0.28em",
    },
    navDesktop: {
      display: "flex",
      alignItems: "center",
      gap: 28,
    },
    navLink: {
      border: "none",
      background: "transparent",
      color: TOKENS.textSoft,
      cursor: "pointer",
      fontSize: 14,
      padding: 0,
    },
    navMobile: {
      borderTop: `1px solid ${TOKENS.border}`,
      padding: "8px 0 14px",
      display: "flex",
      flexDirection: "column" as const,
      gap: 10,
    },
    menuButton: {
      border: "none",
      background: "transparent",
      padding: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: TOKENS.text,
      cursor: "pointer",
    },
    hero: {
      display: "grid",
      gridTemplateColumns: "1.05fr 0.95fr",
      gap: 64,
      alignItems: "center",
      minHeight: "calc(90vh - 72px)",
      padding: "36px 28px 28px",
    },
    heroImageWrap: {
      width: "100%",
      aspectRatio: "4 / 5",
      background: TOKENS.panel,
      borderRadius: 32,
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
      display: "block",
    },
    overline: {
      fontSize: 12,
      textTransform: "uppercase" as const,
      letterSpacing: "0.28em",
      color: TOKENS.textMuted,
      marginBottom: 20,
      paddingLeft: "28px",
      paddingRight: "28px",
    },
    heroTitle: {
      margin: 0,
      fontSize: 64,
      lineHeight: 1.03,
      fontWeight: 500,
    },
    paragraph: {
      marginTop: 24,
      color: TOKENS.textSoft,
      fontSize: 18,
      lineHeight: 1.8,
      maxWidth: 640,
      paddingLeft: "28px",
      paddingRight: "28px",
    },
    textContainer: {
      paddingLeft: "28px",
      paddingRight: "28px",
    },
    buttonRow: {
      marginTop: 32,
      display: "flex",
      flexWrap: "wrap" as const,
      gap: 12,
    },
    primaryButton: {
      borderRadius: 999,
      padding: "16px 28px",
      border: `1px solid ${TOKENS.text}`,
      background: TOKENS.text,
      color: TOKENS.bg,
      cursor: "pointer",
      fontSize: 14,
    },
    secondaryButton: {
      borderRadius: 999,
      padding: "16px 28px",
      border: `1px solid ${TOKENS.border}`,
      background: TOKENS.bg,
      color: TOKENS.text,
      cursor: "pointer",
      fontSize: 14,
    },
    section: {
      padding: "96px 0",
    },
    sectionHeader: {
      marginBottom: 32,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 32,
      flexWrap: "wrap" as const,
    },
    sectionTitle: {
      margin: 0,
      fontSize: 52,
      lineHeight: 1.05,
      fontWeight: 500,
      paddingLeft: "28px",
      paddingRight: "28px",
    },
    filters: {
      width: "100%",
      maxWidth: 780,
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: 12,
    },
    input: {
      width: "100%",
      height: 46,
      borderRadius: 999,
      border: `1px solid ${TOKENS.border}`,
      padding: "0 14px 0 42px",
      fontSize: 14,
      boxSizing: "border-box" as const,
      background: TOKENS.bg,
      color: TOKENS.text,
      outline: "none",
    },
    galleryGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
      gap: 32,
    },
    artworkButton: {
      border: "none",
      background: "transparent",
      padding: 0,
      cursor: "pointer",
      textAlign: "left" as const,
      color: TOKENS.text,
    },
    artworkImageWrap: {
      background: TOKENS.panel,
      borderRadius: 28,
      overflow: "hidden",
    },
    artworkMeta: {
      marginTop: 12,
      display: "flex",
      justifyContent: "space-between",
      gap: 10,
      alignItems: "flex-start",
    },
    artworkTitle: {
      margin: 0,
      fontSize: 15,
      fontWeight: 500,
    },
    artworkArtist: {
      margin: "6px 0 0",
      fontSize: 14,
      color: TOKENS.textSoft,
    },
    detailCard: {
      border: `1px solid ${TOKENS.border}`,
      borderRadius: 36,
      padding: 18,
    },
    detailGrid: {
      display: "grid",
      gridTemplateColumns: "1.2fr 0.8fr",
      gap: 38,
      alignItems: "center",
    },
    detailImageWrap: {
      background: TOKENS.panel,
      borderRadius: 28,
      overflow: "hidden",
    },
    detailTitle: {
      margin: "14px 0 0",
      fontSize: 42,
      lineHeight: 1.08,
      fontWeight: 500,
    },
    detailTable: {
      marginTop: 24,
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: "18px 24px",
    },
    label: {
      fontSize: 14,
      color: TOKENS.textMuted,
      marginBottom: 6,
    },
    value: {
      fontSize: 16,
      fontWeight: 500,
    },
    narrative: {
      maxWidth: 860,
      paddingLeft: "28px",
      paddingRight: "28px",
    },
    footer: {
      borderTop: `1px solid ${TOKENS.border}`,
      padding: "40px 0 48px",
    },
    footerRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 16,
      flexWrap: "wrap" as const,
    },
    textArea: {
      width: "100%",
      minHeight: 140,
      borderRadius: 20,
      border: `1px solid ${TOKENS.border}`,
      padding: "14px 14px 14px 42px",
      fontSize: 14,
      fontFamily: "inherit",
      boxSizing: "border-box" as const,
      resize: "vertical" as const,
      outline: "none",
    },
    modalTitle: {
      margin: 0,
      fontSize: 30,
      fontWeight: 500,
    },
    modalText: {
      marginTop: 10,
      color: TOKENS.textSoft,
      fontSize: 14,
      lineHeight: 1.8,
    },
  };

  const mobile = viewportWidth !== null && viewportWidth < 768;
  const tablet = viewportWidth !== null && viewportWidth >= 768 && viewportWidth < 1200;
  const wide = viewportWidth !== null && viewportWidth > 1440;

  const responsive = {
    hero: mobile
      ? {
          ...styles.hero,
          gridTemplateColumns: "1fr",
          gap: 24,
          minHeight: "auto",
          padding: "20px 28px 0",
        }
      : tablet
        ? { ...styles.hero, gridTemplateColumns: "1fr", gap: 36, minHeight: "auto" }
        : styles.hero,
    heroTitle: mobile
      ? { ...styles.heroTitle, fontSize: 38 }
      : tablet
        ? { ...styles.heroTitle, fontSize: 52 }
        : styles.heroTitle,
    sectionTitle: mobile
      ? { ...styles.sectionTitle, fontSize: 34 }
      : tablet
        ? { ...styles.sectionTitle, fontSize: 42 }
        : styles.sectionTitle,
    filters: mobile ? { ...styles.filters, gridTemplateColumns: "1fr" } : styles.filters,
    galleryGrid: mobile
      ? { ...styles.galleryGrid, gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }
      : tablet
        ? { ...styles.galleryGrid, gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }
        : wide
          ? { ...styles.galleryGrid, gridTemplateColumns: "repeat(5, minmax(0, 1fr))" }
          : styles.galleryGrid,
    detailGrid: mobile || tablet ? { ...styles.detailGrid, gridTemplateColumns: "1fr" } : styles.detailGrid,
    detailImage: mobile ? { aspectRatio: "4 / 5" } : { aspectRatio: "5 / 4" },
    detailTable: mobile ? { ...styles.detailTable, gridTemplateColumns: "1fr" } : styles.detailTable,
    footerRow: mobile ? { ...styles.footerRow, alignItems: "flex-start" } : styles.footerRow,
    formGrid: mobile
      ? { display: "grid", gridTemplateColumns: "1fr", gap: 12 }
      : { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 },
  };

  if (!artworks.length) {
    return (
      <div style={{ ...styles.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: 60 }}>
          <h1 style={{ fontSize: 32, fontWeight: 500, margin: 0 }}>Gallery coming soon</h1>
          <p style={{ ...styles.paragraph, margin: "16px auto 0" }}>Artworks are being added to the collection. Check back shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* TEST: Padding fix deployed at 04:32 UTC */}
      <header style={styles.header}>
        <div style={{ ...styles.shell, ...styles.headerRow }}>
          <a href="#top" style={styles.brand}>
            Private Collection
          </a>

          {!mobile && (
            <nav style={styles.navDesktop}>
              {[
                ["Collection", "collection"],
                ["Narrative", "narrative"],
                ["FAQ", "faq"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                <button key={id} style={styles.navLink} onClick={() => scrollToSection(id)}>
                  {label}
                </button>
              ))}
            </nav>
          )}

          {mobile && (
            <button
              style={styles.menuButton}
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>

        <AnimatePresence>
          {mobile && mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div style={{ ...styles.shell, ...styles.navMobile }}>
                {[
                  ["Collection", "collection"],
                  ["Narrative", "narrative"],
                  ["FAQ", "faq"],
                  ["Contact", "contact"],
                ].map(([label, id]) => (
                  <button
                    key={id}
                    style={{ ...styles.navLink, textAlign: "left" }}
                    onClick={() => scrollToSection(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="top">
        <section style={{ ...styles.shell, ...responsive.hero }}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div style={styles.heroImageWrap}>
              <img src={artworkImageUrl(selectedArtwork)} alt={selectedArtwork?.title || "Gallery artwork"} style={styles.image} loading="eager" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <div style={styles.overline}>Curated paintings</div>
            <h1 style={responsive.heroTitle}>A private collection shaped by restraint, texture, and quiet depth.</h1>
            <p style={styles.paragraph}>
              This collection presents paintings selected for their lasting visual presence and emotional clarity. Each work is shown with space to be considered slowly, as part of a coherent and personal curatorial vision.
            </p>
            <div style={styles.buttonRow}>
              <button style={styles.primaryButton} onClick={() => scrollToSection("collection")}>View collection</button>
              <button style={styles.secondaryButton} onClick={() => scrollToSection("narrative")}>Read narrative</button>
            </div>
          </motion.div>
        </section>

        <section id="collection" style={{ ...styles.shell, ...styles.section }}>
          <div style={styles.textContainer}>
            <div style={styles.sectionHeader}>
              <div>
                <div style={styles.overline}>Gallery view</div>
                <h2 style={responsive.sectionTitle}>The collection</h2>
              </div>

            <div style={responsive.filters}>
              <Field icon={<Filter size={16} />}>
                <select
                  value={filters.style}
                  onChange={(e) => setFilters((prev) => ({ ...prev, style: e.target.value }))}
                  style={styles.input}
                >
                  {styleOptions.map((option) => (
                    <option key={option} value={option}>Style: {option}</option>
                  ))}
                </select>
              </Field>

              <Field icon={<Filter size={16} />}>
                <select
                  value={filters.artist}
                  onChange={(e) => setFilters((prev) => ({ ...prev, artist: e.target.value }))}
                  style={styles.input}
                >
                  {artistOptions.map((option) => (
                    <option key={option} value={option}>Artist: {option}</option>
                  ))}
                </select>
              </Field>

              <Field icon={<Search size={16} />}>
                <input
                  value={filters.title}
                  onChange={(e) => setFilters((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Search by title"
                  style={styles.input}
                />
              </Field>
            </div>
          </div>

          <div style={responsive.galleryGrid}>
            {filteredArtworks.map((art) => (
              <motion.button
                key={art._id}
                whileHover={{ y: -4 }}
                style={styles.artworkButton}
                onClick={() => setSelectedArtwork(art)}
              >
                <div style={styles.artworkImageWrap}>
                  <motion.img
                    src={artworkImageUrl(art)}
                    alt={art.title}
                    loading="lazy"
                    style={{ ...styles.image, aspectRatio: "4 / 5" }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div style={styles.artworkMeta}>
                  <div>
                    <p style={styles.artworkTitle}>{art.title}</p>
                    <p style={styles.artworkArtist}>{art.artist}</p>
                  </div>
                  <ArrowRight size={16} style={{ color: TOKENS.textMuted, flexShrink: 0, marginTop: 2 }} />
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {selectedArtwork && (
          <section style={{ ...styles.shell, paddingBottom: 18 }}>
            <div style={styles.detailCard}>
              <div style={responsive.detailGrid}>
                <div style={styles.detailImageWrap}>
                  <img
                    src={artworkImageUrl(selectedArtwork)}
                    alt={selectedArtwork.title}
                    style={{ ...styles.image, ...responsive.detailImage }}
                  />
                </div>

                <div>
                  <div style={styles.overline}>Artwork detail</div>
                  <h3 style={styles.detailTitle}>{selectedArtwork.title}</h3>
                  <p style={{ ...styles.paragraph, marginTop: 16, fontSize: 16 }}>{selectedArtwork.description}</p>

                  <div style={responsive.detailTable}>
                    <div>
                      <div style={styles.label}>Artist</div>
                      <div style={styles.value}>{selectedArtwork.artist}</div>
                    </div>
                    <div>
                      <div style={styles.label}>Year</div>
                      <div style={styles.value}>{selectedArtwork.year}</div>
                    </div>
                    <div>
                      <div style={styles.label}>Genre</div>
                      <div style={styles.value}>{selectedArtwork.genre}</div>
                    </div>
                    <div>
                      <div style={styles.label}>Material</div>
                      <div style={styles.value}>{selectedArtwork.material}</div>
                    </div>
                  </div>

                  <div style={{ marginTop: 24 }}>
                    <Badge value={selectedArtwork.availability} />
                  </div>

                  <div style={styles.buttonRow}>
                    <button style={styles.primaryButton} onClick={() => openInquiry(selectedArtwork)}>Acquire painting</button>
                    <button style={styles.secondaryButton} onClick={() => scrollToSection("faq")}>Learn process</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section id="narrative" style={{ ...styles.shell, ...styles.section }}>
          <div style={styles.textContainer}>
            <div style={styles.narrative}>
              <div style={styles.overline}>Collection narrative</div>
              <h2 style={responsive.sectionTitle}>On collecting with patience and clarity</h2>
            <p style={styles.paragraph}>
              This collection is guided by a preference for paintings that remain visually compelling over time—works that reveal more through repeated viewing rather than immediate spectacle. The collector is drawn to restraint, material sensitivity, and a sense of calm that deepens with attention.
            </p>
            <p style={styles.paragraph}>
              Acquisition begins with inquiry. Once interest is registered, the collection team shares details on availability, price, provenance, and viewing options where applicable. Conversations are handled privately and thoughtfully, allowing each painting to be placed with care.
            </p>
            <p style={styles.paragraph}>
              The site is designed as a quiet digital gallery: minimal, spacious, and centered on the artwork itself. It invites visitors first to look, then to understand, and only afterward to begin the process of acquisition.
            </p>
            </div>
          </div>
        </section>

        <section id="faq" style={{ ...styles.shell, ...styles.section, maxWidth: 920 }}>
          <div style={styles.textContainer}>
            <div style={styles.overline}>FAQ</div>
            <h2 style={responsive.sectionTitle}>General inquiries</h2>
            <div style={{ marginTop: 24, borderBottom: `1px solid ${TOKENS.border}` }}>
            {faqs.map((item, index) => (
              <FaqItem
                key={item.q}
                item={item}
                open={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
              />
            ))}
            </div>
          </div>
        </section>

        <footer id="contact" style={styles.footer}>
          <div style={{ ...styles.shell, ...responsive.footerRow }}>
            <div>
              <div style={{ ...styles.overline, marginBottom: 8 }}>Private Collection</div>
              <div style={{ color: TOKENS.textSoft, fontSize: 14, lineHeight: 1.8, maxWidth: 620 }}>
                For inquiries, viewings, and acquisition details, please select a painting and submit an inquiry through the site.
              </div>
            </div>
            <button style={styles.primaryButton} onClick={() => openInquiry(selectedArtwork)}>Inquire about selected work</button>
          </div>
        </footer>
      </main>

      <Modal open={inquiryOpen} onClose={() => setInquiryOpen(false)} maxWidth={640}>
        <h3 style={styles.modalTitle}>Acquire painting</h3>
        <p style={styles.modalText}>
          Share your details and the collection staff will contact you directly via WhatsApp or email to arrange the next step.
        </p>

        <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
          <div style={responsive.formGrid}>
            <Field icon={<User size={16} />}>
              <input
                required
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                style={styles.input}
              />
            </Field>

            <Field icon={<Mail size={16} />}>
              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                style={styles.input}
              />
            </Field>
          </div>

          <div style={{ marginTop: 12 }}>
            <Field icon={<Phone size={16} />}>
              <input
                required
                placeholder="Phone / WhatsApp"
                value={form.phone}
                onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                style={styles.input}
              />
            </Field>
          </div>

          <div style={{ marginTop: 12 }}>
            <Field icon={<MessageSquare size={16} />}>
              <textarea
                required
                placeholder="Message"
                value={form.message}
                onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                style={styles.textArea}
              />
            </Field>
          </div>

          <div style={styles.buttonRow}>
            <button type="submit" style={styles.primaryButton}>Send inquiry</button>
            <button type="button" style={styles.secondaryButton} onClick={() => setInquiryOpen(false)}>Cancel</button>
          </div>
        </form>
      </Modal>

      <Modal open={confirmationOpen} onClose={() => setConfirmationOpen(false)} maxWidth={440}>
        <h3 style={styles.modalTitle}>Inquiry received</h3>
        <p style={styles.modalText}>Thank you for your interest. A staff member from the collection will be in touch within 24 hours.</p>
        <div style={{ marginTop: 20 }}>
          <button style={styles.primaryButton} onClick={() => setConfirmationOpen(false)}>Close</button>
        </div>
      </Modal>
    </div>
  );
}
