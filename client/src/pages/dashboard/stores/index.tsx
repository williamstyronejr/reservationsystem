import * as React from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { Link } from 'react-router-dom';
import './styles/index.css';

const StoresPage = () => {
  const [search, setSearch] = React.useState<string>('');
  const [list, setList] = React.useState([
    {
      id: '123',
      name: 'store name 1',
    },
  ]);

  const [scrollRef] = useInfiniteScroll({
    loading: list.length > 10,
    hasNextPage: true,
    onLoadMore: () =>
      setList([
        ...list,
        {
          id: `${list[list.length - 1].id}1`,
          name: `Store name ${list.length}`,
        },
      ]),
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
        {list.map((store) => (
          <li className="stores__item" key={`store-${store.id}`}>
            <Link className="stores__link" to={`/dashboard/stores/${store.id}`}>
              <p className="stores__title">{store.name}</p>
            </Link>
          </li>
        ))}

        {true ? (
          <li className="stores__item" ref={scrollRef}>
            Loading
          </li>
        ) : null}
      </ul>
    </section>
  );
};

export default StoresPage;
