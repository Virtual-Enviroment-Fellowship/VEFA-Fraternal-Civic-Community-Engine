# Security Policy

## Reporting Security Issues

Please report security issues or vulnerability reports directly to:
📧 **`admin@vefa.club`**

## Security Protections Implemented
- **SSRF Filtering**: Outbound scraper and proxy calls block private subnets via `FILTER_FLAG_NO_PRIV_RANGE`.
- **MIME Validation**: Proxy restricts image forwarding to verified MIME types.
- **XSS Sanitization**: Dynamic DOM output is sanitized via `escapeHTML()`.
