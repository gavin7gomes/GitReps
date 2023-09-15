import React, { useEffect, useState } from 'react'
import NavigationLayout from '../../components/NavigationLayout/NavigationLayout'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPublicRepos } from '../../store/actions/repoActions';
import RepositoryCard from '../../components/RepoCard/RepoCard';
import withPagination from '../../components/PaginationHOC/withPagination';
import style from "./Repo.module.css"
import { ReactComponent as EmptyState } from '../../assets/icons/empty.svg';
import { ReactComponent as SadState } from '../../assets/icons/sad.svg';
import LoaderWrapper from '../../components/LoaderWrapper/LoaderWrapper';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchGithubAccessToken } from '../../store/actions/authActions';
import GitHubLoginModal from '../../components/Popups/GithubLoginModal/GithubLoginModal';

const emptyStateText = {
  1: "Search for any github public repository",
  2: "Your search did not match any repositories"
}

const RepositoriesPage = (props) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [emptyStateMsg, setEmptyStateMsg] = useState(1);
  const [sortOption, setSortOption] = useState("stars");
  const [order, setOrder] = useState("desc");
  const [githubLoginModalOpen, setGithubLoginModalOpen] = useState(false);

  const dispatch = useDispatch();
  const repos = useSelector((state) => state.repo.publicRepos);
  const githubAccessToken = useSelector((state) => state.auth.accessToken);

  const searchPublicRepos = async ({query, sortBy, page, order}) => {
    if(!query.trim()) return window.alert("Please type in the search");
    setLoading(true);
    const res = await dispatch(fetchPublicRepos({query: query.trim(), sortBy, page, order}))
    setLoading(false);
    props.fetchItemsCount(res?.total_count, onPageChangeCallback)
    if(!res?.total_count) setEmptyStateMsg(2)
  }

  const onPageChangeCallback = (page) => {
    searchPublicRepos({query, sortBy: sortOption, page, order})
  }

  const onSearchQueryChange = (value, type) => {
    if(!type){
      setQuery(value)
      if(!query && emptyStateMsg === 2) setEmptyStateMsg(1)
    }else if(type === "sort"){
      setSortOption(value)
      if(query) searchPublicRepos({query, sortBy: value, page: props.currentPage, order: order})
    }else if(type === "order"){
      setOrder(value)
      if(query) searchPublicRepos({query, sortBy: sortOption, page: props.currentPage, order: value})
    }
  }

  const handleLogin = () => {
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const redirectUri = "https://gitreps.netlify.app/";
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
  };

  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");

    if (code && !githubAccessToken){
      async function fetchData() {
        await dispatch(fetchGithubAccessToken({code}))
        navigate("/");
      }
      fetchData();
    }
  }, [location, dispatch, githubAccessToken, navigate]);

  const onSearchInputFocus = () => {
    if(!githubAccessToken){
      setGithubLoginModalOpen(true);
    }
  }

  return (
    <LoaderWrapper loading={loading}>
      <GitHubLoginModal isOpen={githubLoginModalOpen} onClose={() => setGithubLoginModalOpen(false)} onLogin={handleLogin} />
     <NavigationLayout 
        searchParams={{query, sortOption, order}} 
        onSearchQueryChange={onSearchQueryChange}
        onSearch={() => searchPublicRepos({query, sortBy: sortOption, page: 1, order})}
        onFocus={onSearchInputFocus}
     >
      <div>
        <h4 className={style["repository-header"]}>Repositories</h4>
        {repos.map((repo) => (
        <RepositoryCard key={repo.id} repo={repo} />
      ))}
        {
          repos.length === 0 && 
          <div className={style['empty-state']}>
            <p className={style["empty-state-text"]}>{emptyStateText[emptyStateMsg]}</p>
            {emptyStateMsg === 1 ? <EmptyState/> : <SadState/>}
          </div>
        }
        {!githubAccessToken && <div className={style["button-container"]}>
          <button className={style["github-login-button"]} onClick={handleLogin}>Sign in with GitHub</button>
        </div>}
      </div>
     </NavigationLayout>
     </LoaderWrapper>
  )
}

export default withPagination(RepositoriesPage);
