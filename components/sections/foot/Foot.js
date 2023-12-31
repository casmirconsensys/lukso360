import fonts from "../../../styles/Fonts.module.css";
import styles from "./Foot.module.css";
import Link from "next/dist/client/link";
import React from "react";

const Foot = ({ position }) => {
  return (
    <div
      style={{ position: position }}
      className={`color-subtitle ${fonts.mont} ${styles.footerContainer}`}
    >
      <p>© 2024 360NFT</p>
      <Link href="/privacypolicy">
        <a style={{ textDecoration: "none" }}>Terms &amp; conditions</a>
      </Link>
    </div>
  );
};

export default Foot;
