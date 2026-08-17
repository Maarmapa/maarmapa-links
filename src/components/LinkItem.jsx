export default function LinkItem({ link }) {
  return (
    <a
      className="link-btn d-flex align-items-center justify-content-between gap-3"
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="d-flex align-items-center gap-3 min-w-0">
        <span className="icon-wrap flex-shrink-0" aria-hidden="true">
          <i className={`bi bi-${link.icon}`} />
        </span>
        <span className="min-w-0">
          <span className="d-block label">{link.label}</span>
          <span className="d-block hint">{link.hint}</span>
        </span>
      </span>
      <i className="bi bi-arrow-up-right flex-shrink-0 arrow" aria-hidden="true" />
    </a>
  );
}
