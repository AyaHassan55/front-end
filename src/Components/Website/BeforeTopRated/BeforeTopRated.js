


import React from "react";
import "./Before.css";
export default function FlashSaleDivider({
  heading = "BEST PRICES",
  subtitle = "Best Prices, Best Picks",
  promoLabel = "Limited time",
  promoText = "Up to 50% off selected items",
  promoCta = "Shop Now",
  onCtaClick = () => {},
  colors = { from: "#65acc2ff", to: "#ffeef0" },
}) {
  return (
    <section className="fsd-root" aria-label="Flash sale banner divider">
      <div
        className="fsd-top"
        style={{
          background: `linear-gradient(180deg, ${colors.from} 0%, ${colors.to} 70%)`,
        }}
      >
        <div className="fsd-inner">
          <h1 className="fsd-heading">{heading}</h1>
          <p className="fsd-sub">{subtitle}</p>
        </div>
      </div>

      {/* SVG wave */}
      <div className="fsd-wave" aria-hidden="true">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C300,80 900,0 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

      {/* Promo card overlapping the wave */}
      <div className="fsd-promo-wrap">
        <div className="fsd-promo-card" role="region" aria-label="Promo">
          <span className="fsd-promo-badge">{promoLabel}</span>
          <div className="fsd-promo-body">
            <p className="fsd-promo-text">{promoText}</p>
            <button
              className="fsd-btn"
              onClick={onCtaClick}
              aria-label={promoCta}
            >
              {promoCta}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom title
      <div className="fsd-bottom">
        <div className="fsd-latest">
          <span className="fsd-line" aria-hidden="true"></span>
          <h2 className="fsd-latest-title">LATEST PRODUCTS</h2>
          <span className="fsd-line" aria-hidden="true"></span>
        </div>
      </div> */}
    </section>
  );
}
