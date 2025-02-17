import "./Styles/Modal.css";
import SearchIcon from "@mui/icons-material/Search";
import {sourceData} from "./sampleData";
import ShowVarients from "./Component/ShowVariants";
import ItemHeading from "./Component/ItemHeading";
import {  useEffect, useState } from "react";
export default function ProductPickerModal({
  setShowModal,
  setFinalisedProduct,
  finalisedProduct,
  searchInput
}) {
  const [selected, setSelected] = useState([...finalisedProduct]);
  const [search, setSearch] = useState(searchInput);
  const [data, setData] = useState(sourceData);
  const countProducts = () => {
    var sum = 0;
    selected.forEach((item) => (sum += item.variants.length));
    return sum;
  };
  const addProducts = () => {
    setFinalisedProduct((prev) => [...selected]);
    setShowModal(false);
  };
  const handleSearch = () => {
    if (!search) {
      setData(sourceData);
    } else {
      var temp = sourceData.filter((ele) =>
        ele.title.toLowerCase().includes(search.toLowerCase())
      );
    
      setData(temp);
    }
  };
  const clearSearch=()=>{
    setData(sourceData);
    setSearch("")
  }
  useEffect(()=>{handleSearch()},[])
  return (
    <div className="modal">
      <div className="modal_header">
        <h2>Select Products</h2>
      </div>
      <div className="modal_search">
        <SearchIcon onClick={() => handleSearch()} />
        <input
          placeholder="Search product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="modal_product_list">
        {data.length?data.map((d, index) => {
          return (
            <>
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
              ) : (
                ""
              )}
            </>
          );
        }):<div className="failed-data"><p>No prducts found</p><button onClick={()=>{clearSearch()}}>Clear Search</button></div>}
      </div>
      <div className="modal_footer">
        <span>{countProducts()} Product selected</span>
        <div className="modal_buttons">
          <button className="cancel" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className="add" onClick={() => addProducts()}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
