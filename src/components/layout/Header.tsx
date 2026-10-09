import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTextSize } from "../../hooks/useTextSize";
import logo from "../../assets/Logo Golpe no Golpe.png";
import "./Header.css";

const navItems = [
  { to: "/tutorial", label: "Como jogar" },
  { to: "/aprenda-mais", label: "Aprenda mais" },
  { to: "/quem-somos", label: "Quem Somos" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const textSize = useTextSize();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <NavLink to="/" className="site-header__logo-link">
        <img src={logo} alt="Golpe no Golpe" className="site-header__logo" />
        <span className="site-header__wordmark">Golpe no Golpe</span>
      </NavLink>

      <div className="site-header__right">
        <button
          className="site-header__text-size"
          onClick={textSize.cycle}
          aria-label={`Tamanho do texto: ${textSize.label}. Clique para mudar.`}
        >
          <span className="site-header__text-size-a1">A</span>
          <span className="site-header__text-size-a2">A</span>
        </button>

        <button
          className="site-header__toggle"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav
          className={
            menuOpen ? "site-header__nav site-header__nav--open" : "site-header__nav"
          }
        >
          <ul className="site-header__nav-list">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? "site-header__link site-header__link--active"
                      : "site-header__link"
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
