export default function ItemHeading({ d, selected, setSelected }) {
    const handleCheck = (d) => {
      if (selected.some((item) => item.id == d.id)) {
        const temp = selected.filter((i) => i.id !== d.id);
        setSelected([...temp]);
      } else {
        setSelected((prev) => [...prev, d]);
      }
    };
  
    return (
      <div className="modal_item_heading">
        <div className="checkbox">
          <input
            type="checkbox"
            checked={selected.some((item) => item.id == d.id)}
            onChange={() => handleCheck(d)}
          />
        </div>
        <img src={d.image.src} alt="product_image" className="modal_item_image" />
        <span>{d.title}</span>
      </div>
    );
  }
  