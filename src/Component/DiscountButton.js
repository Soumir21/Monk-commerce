export default function DiscountButton({
  discountSelected = [],
  setDiscountSelected,
  index,
  alwaystrue,
}) {
    return (
      <>
        {alwaystrue == "true" ? (
          <div className="discount_input">
            <input placeholder="0" className="discount_value" />
            <select className="discount_dropdown">
              <option value="1">% off</option>
              <option value="2">flat off</option>
            </select>
          </div>
        ) : discountSelected.includes(index) ? (
          <div className="discount_input">
            <input placeholder="0" className="discount_value" />
            <select className="discount_dropdown">
              <option value="1">% off</option>
              <option value="2">flat off</option>
            </select>
          </div>
        ) : (
          <button
            className="productList-addproduct-discount-button"
            onClick={() => setDiscountSelected((prev) => [...prev, index])}
          >
            Add Discount
          </button>
        )}
      </>
    );
  }
  