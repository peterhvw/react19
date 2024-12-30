import { Link } from 'react-router-dom';
import { routes } from '../routes';

export const Navigation = () => {
  return (
    <nav>
      <ul>
        {routes.map(route => (
          <Link key={route.path} to={route.path}>
            {route.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
}; 