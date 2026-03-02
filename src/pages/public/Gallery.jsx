import React from "react";
import { motion } from "framer-motion";
import gallartStyle from "../../styles/pages/public/Gallery.module.css";
import { FiDownloadCloud } from "react-icons/fi";

import image1 from "../../assets/gallary1_14.jpg";
import image2 from "../../assets/asDSC_0026 (17).jpg";
import image3 from "../../assets/gallary1_15.jpg";
import image4 from "../../assets/gallary1_16.jpg";
import image5 from "../../assets/gallary1_17.jpg";
import image6 from "../../assets/gallary1_21.jpg";
import image7 from "../../assets//gallary1_22.jpg";
import image8 from "../../assets/gallary1_26.jpg";
import image9 from "../../assets/gallary1_4.jpg";
import image10 from "../../assets/gallary1_47.jpg";
import image11 from "../../assets/gallary1_48.jpg";
import image12 from "../../assets/DSC_0006-2.jpg";
import image13 from "../../assets/offering (17).jpg";
import image14 from "../../assets/DSC_0019.jpg";
import image15 from "../../assets/DSC_0010.jpg";
import image16 from "../../assets/VOR (1).jpg";
// import image17 from "../../assets/gallary1_26.jpg";
// import image18 from "../../assets/gallary1_27.jpg";
// import image19 from "../../assets/gallary1_28.jpg";
// import image20 from "../../assets/gallary1_29.jpg";
// import image22 from '../../assets/gallary1_30.jpg';
// import image21 from '../../assets/gallary1_31.jpg';
// import image23 from '../../assets/gallary1_32.jpg';
// import image24 from '../../assets/gallary1_33.jpg';
// import image25 from '../../assets/gallary1_34.jpg';
// import image26 from '../../assets/gallary1_35.jpg';
// import image27 from '../../assets/gallary1_36.jpg';
// import image28 from '../../assets/gallary1_37.jpg';
// import image29 from '../../assets/gallary1_38.jpg';
// import image30 from '../../assets/gallary1_39.jpg';
// import image31 from '../../assets/gallary1_40.jpg';
// import image32 from '../../assets/gallary1_41.jpg';
// import image33 from '../../assets/gallary1_42.jpg';
// import image34 from '../../assets/gallary1_43.jpg';
// import image35 from '../../assets/gallary1_44.jpg';
// import image36 from '../../assets/gallary1_45.jpg';
// import image37 from '../../assets/gallary1_46.jpg';
// import image38 from '../../assets/gallary1_47.jpg';
// import image39 from '../../assets/gallary1_48.jpg';
// import image40 from '../../assets/gallary1_49.jpg';
// import image41 from '../../assets/gallary1_50.jpg';
// import image42 from '../../assets/gallary1_51.jpg';
// import image43 from '../../assets/gallary1_52.jpg';
// import image44 from '../../assets/gallary1_53.jpg';
// import image45 from '../../assets/gallary1_54.jpg';
// import image46 from '../../assets/gallary1_55.jpg';
// import image47 from '../../assets/gallary1_56.jpg';
// import image48 from '../../assets/gallary1_57.jpg';
// import image49 from '../../assets/gallary1_58.jpg';
// import image50 from '../../assets/gallary1_59.jpg';

const images = [
  image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16
];

export default function Gallery() {

  function downloadImage(url) {
    const link = document.createElement('a')
    link.href = url
    link.download = url.split('/').pop()
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <main className={gallartStyle.gallerypage}>
      <div className="container">
        <section className={gallartStyle.gallerySection}>
          <motion.div
            className={gallartStyle.header}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3>📸 Our Images</h3>
            <p>Moments captured during our fellowship programs</p>
          </motion.div>

          <motion.div
            className={gallartStyle.gallaryimagesGrid}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            {images.map((img, i) => (
              <motion.div
                className={gallartStyle.imagesCard}
                key={i}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 140 }}
              >
                <img src={img} alt={`Gallery ${i + 1}`} loading="lazy" />

                <button
                  className={gallartStyle.downloadBtn}
                  aria-label={`Download image ${i + 1}`}
                  onClick={() => downloadImage(img)}
                  
                >
                  <FiDownloadCloud />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </main>
  );
}
