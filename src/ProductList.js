import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import CreateIcon from "@mui/icons-material/Create";
import ClearIcon from "@mui/icons-material/Clear";
import ProductPickerModal from "./ProductPickerModal";
import DiscountButton from "./Component/DiscountButton";
import ShowSelectedVariants from "./Component/ShowSelectedVariants";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useState } from "react";

export default function ProductList() {
  const [finalisedProduct, setFinalisedProduct] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [discountSelected, setDiscountSelected] = useState([]);
  const [showVariants, setShowVariants] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [search, setSearch] = useState("");

  const changeShowVariants = (index) => {
    if (showVariants.includes(index)) {
      // Remove the element matching 'index'
      const temp = showVariants.filter((ele) => ele !== index);
      console.log(temp);
      setShowVariants(temp);
    } else {
      // Add the index if not already present
      setShowVariants((prev) => [...prev, index]);
    }
  };
  const deleteItem = (index) => {
    var temp = finalisedProduct.filter((ele, i) => i !== index);

    console.log(temp);
    setFinalisedProduct(temp);
  };
  const updateVariants = (updatedVariants, productIndex) => {
    var temp = finalisedProduct;
    temp[productIndex].variants = updatedVariants;
    console.log(temp);
    setFinalisedProduct(temp);
  };
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    if (draggedIndex === index) return;

    const updatedProducts = [...finalisedProduct];
    const [movedProduct] = updatedProducts.splice(draggedIndex, 1);
    updatedProducts.splice(index, 0, movedProduct);

    setFinalisedProduct(updatedProducts);
    setDraggedIndex(null);
  };
  return (
    <div className="productList">
      <div className="productList-heading">
        <img
          src="/img1.png"
          alt="Layerthree"
          className="productList-heading-image"
        />
        <div className="productList-heading-text">Monk Upsell & Cross-sell</div>
      </div>
      <hr />
      <div className="productList-addproduct">
        <div className="productList-addproduct-heading">Add Product</div>
        <div className="productList-addproduct-info">
          <div className="product">Product</div>
          <div className="discount">Discount</div>
        </div>
        {finalisedProduct.map((product, index) => {
          return (
            <>
              <div
                key={product.id}
                className="productList-addproduct-product"
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
              >
                <div className="product">
                  <ViewCompactIcon />
                  {index + 1}.
                </div>
                <div className="productList-addproduct-input">
                  {product.title}
                  <CreateIcon
                    className="create-icon"
                    onClick={() => setShowModal(true)}
                  />
                </div>
                <DiscountButton
                  discountSelected={discountSelected}
                  setDiscountSelected={setDiscountSelected}
                  index={index}
                />
                <ClearIcon onClick={() => deleteItem(index)} />
              </div>
              {product.variants.length>1 ? (showVariants.includes(index)?
                <div
                  className="show-variants"
                  onClick={() => changeShowVariants(index)}
                >
                  Hide Variants<ArrowUpwardIcon className="icon"/>
                </div>: <div
                  className="show-variants"
                  onClick={() => changeShowVariants(index)}
                >
                  Show Variants <ArrowDownwardIcon className="icon"/>
                </div>
              ) : (
                ""
              )}
              {showVariants.includes(index) || product.variants.length===1? (
                <ShowSelectedVariants
                  variants={product.variants}
                  updateVariants={updateVariants}
                  productIndex={index}
                />
              ) : (
                ""
              )}
            </>
          );
        })}

        <div className="productList-addproduct-product">
          <div className="product">
            <ViewCompactIcon />
            {finalisedProduct.length + 1}.
          </div>

          <div className="productList-addproduct-input">
            <input placeholder="Select Product" value={search} onChange={(e)=>setSearch(e.target.value)}/>
            <CreateIcon
              className="create-icon"
              onClick={() => setShowModal(true)}
            />
          </div>
          <DiscountButton
            discountSelected={discountSelected}
            setDiscountSelected={setDiscountSelected}
            index={finalisedProduct.length}
          />
        </div>
        <button className="productList-addproduct-add-button">
          Add product
        </button>
      </div>
      {showModal ? (
        <ProductPickerModal
          setShowModal={setShowModal}
          setFinalisedProduct={setFinalisedProduct}
          finalisedProduct={finalisedProduct}
          searchInput={search}
        />
      ) : (
        ""
      )}
    </div>
  );
}
