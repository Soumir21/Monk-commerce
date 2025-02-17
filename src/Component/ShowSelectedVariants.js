import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import DiscountButton from "./DiscountButton";
import { useState, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
export default function SelectedVariants({
  variants,
  updateVariants,
  productIndex,
}) {
  const [localVariants, setLocalVariants] = useState(variants);
  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    setLocalVariants([...variants]);
  }, [variants]);

  const handleDragStart = (index) => setDraggedIndex(index);
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (index) => {
    if (draggedIndex === index) return;
    const updated = [...localVariants];
    const [draggedItem] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, draggedItem);

    setLocalVariants(updated);
    updateVariants([...updated], productIndex);
  };
  const deleteVariant=(id)=>{
    console.log(localVariants)
    const temp=localVariants.filter((v)=>v.id!==id);
    setLocalVariants(temp);
    updateVariants(temp,productIndex);
  }
  return (
    <div className="selected-variants">
      {localVariants.map((v, index) => (
        <div
          key={v.id}
          className="selected-variant-title-product"
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(index)}
        >
          <div className="product">
            <ViewCompactIcon />
          </div>
          <div className="selected-variant-product-title">{v.title}</div>
          <DiscountButton alwaystrue="true" />
          {localVariants.length>1?<ClearIcon onClick={()=>deleteVariant(v.id)}/>:""}
        </div>
      ))}
    </div>
  );
}
