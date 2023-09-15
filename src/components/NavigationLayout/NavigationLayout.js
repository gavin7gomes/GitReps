import React, { useState } from 'react';
import NavigationMenu from './NavigationMenu';
import styles from './NavigationLayout.module.css';
import HamburgerIcon from '../Hamburger/Hamburger';
import SearchBar from '../SearchBar/SearchBar';
import UserAvatar from '../UserAvatar/UserAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { resetAuthData } from '../../store/actions/authActions';

function NavigationLayout({ children, onSearchQueryChange, searchParams, onSearch, onFocus }) {
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);
  const { avatar, userName, loginName, accessToken, email, bio, company } =
    useSelector(({ auth }) => ({
      avatar: auth.avatar,
      userName: auth.userName,
      loginName: auth.loginName,
      accessToken: auth.accessToken,
      email: auth.email,
      bio: auth.bio,
      company: auth.company
    }));

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const logoutUser = () => {
    localStorage.removeItem('githubAccessToken');
    window.location.href = `https://github.com/logout?return_to=${encodeURIComponent("http://localhost:3000/")}`;
    dispatch(resetAuthData());
  }

  return (
    <div className={styles['navigation-layout']}>
      <div className={styles['toggle-menu-button']} onClick={toggleMenu}>
        <HamburgerIcon isOpen={menuVisible} />
        {accessToken && <UserAvatar profilePhotoUrl={avatar} name={userName || loginName} width="24px" />}
      </div>
      {menuVisible && <NavigationMenu user={{userName, loginName, avatar, bio, company, email, accessToken }} onLogout={logoutUser} />}
      <div className={styles['navigation-content-wrapper']}>
        <SearchBar onSearchQueryChange={onSearchQueryChange} searchParams={searchParams} onSearch={onSearch} onFocus={onFocus} />
        <div className={styles['content']}>{children}</div>
      </div>
    </div>
  );
}

export default NavigationLayout;

