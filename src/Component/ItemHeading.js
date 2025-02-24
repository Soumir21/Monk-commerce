import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
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
        {d.image.src? <LazyLoadImage
        src={d.image.src}
        className="modal_item_image"
        placeholderSrc="/favicon.ico"
      />:<ImageNotSupportedIcon style={{color:"green"}}/>}
       
        
        <span>{d.title}</span>
      </div>
    );
  }
  