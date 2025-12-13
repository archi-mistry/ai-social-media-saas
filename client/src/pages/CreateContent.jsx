import { useState } from "react";
const quickSuggestions = [
  "5 hook lines for my skincare products reel",
  "Instagram caption with strong CTA for beauty brand",
  "Luxury skincare caption for premium audience",
  "Carousel content ideas for Instagram growth",
];

export default function CreateContent() {
  // ✅ ALL HOOKS LIVE INSIDE THE COMPONENT
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [style, setStyle] = useState("bold");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const mockGenerate = () => {
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const outputs = {
        bold: {
          hook: "Stop scrolling — this changes everything.",
          value:
            "This content is designed to grab attention instantly and keep your audience engaged without overthinking.",
          cta: "Save this post if you want better reach 🚀",
        },
        casual: {
          hook: "Okay but hear me out 👀",
          value:
            "Sometimes the best content is the one that feels real, simple, and human. This does exactly that.",
          cta: "Let me know what you think 💬",
        },
        luxury: {
          hook: "Refined. Intentional. Powerful.",
          value:
            "Crafted with precision, this content speaks to audiences who value quality, clarity, and elegance.",
          cta: "Experience content that feels premium ✨",
        },
      };

      setResult(outputs[style]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="create-page">
      {/* Header */}
      <div className="create-header">
        <h2>Create Content</h2>
        <p>Choose a template or write your own idea</p>
      </div>
{/* Quick suggestions */}
<div className="quick-suggestions">
  {quickSuggestions.map((text, index) => (
    <button
      key={index}
      onClick={() => setPrompt(text)}
      className="suggestion-pill"
    >
      {text}
    </button>
  ))}
</div>

      {/* Input + Preview */}
      <div className="create-grid">
        {/* LEFT */}
        <div className="create-input">
          <label>Your prompt</label>
          <textarea
            placeholder="Choose a template or write your own idea..."
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
              </>
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
