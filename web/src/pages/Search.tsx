import * as React from "react";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return <section className="search"></section>;
};

export default SearchPage;
