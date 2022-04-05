import * as React from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { Link } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import './styles/index.css';

const StoresPage = () => {
  const [search, setSearch] = React.useState<string>('');

  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    '/dashboard/stores',
    async ({ pageParam = 0 }) => {
      const res = await axios(`/dashboard/stores?cursor=${pageParam}`);

      return res.data;
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.stores.length === 10 ? lastPage.cursor : undefined,
    },
  );

  const [scrollRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage || true,
    onLoadMore: fetchNextPage,
    rootMargin: '0px 0px 400px 0px',
  });

  return (
    <section className="stores">
      <header className="stores__header">
        <h2 className="stores__heading">
          Stores
          <Link className="stores__create" to="/dashboard/stores/create">
            Create New Store
          </Link>
        </h2>

        <div className="stores__search">
          <label className="" htmlFor="store-search">
            <i className="fas fa-search" />

            <input
              id="store-search"
              name="store-search"
              className="stores__input"
              value={search}
              onChange={(evt) => setSearch(evt.target.value)}
              placeholder="Search ..."
            />
          </label>
        </div>
      </header>

      <ul className="stores__list">
        {data && data.pages && data.pages[0].stores.length > 0 ? (
          data.pages.map((arr) =>
            arr.stores.map((store: any) => (
              <li
                className="stores__item"
                key={`store-${store.id}-${arr.cursor}`}
              >
                <Link
                  className="stores__link"
                  to={`/dashboard/stores/${store.id}`}
                >
                  <p className="stores__title">{store.name}</p>
                </Link>
              </li>
            )),
          )
        ) : (
          <li className="stores__item stores__item--empty">
            Open your store today
          </li>
        )}

        {hasNextPage ? (
          <li className="stores__item" ref={scrollRef}>
            Loading
          </li>
        ) : null}
      </ul>
    </section>
  );
};

export default StoresPage;
