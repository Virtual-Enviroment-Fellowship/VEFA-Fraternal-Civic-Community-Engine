# Contributing to VEFA: Fraternal & Civic Community Engine

Thank you for your interest in contributing to the **VEFA Platform**! We welcome contributions from developers, fraternal brothers & sisters, and civic volunteers across America.

---

## 🌟 Code of Conduct & Open-Source Principles
1. **100% White-Label Standard**: Do not hardcode specific lodge numbers (e.g. `#1706`) or specific towns in core templates. Use `config.js` or `setup.html` variables.
2. **2026/2027 Security First**: All network scrapers and proxies must enforce SSRF protection (`FILTER_FLAG_NO_PRIV_RANGE`), MIME-type validation, and XSS sanitization (`escapeHTML()`).
3. **Senior & Elderly Accessibility**: Preserve large touch targets (min 48px), high-contrast readability, and accessibility tags across all UI components.

---

## 🚀 Development Workflow

1. **Fork & Clone** the repository:
   ```bash
   git clone https://github.com/your-username/vefa-community-engine.git
   cd vefa-community-engine
   ```

2. **Run Tests Locally**:
   ```bash
   node test.js
   ```
   Ensure all test assertions pass (100% pass rate required).

3. **Start Local Server**:
   ```bash
   # Via PHP Built-in Server
   php -S localhost:8000

   # Or via Docker Compose
   docker compose up -d
   ```

4. **Submit a Pull Request** with clear description of your improvements.

---
© 2027 VEFA: Fraternal & Civic Community Engine.  
Contact: `admin@vefa.club`
