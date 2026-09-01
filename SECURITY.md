# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.2.3   | :white_check_mark: |
| 2.2.2   | :white_check_mark: |
| < 2.2.0 | :x:                |

---

## 🛡️ Security Architecture & Protections (2026/2027 Standards)

The VEFA Platform implements multi-layered security protections:
1. **SSRF Filtering in Scrapers (`api/scrape.php`)**:
   Blocks requests resolving to private, reserved, or cloud metadata subnets (`127.0.0.0/8`, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `169.254.169.254`).
2. **Strict MIME Whitelisting (`api/proxy.php`)**:
   Only allows verified image MIME types (`image/jpeg`, `image/png`, `image/webp`, `image/gif`, `image/svg+xml`).
3. **Dynamic Output Sanitization**:
   All user-supplied content is processed through `escapeHTML()` before dynamic DOM insertion.

---

## 📬 Reporting a Vulnerability

If you discover a potential security issue or vulnerability, please send details to:
📧 **`admin@vefa.club`**

Please do not open public GitHub issues for security vulnerabilities until a patch has been coordinated.
