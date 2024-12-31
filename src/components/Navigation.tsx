import { Link } from 'react-router-dom';
import { routes } from '../routes';
import * as styles from './Navigation.module.css';

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {routes().map(({ path, label }) => (
          <li key={path}>
            <a className={styles.link} href={path}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
