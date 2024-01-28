"use client";
import styles from "./NavButton.module.scss";

type NavButtonProps = {
  isOpen: boolean;
};

const OpenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="39"
    height="30"
    viewBox="0 0 39 30"
    fill="none"
  >
    <path
      d="M36.3138 15L3.14212 15"
      stroke="#0D3B66"
      strokeWidth="5.03"
      strokeLinecap="round"
    />
    <path
      d="M3 27L36.1717 27"
      stroke="#0D3B66"
      strokeWidth="5.03"
      strokeLinecap="round"
    />
    <path
      d="M3 3L36.1717 3"
      stroke="#0D3B66"
      strokeWidth="5.03"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
  >
    <path
      d="M3.41422 3.12988L26.8702 26.5858"
      stroke="#0D3B66"
      strokeWidth="5.03"
      strokeLinecap="round"
    />
    <path
      d="M26.8702 3L3.41423 26.456"
      stroke="#0D3B66"
      strokeWidth="5.03"
      strokeLinecap="round"
    />
  </svg>
);

const NavButton: React.FC<NavButtonProps> = ({ isOpen }) => {
  const handleDrawerToggle = async () => {
    const nav = document.querySelector("#nav-drawer");
    const isOpen = nav?.getAttribute("aria-hidden") === "false";
    nav?.setAttribute("aria-hidden", isOpen ? "true" : "false");
  };

  return (
    <div className={styles["nav-button-wrapper"]}>
      <button
        aria-controls="nav-drawer"
        onClick={handleDrawerToggle}
        className={isOpen ? styles["nav-open"] : styles["nav-close"]}
      >
        {isOpen ? OpenIcon() : CloseIcon()}
      </button>
    </div>
  );
};

export { NavButton };
