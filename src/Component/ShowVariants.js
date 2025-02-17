export default function ShowVariants({
    index,
    variants,
    selected,
    setSelected,
    d,
  }) {
    const checkCheck = (v) => {
      const productSelected = selected.find((item) => item.id === d.id);
      return productSelected
        ? productSelected.variants.some((sv) => sv.id === v.id)
        : false;
    };
  
    const handleChange = (v) => {
      const productSelected = selected.find((item) => item.id === d.id);
  
      if (!productSelected) {
        // If the product isn't selected, add it with this variant
        const newProduct = { ...d, variants: [v] };
        setSelected((prev) => [...prev, newProduct]);
      } else {
        // If the product is already selected, update its variants
        let updatedVariants;
        // Check if the variant is already selected
        if (productSelected.variants.some((sv) => sv.id === v.id)) {
          // If yes, remove it (toggle off)
          updatedVariants = productSelected.variants.filter(
            (sv) => sv.id !== v.id
          );
        } else {
          // If no, add it (toggle on)
          updatedVariants = [...productSelected.variants, v];
        }
  
        // If no variants remain, remove the product from the selected list
        if (updatedVariants.length === 0) {
          setSelected((prev) => prev.filter((item) => item.id !== d.id));
        } else {
          // Otherwise, update the product with new variants
          const updatedProduct = {
            ...productSelected,
            variants: updatedVariants,
          };
          setSelected((prev) =>
            prev.map((item) => (item.id === d.id ? updatedProduct : item))
          );
        }
      }
    };
    return (
      <>
        {variants.map((v) => {
          return (
            <div className="variant">
              <div className="variant_title">
                <input
                  type="checkbox"
                  checked={checkCheck(v)}
                  onChange={() => handleChange(v)}
                />
                {v.title}
              </div>
              <div className="variant_details">
                <div className="variant_available">99 available</div>
                <div className="variant_price">{v.price}</div>
              </div>
            </div>
          );
        })}
      </>
    );
  }
  