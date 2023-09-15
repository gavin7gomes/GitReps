import React from 'react';
import style from './NavigationLayout.module.css';
import UserMenu from './UserMenu';
function NavigationMenu({user, onLogout}) {
  return (
    <nav className={style.navigationMenu}>
      {user.accessToken && <UserMenu user={user} onLogout={onLogout} />}
      <ul>
        <li><a href="#repositories" className={style.active}>Repositories</a></li>
        <li>
          <a className={style.disabledLink} href="#code">Code</a> 
          <span className={style.comingSoon}>Coming soon</span>
        </li>
        <li>
          <a className={style.disabledLink} href="#pr">Pull Requests</a>
          <span className={style.comingSoon}>Coming soon</span>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationMenu;

