import LinkItem from './LinkItem';

export default function LinkList({ links }) {
  return (
    <nav aria-label="Enlaces de maarmapa">
      <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
        {links.map((link) => (
          <li key={link.id}>
            <LinkItem link={link} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
