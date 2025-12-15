import { useState, useEffect } from "react";

const quickSuggestions = [
  "5 hook lines for my skincare products reel",
  "Instagram caption with strong CTA for beauty brand",
  "Luxury skincare caption for premium audience",
  "Carousel content ideas for Instagram growth",
];

export default function CreateContent() {
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [style, setStyle] = useState("bold");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [variationIndex, setVariationIndex] = useState(0);
  const [history, setHistory] = useState([]);

  // Reset variations when style changes
  useEffect(() => {
    setVariationIndex(0);
  }, [style]);

  const mockGenerate = () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const outputs = {
        bold: [
          {
            hook: "Stop scrolling — this changes everything.",
            value:
              "This content is designed to grab attention instantly and keep your audience engaged without overthinking.",
            cta: "Save this post if you want better reach 🚀",
          },
          {
            hook: "Your audience is waiting for THIS.",
            value:
              "If you want content that converts, clarity beats trends every time.",
            cta: "Follow for more content tips 🔥",
          },
        ],
        casual: [
          {
            hook: "Okay but hear me out 👀",
            value:
              "Sometimes the best content is the one that feels real, simple, and human.",
            cta: "What do you think? 💬",
          },
          {
            hook: "Not gonna lie… this works.",
            value:
              "You don’t need viral tricks when your message connects.",
            cta: "Drop a ❤️ if you agree",
          },
        ],
        luxury: [
          {
            hook: "Refined. Intentional. Powerful.",
            value:
              "Crafted with precision for audiences who value elegance.",
            cta: "Experience premium content ✨",
          },
          {
            hook: "Luxury is in the details.",
            value:
              "Every word here is designed to elevate brand perception.",
            cta: "Discover the difference 🤍",
          },
        ],
      };

      const options = outputs[style] || [];
      const index = variationIndex % options.length;

      if (options.length > 0) {
        const generated = options[index];

        setResult(generated);
        setVariationIndex((prev) => prev + 1);

        // ✅ Auto-save to history
        setHistory((prev) => [
          {
            id: Date.now(),
            prompt,
            style,
            platform,
            output: generated,
          },
          ...prev,
        ]);
      }

      setLoading(false);
    }, 1500);
  };

  return (
    <div className="create-page">
      <div className="create-header">
        <h2>Create Content</h2>
        <p>Turn ideas into scroll-stopping posts</p>
      </div>

      <div className="create-grid">
        {/* LEFT */}
        <div className="create-input">
          {/* Quick suggestions */}
          <div className="quick-suggestions">
            {quickSuggestions.map((text, i) => (
              <button
                key={i}
                className="suggestion-pill"
                onClick={() => setPrompt(text)}
              >
                {text}
              </button>
            ))}
          </div>

          <label>Your prompt</label>
          <textarea
            placeholder="Choose a suggestion or write your own idea..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <label>Platform</label>
          <div className="platforms">
            {["instagram", "reel", "carousel"].map((p) => (
              <button
                key={p}
                className={platform === p ? "active" : ""}
                onClick={() => setPlatform(p)}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>

          <label>Style</label>
          <div className="styles">
            {["bold", "casual", "luxury"].map((s) => (
              <button
                key={s}
                className={style === s ? "active" : ""}
                onClick={() => setStyle(s)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>

          <button
            className="generate-btn"
            disabled={loading}
            onClick={mockGenerate}
          >
            {loading ? "Generating…" : "Generate Content"}
          </button>
        </div>

        {/* RIGHT */}
        <div className="preview-card">
          <p className="preview-label">Preview</p>

          <div className="preview-box">
            {loading && (
              <div className="thinking">
                ✨ Crafting hook... <br />
                ✨ Shaping message... <br />
                ✨ Adding CTA...
              </div>
            )}

            {!loading && result && (
              <>
                <p><strong>🔥 Hook</strong></p>
                <p>{result.hook}</p>

                <p><strong>✨ Value</strong></p>
                <p>{result.value}</p>

                <p><strong>👉 CTA</strong></p>
                <p>{result.cta}</p>

                <button
                  className="copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `${result.hook}\n\n${result.value}\n\n${result.cta}`
                    )
                  }
                >
                  Copy Content
                </button>

                <button
                  className="copy-btn"
                  style={{ marginLeft: "10px", background: "#111" }}
                  onClick={mockGenerate}
                >
                  Regenerate
                </button>
              </>
              
            )}
{history.length > 0 && (
  <div className="history-section">
    <h4>History</h4>

    <div className="history-list">
      {history.map((item) => (
        <button
          key={item.id}
          className="history-item"
          onClick={() => setResult(item.output)}
        >
          <span>{item.prompt.slice(0, 40)}...</span>
          <small>{item.style}</small>
        </button>
      ))}
    </div>
  </div>
)}

            {!loading && !result && (
              <p>Your generated content will appear here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
