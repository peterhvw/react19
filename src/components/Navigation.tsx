import { Link } from 'react-router-dom';
import { routes } from '../routes';

export const Navigation = () => {
  return (
    <nav>
      <ul>
        {routes().map(({ path, label }) => (
          // <Link key={path} to={path}>{label}</Link>
          <a key={path} href={path}>{label}</a>
        ))}
      </ul>
    </nav>
  );
};
