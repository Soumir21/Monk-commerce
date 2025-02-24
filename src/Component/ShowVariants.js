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
        const newProduct = { ...d, variants: [v] };
        setSelected((prev) => [...prev, newProduct]);
      } else {
           let updatedVariants;
       
        if (productSelected.variants.some((sv) => sv.id === v.id)) {
         
          updatedVariants = productSelected.variants.filter(
            (sv) => sv.id !== v.id
          );
        } else {
      
          updatedVariants = [...productSelected.variants, v];
        }

        if (updatedVariants.length === 0) {
          setSelected((prev) => prev.filter((item) => item.id !== d.id));
        } else {
 
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
        {variants.map((v,index) => {
          return (
            <div className="variant" key={index}>
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
  