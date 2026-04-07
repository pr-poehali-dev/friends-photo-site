import { useState } from "react";
import Icon from "@/components/ui/icon";

const PHOTOS = [
  {
    id: 1,
    src: "https://cdn.poehali.dev/projects/a4647e1c-5156-4385-8d62-f8b398f415c8/files/a86e2143-0984-426f-8524-42e48cbb89d4.jpg",
    author: "Михаил Ч.",
    title: "Мокрый асфальт",
    tags: ["урбан", "ч/б"],
    reactions: { "🔥": 24, "❤️": 18, "😮": 7 },
    comments: [
      { id: 1, author: "Арина К.", text: "Этот снимок прямо в сердце", time: "2ч назад" },
      { id: 2, author: "Денис О.", text: "Потрясающий контраст!", time: "5ч назад" },
    ],
  },
  {
    id: 2,
    src: "https://cdn.poehali.dev/projects/a4647e1c-5156-4385-8d62-f8b398f415c8/files/98b33914-6b3d-467d-83b6-b0a0f3f6edb9.jpg",
    author: "Лена В.",
    title: "Неоновые стены",
    tags: ["граффити", "цвет"],
    reactions: { "🔥": 41, "❤️": 33, "😮": 15 },
    comments: [
      { id: 1, author: "Паша Г.", text: "Где это вообще?!", time: "1ч назад" },
    ],
  },
  {
    id: 3,
    src: "https://cdn.poehali.dev/projects/a4647e1c-5156-4385-8d62-f8b398f415c8/files/6e3d8380-d9b6-406a-a661-6dbf872c4865.jpg",
    author: "Соня Р.",
    title: "Двойная экспозиция",
    tags: ["портрет", "эксперимент"],
    reactions: { "🔥": 56, "❤️": 72, "😮": 28 },
    comments: [
      { id: 1, author: "Рома Н.", text: "Это шедевр, без слов", time: "30мин назад" },
      { id: 2, author: "Вика Д.", text: "Такое вижу впервые", time: "1ч назад" },
      { id: 3, author: "Игорь С.", text: "Как ты это сделала?", time: "3ч назад" },
    ],
  },
  {
    id: 4,
    src: "https://cdn.poehali.dev/projects/a4647e1c-5156-4385-8d62-f8b398f415c8/files/107ebf00-43c3-4071-b89f-6d8ba9d58e8e.jpg",
    author: "Антон М.",
    title: "Металл и ржавчина",
    tags: ["макро", "текстура"],
    reactions: { "🔥": 19, "❤️": 12, "😮": 31 },
    comments: [],
  },
  {
    id: 5,
    src: "https://cdn.poehali.dev/projects/a4647e1c-5156-4385-8d62-f8b398f415c8/files/0fcb236d-cb94-4cf9-956d-1c3a123f0ca8.jpg",
    author: "Катя Б.",
    title: "Ночные трассы",
    tags: ["ночь", "выдержка"],
    reactions: { "🔥": 88, "❤️": 64, "😮": 42 },
    comments: [
      { id: 1, author: "Стас П.", text: "Это уже живопись, не фото", time: "15мин назад" },
      { id: 2, author: "Женя К.", text: "Сколько выдержка?", time: "45мин назад" },
    ],
  },
  {
    id: 6,
    src: "https://cdn.poehali.dev/projects/a4647e1c-5156-4385-8d62-f8b398f415c8/files/d0663f88-e333-4e96-a3e0-eeee21e84dd1.jpg",
    author: "Дима Т.",
    title: "Геометрия Баухауса",
    tags: ["абстракция", "форма"],
    reactions: { "🔥": 33, "❤️": 27, "😮": 9 },
    comments: [
      { id: 1, author: "Оля М.", text: "Такая чёткость!", time: "2ч назад" },
    ],
  },
];

type Photo = typeof PHOTOS[0];

function PhotoModal({ photo, onClose }: { photo: Photo; onClose: () => void }) {
  const [reactions, setReactions] = useState({ ...photo.reactions });
  const [activeReactions, setActiveReactions] = useState<Set<string>>(new Set());
  const [comments, setComments] = useState(photo.comments);
  const [commentText, setCommentText] = useState("");
  const [commentName, setCommentName] = useState("");

  const handleReaction = (emoji: string) => {
    const newActive = new Set(activeReactions);
    if (newActive.has(emoji)) {
      newActive.delete(emoji);
      setReactions(prev => ({ ...prev, [emoji]: (prev as Record<string, number>)[emoji] - 1 }));
    } else {
      newActive.add(emoji);
      setReactions(prev => ({ ...prev, [emoji]: (prev as Record<string, number>)[emoji] + 1 }));
    }
    setActiveReactions(newActive);
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    const name = commentName.trim() || "Аноним";
    setComments(prev => [
      { id: Date.now(), author: name, text: commentText, time: "только что" },
      ...prev,
    ]);
    setCommentText("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,9,6,0.95)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-5xl flex flex-col md:flex-row"
        style={{ maxHeight: "90vh", background: "#111009", border: "1px solid #222" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center"
          style={{ background: "var(--neon)", color: "var(--dark)" }}
        >
          <Icon name="X" size={16} />
        </button>

        <div className="flex-1 relative overflow-hidden" style={{ minHeight: "300px", maxHeight: "90vh" }}>
          <img
            src={photo.src}
            alt={photo.title}
            className="w-full h-full object-cover"
            style={{ maxHeight: "90vh" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 p-4"
            style={{ background: "linear-gradient(transparent, rgba(10,9,6,0.9))" }}
          >
            <div className="flex gap-2 mb-2 flex-wrap">
              {photo.tags.map((tag) => (
                <span key={tag} className="font-mono text-xs px-2 py-0.5" style={{ background: "var(--neon)", color: "var(--dark)" }}>
                  #{tag}
                </span>
              ))}
            </div>
            <p className="font-display text-2xl" style={{ color: "var(--warm)" }}>{photo.title}</p>
            <p className="font-mono text-xs" style={{ color: "#888" }}>— {photo.author}</p>
          </div>
        </div>

        <div className="w-full md:w-72 flex flex-col" style={{ borderLeft: "1px solid #222" }}>
          <div className="p-4" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <p className="font-mono text-xs mb-3" style={{ color: "#666" }}>РЕАКЦИИ</p>
            <div className="flex gap-3">
              {Object.entries(reactions).map(([emoji, count]) => (
                <button
                  key={emoji}
                  onClick={() => handleReaction(emoji)}
                  className="reaction-btn flex flex-col items-center gap-1 px-3 py-2"
                  style={{
                    background: activeReactions.has(emoji) ? "rgba(200,245,53,0.15)" : "#1a1a17",
                    border: activeReactions.has(emoji) ? "1px solid var(--neon)" : "1px solid #333",
                  }}
                >
                  <span className="text-xl">{emoji}</span>
                  <span className="font-mono text-xs" style={{ color: activeReactions.has(emoji) ? "var(--neon)" : "#888" }}>
                    {count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4" style={{ borderBottom: "1px solid #1a1a1a", maxHeight: "280px" }}>
            <p className="font-mono text-xs mb-3" style={{ color: "#666" }}>КОММЕНТАРИИ ({comments.length})</p>
            {comments.length === 0 ? (
              <p className="font-serif italic text-lg" style={{ color: "#444" }}>Будь первым...</p>
            ) : (
              <div className="flex flex-col gap-4">
                {comments.map((c) => (
                  <div key={c.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs" style={{ color: "var(--neon)" }}>{c.author}</span>
                      <span className="font-mono text-xs" style={{ color: "#444" }}>{c.time}</span>
                    </div>
                    <p className="font-serif text-base leading-snug" style={{ color: "#ccc" }}>{c.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 flex flex-col gap-2">
            <input
              type="text"
              placeholder="Твоё имя"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              className="w-full px-3 py-2 font-mono text-xs outline-none"
              style={{ background: "#1a1a17", border: "1px solid #333", color: "#ccc" }}
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Написать комментарий..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleComment()}
                className="flex-1 px-3 py-2 font-mono text-xs outline-none"
                style={{ background: "#1a1a17", border: "1px solid #333", color: "#ccc" }}
              />
              <button
                onClick={handleComment}
                className="px-3 py-2 font-display text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ background: "var(--neon)", color: "var(--dark)" }}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryCard({ photo, onClick }: { photo: Photo; onClick: () => void }) {
  const totalReactions = Object.values(photo.reactions).reduce((a, b) => a + b, 0);

  return (
    <div
      className="photo-card cursor-pointer relative overflow-hidden group w-full h-full"
      onClick={onClick}
      style={{ border: "1px solid #1a1a1a" }}
    >
      <img
        src={photo.src}
        alt={photo.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div
        className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(transparent 20%, rgba(10,9,6,0.92))" }}
      >
        <div className="flex gap-1 mb-2 flex-wrap">
          {photo.tags.map((tag) => (
            <span key={tag} className="font-mono text-xs px-1.5 py-0.5" style={{ background: "var(--neon)", color: "var(--dark)" }}>
              #{tag}
            </span>
          ))}
        </div>
        <p className="font-display text-xl leading-tight" style={{ color: "var(--warm)" }}>{photo.title}</p>
        <p className="font-mono text-xs mt-1" style={{ color: "#888" }}>— {photo.author}</p>
        <div className="flex items-center gap-3 mt-3">
          <span className="font-mono text-xs" style={{ color: "var(--neon)" }}>{totalReactions} реакций</span>
          <span className="font-mono text-xs" style={{ color: "#666" }}>{photo.comments.length} коммент.</span>
        </div>
      </div>
      <div
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 flex items-center justify-center"
        style={{ background: "var(--neon)", color: "var(--dark)" }}
      >
        <Icon name="Expand" size={14} />
      </div>
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState<"home" | "gallery">("home");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [filter, setFilter] = useState<string>("все");

  const allTags = ["все", ...Array.from(new Set(PHOTOS.flatMap((p) => p.tags)))];
  const filteredPhotos = filter === "все" ? PHOTOS : PHOTOS.filter((p) => p.tags.includes(filter));

  const marqueeItems = ["KSS", "ФОТОГРАФИЯ", "ИСКУССТВО", "МОМЕНТ", "KSS", "ФОТОГРАФИЯ", "ИСКУССТВО", "МОМЕНТ"];

  return (
    <div className="min-h-screen noise-bg" style={{ background: "var(--dark)" }}>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(10,9,6,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1a1a1a" }}
      >
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl font-bold tracking-widest" style={{ color: "var(--warm)" }}>KSS</span>
          <span className="font-mono text-xs px-1.5 py-0.5" style={{ background: "var(--neon)", color: "var(--dark)" }}>β</span>
        </div>
        <div className="flex items-center gap-1">
          {(["home", "gallery"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className="font-display text-sm font-medium px-4 py-2 tracking-wider transition-all duration-200"
              style={{
                background: activeSection === s ? "var(--neon)" : "transparent",
                color: activeSection === s ? "var(--dark)" : "#888",
              }}
            >
              {s === "home" ? "ГЛАВНАЯ" : "ГАЛЕРЕЯ"}
            </button>
          ))}
        </div>
      </nav>

      {/* HOME */}
      {activeSection === "home" && (
        <div>
          {/* HERO */}
          <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
            <div className="diagonal-line" style={{ left: "20%", height: "100%", top: 0 }} />
            <div className="diagonal-line" style={{ left: "70%", height: "80%", top: "10%" }} />
            <div className="diagonal-line" style={{ right: "10%", height: "60%", top: "20%" }} />

            <div className="absolute inset-0 z-0">
              <img
                src={PHOTOS[2].src}
                alt="hero"
                className="w-full h-full object-cover"
                style={{ opacity: 0.25, filter: "saturate(0.3)" }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(10,9,6,0.98) 40%, rgba(10,9,6,0.6) 100%)" }}
              />
            </div>

            <div className="relative z-10 px-6 md:px-16 max-w-6xl">
              <p className="font-mono text-xs tracking-[0.4em] mb-6 fade-in-up stagger-1" style={{ color: "var(--neon)" }}>
                / ФОТОГРАФИЧЕСКОЕ СООБЩЕСТВО
              </p>

              <h1
                className="font-display font-bold leading-none mb-2 glitch-text fade-in-up stagger-2"
                data-text="KSS"
                style={{ fontSize: "clamp(80px, 18vw, 240px)", color: "var(--warm)", letterSpacing: "-0.02em" }}
              >
                KSS
              </h1>

              <div className="fade-in-up stagger-3 flex items-start gap-6">
                <div style={{ width: "3px", height: "80px", background: "var(--neon)", flexShrink: 0, marginTop: "4px" }} />
                <p className="font-serif text-2xl md:text-3xl leading-relaxed" style={{ color: "#b0a898", maxWidth: "500px" }}>
                  Место, где каждый снимок — наша история. <em>История нашей семьи.</em>
                </p>
              </div>

              <div className="fade-in-up stagger-4 flex items-center gap-4 mt-12 flex-wrap">
                <button
                  onClick={() => setActiveSection("gallery")}
                  className="font-display font-semibold text-lg px-8 py-4 tracking-widest transition-all duration-300 hover:opacity-90"
                  style={{ background: "var(--neon)", color: "var(--dark)" }}
                >
                  СМОТРЕТЬ ГАЛЕРЕЮ
                </button>
                <button
                  className="font-display text-lg px-8 py-4 tracking-widest transition-all duration-300 hover:opacity-70"
                  style={{ color: "#666", border: "1px solid #333" }}
                >
                  ЗАГРУЗИТЬ ФОТО
                </button>
              </div>

              <div className="fade-in-up stagger-5 flex items-center gap-8 mt-16 flex-wrap">
                {[
                  { num: `${PHOTOS.length}`, label: "РАБОТ" },
                  { num: "48", label: "АВТОРОВ" },
                  { num: "312", label: "РЕАКЦИЙ" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-4xl font-bold" style={{ color: "var(--neon)" }}>{stat.num}</p>
                    <p className="font-mono text-xs tracking-widest mt-1" style={{ color: "#555" }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center scroll-indicator">
              <Icon name="ChevronDown" size={20} style={{ color: "#444" }} />
            </div>
          </section>

          {/* MARQUEE */}
          <div className="overflow-hidden py-4" style={{ background: "var(--neon)" }}>
            <div className="marquee-track">
              {[...marqueeItems, ...marqueeItems].map((t, i) => (
                <span key={i} className="font-display font-bold text-lg tracking-widest whitespace-nowrap" style={{ color: "var(--dark)" }}>
                  {t} —
                </span>
              ))}
            </div>
          </div>

          {/* FEATURED */}
          <section className="px-6 md:px-16 py-20 max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <p className="font-mono text-xs tracking-[0.3em] mb-2" style={{ color: "var(--neon)" }}>— ИЗБРАННОЕ</p>
                <h2 className="font-display text-5xl md:text-7xl font-bold" style={{ color: "var(--warm)" }}>ЛУЧШЕЕ</h2>
              </div>
              <button
                onClick={() => setActiveSection("gallery")}
                className="font-mono text-xs tracking-widest pb-1 hover:opacity-70 transition-opacity"
                style={{ color: "#666", borderBottom: "1px solid #444" }}
              >
                ВСЯ ГАЛЕРЕЯ →
              </button>
            </div>

            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 md:col-span-7" style={{ height: "500px" }}>
                <GalleryCard photo={PHOTOS[2]} onClick={() => setSelectedPhoto(PHOTOS[2])} />
              </div>
              <div className="col-span-6 md:col-span-5" style={{ height: "240px" }}>
                <GalleryCard photo={PHOTOS[4]} onClick={() => setSelectedPhoto(PHOTOS[4])} />
              </div>
              <div className="col-span-6 md:col-span-5" style={{ height: "240px" }}>
                <GalleryCard photo={PHOTOS[1]} onClick={() => setSelectedPhoto(PHOTOS[1])} />
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="px-6 md:px-16 py-24 relative overflow-hidden" style={{ background: "#0d0c0a" }}>
            <div className="diagonal-line" style={{ right: "15%", height: "100%", top: 0 }} />
            <div className="max-w-3xl">
              <p className="font-mono text-xs tracking-[0.3em] mb-4" style={{ color: "var(--neon)" }}>— ПРИСОЕДИНЯЙСЯ</p>
              <h2 className="font-display text-5xl md:text-7xl font-bold leading-none mb-8" style={{ color: "var(--warm)" }}>
                ТВОЙ KSS<br />
                <span className="font-serif italic font-light" style={{ color: "#666" }}>ждёт своих зрителей</span>
              </h2>
              <p className="font-serif text-xl mb-10" style={{ color: "#888", maxWidth: "480px" }}>
                Загружай фотографии, собирай реакции и общайся с теми, кто видит мир так же остро.
              </p>
              <button
                onClick={() => setActiveSection("gallery")}
                className="font-display font-semibold text-xl px-10 py-5 tracking-widest hover:opacity-90 transition-opacity"
                style={{ background: "var(--neon)", color: "var(--dark)" }}
              >
                НАЧАТЬ СЕЙЧАС
              </button>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="px-6 md:px-16 py-8 flex items-center justify-between flex-wrap gap-4" style={{ borderTop: "1px solid #1a1a1a" }}>
            <span className="font-display text-xl font-bold" style={{ color: "var(--warm)" }}>KSS</span>
            <span className="font-mono text-xs" style={{ color: "#444" }}>2026 — Фотографическое сообщество</span>
          </footer>
        </div>
      )}

      {/* GALLERY */}
      {activeSection === "gallery" && (
        <div className="pt-20 px-6 md:px-16 py-12 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] mb-2" style={{ color: "var(--neon)" }}>— КОЛЛЕКЦИЯ</p>
              <h1 className="font-display text-5xl md:text-7xl font-bold" style={{ color: "var(--warm)" }}>ГАЛЕРЕЯ</h1>
            </div>
            <p className="font-mono text-xs" style={{ color: "#555" }}>{filteredPhotos.length} работ</p>
          </div>

          <div className="flex gap-2 mb-10 flex-wrap">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className="font-mono text-xs px-4 py-2 tracking-wider transition-all duration-200"
                style={{
                  background: filter === tag ? "var(--neon)" : "#1a1a17",
                  color: filter === tag ? "var(--dark)" : "#666",
                  border: filter === tag ? "none" : "1px solid #2a2a27",
                }}
              >
                {tag === "все" ? "ВСЕ" : `#${tag}`}
              </button>
            ))}
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
            {filteredPhotos.map((photo, i) => {
              const heights = ["280px", "380px", "320px", "260px", "420px", "300px"];
              const h = heights[i % heights.length];
              return (
                <div
                  key={photo.id}
                  className="break-inside-avoid fade-in-up"
                  style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
                >
                  <div style={{ height: h }}>
                    <GalleryCard photo={photo} onClick={() => setSelectedPhoto(photo)} />
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPhotos.length === 0 && (
            <div className="text-center py-24">
              <p className="font-serif italic text-3xl" style={{ color: "#444" }}>Пусто...</p>
            </div>
          )}

          <div className="mt-16 text-center">
            <button
              className="font-display text-sm font-semibold px-8 py-4 tracking-widest hover:opacity-80 transition-opacity"
              style={{ border: "1px solid #333", color: "#666" }}
            >
              ЗАГРУЗИТЬ СВОЮ РАБОТУ
            </button>
          </div>
        </div>
      )}

      {selectedPhoto && <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />}
    </div>
  );
}