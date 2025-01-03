import "./styles.css"

export default function Hero() {
  return (
    <div id="hero">
      <div id="hero-container">
        <div id="hero-text">
          <div id="titles">
            <h2>Where Timeless Design Meets Modern Innovation</h2>
            <h3>Discover the Future of Elegance</h3>
          </div>
          <p id="hero-description">
            Step inside a world where style meets innovation. Explore the
            Burberry Regent Street experience.
          </p>
        </div>

        <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
          <iframe
            src="https://player.vimeo.com/video/63484721?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              borderRadius: ".7rem",
            }}
            title="Burberry Regent Street Store Interior Tour"
          ></iframe>
        </div>
      </div>
    </div>
  )
}
