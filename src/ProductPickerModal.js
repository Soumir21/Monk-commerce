import "./Styles/Modal.css";
import SearchIcon from "@mui/icons-material/Search";

import ShowVarients from "./Component/ShowVariants";
import ItemHeading from "./Component/ItemHeading";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
const API_KEY = process.env.REACT_APP_API_KEY;

export default function ProductPickerModal({
  setShowModal,
  setFinalisedProduct,
  finalisedProduct,
  searchInput,
}) {
  const [selected, setSelected] = useState([...finalisedProduct]);
  const [search, setSearch] = useState(searchInput);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { ref, inView } = useInView({ threshold: 0 });

  //Get the data from the API
  async function fetchData(pageNumber = 1) {
    try {
      const response = await fetch(
        `http://stageapi.monkcommerce.app/task/products/search?search=${search}&page=${pageNumber}&limit=10`,
        {
          headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      );
      const result = await response.json();
      if (result.length < 10) setHasMore(false);
      setData((prev) => [...prev, ...result]);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  }

  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    fetchData(1);
  }, [search]);

//useEffect to handle the pagination
  useEffect(() => {
    if (inView && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore]);
  useEffect(() => {
    if (page > 1) {
      fetchData(page);
    }
  }, [page]);

  const countProducts = () => {
    return selected.reduce((sum, item) => sum + item.variants.length, 0);
  };

  const addProducts = () => {
    setFinalisedProduct([...selected]);
    setShowModal(false);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <div className="modal">
      <div className="modal_header">
        <h2>Select Products</h2>
      </div>

      <div className="modal_search">
        <SearchIcon />
        <input
          placeholder="Search product"
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="modal_product_list">
        {data.length ? (
          data.map((d, index) => (
            <div key={`${d.id}-${index}`}>
            <ItemHeading
                d={d}
                selected={selected}
                setSelected={setSelected}
              />
              {d.variants.length ? (
                <ShowVarients
                  index={index}
                  d={d}
                  variants={d.variants}
                  selected={selected}
                  setSelected={setSelected}
                />
              ) : null}
            </div>
          ))
        ) : (
          <div className="failed-data">
            <p>No products found</p>
            <button onClick={clearSearch}>Clear Search</button>
          </div>
        )}

        {/* Loader for Infinite Scroll */}
        <div ref={ref} className="loading">
          {hasMore ? <p>Loading more products...</p> : <p>No more products</p>}
        </div>
      </div>

      <div className="modal_footer">
        <span>{countProducts()} Product selected</span>
        <div className="modal_buttons">
          <button className="cancel" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className="add" onClick={addProducts}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
