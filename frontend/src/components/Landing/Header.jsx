import { useState } from "react";
import { GoChevronDown, GoChevronRight } from "react-icons/go";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/images/AkademiyaProLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { verifyPrincipal } from "../../api/authentication";
import { useDispatch } from "react-redux";
import AdvancedEducationSpinner from "../Spinner";
import { toast } from "react-toastify";
import { setPrincipal } from "../../features/principal/principalSlice";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Products",
      href: "/products",
      subItems: [
        { name: "Web Development", href: "/web-dev" },
        { name: "Mobile Apps", href: "/mobile-apps" },
        { name: "UI/UX Design", href: "/ui-ux" },
      ],
    },
    {
      name: "Brochure",
      href: "/brochure",
    },
    {
      name: "Customer Support",
      href: "/support",
      subItems: [
        { name: "Help Center", href: "/help-center" },
        { name: "Contact Us", href: "/contact" },
        { name: "FAQs", href: "/faqs" },
      ],
    },
    {
      name: "Partner",
      href: "/partner",
      subItems: [
        { name: "Become a Partner", href: "/become-partner" },
        { name: "Partner Portal", href: "/partner-portal" },
      ],
    },
  ];

  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  // Button base styles
  const buttonBase =
    "rounded-md font-medium transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#080808]";
  const buttonOutline = `${buttonBase} border-2 border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/30 px-6 py-2`;
  const buttonPrimary = `${buttonBase} bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:from-blue-600 hover:to-purple-700 hover:shadow-xl px-6 py-2`;
  const buttonMobileOutline = `${buttonBase} border-2 border-white/20 bg-transparent text-white hover:bg-white/10 w-full py-3`;
  const buttonMobilePrimary = `${buttonBase} bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 w-full py-3`;

  async function handleLogin() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Verify Principal Token
        setLoading(true)
        const principalData = await verifyPrincipal(token);
        if (!principalData) {
          toast.error("Verification failed. Redirecting to sign-in.");
          navigate("/signin");
          return;
        }
        setLoading(false)
        // Update Principal Data
        console.log("Principal Data:", principalData);
        dispatch(setPrincipal(principalData));
        toast.success("Login Successful!");
        navigate("/dashboard");
      } catch (error) {
        console.error("Error fetching principal data:", error);
        toast.error("Error verifying principal data. Please try again.");
        navigate("/signin");
      }
    } else {
      navigate('/signin')
    }
  }

  if(loading){
    return <div className="flex items-center justify-center h-full"><AdvancedEducationSpinner /></div>
  }

  return (
    <header className="fixed w-full z-50 bg-[#080808] border-b border-white/10">
      <div className="container mx-auto px-4 py-3 h-[85px]">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="logo"
              width={60}
              height={60}
              className="hover:rotate-12 transition-transform duration-300"
            />
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Akademiya Pro
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.subItems ? (
                  <>
                    <button className="flex items-center gap-1 text-white/90 hover:text-white transition-colors group">
                      <span className="group-hover:text-blue-400 transition-colors">
                        {item.name}
                      </span>
                      <GoChevronDown className="mt-1 group-hover:rotate-180 transition-transform" />
                    </button>
                    <div className="absolute left-0 top-full mt-2 w-56 bg-[#1a1a1a] rounded-lg shadow-2xl py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-white/10">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.href}
                          className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors hover:pl-5 duration-200"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.href || "#"}
                    className="text-white/90 hover:text-blue-400 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FiX size={24} className="text-white/90" />
            ) : (
              <FiMenu size={24} className="text-white/90" />
            )}
          </button>

          {/* CTA Buttons */}
          <div className="hidden md:flex gap-4 items-center">
              <button onClick={handleLogin} className={buttonOutline}>
                Login
              </button>
            <Link to="/signup">
              <button className={buttonPrimary}>Sign Up</button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#080808] p-4 border-t border-white/10 shadow-xl">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  {item.subItems ? (
                    <>
                      <button
                        className="flex items-center justify-between w-full py-3 px-4 text-white/90 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                        onClick={() => toggleSubmenu(index)}
                      >
                        <span>{item.name}</span>
                        {activeSubmenu === index ? (
                          <GoChevronDown className="text-sm transition-transform" />
                        ) : (
                          <GoChevronRight className="text-sm transition-transform" />
                        )}
                      </button>
                      {activeSubmenu === index && (
                        <ul className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-4">
                          {item.subItems.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                to={subItem.href}
                                className="block py-2 px-3 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href || "#"}
                      className="block py-3 px-4 text-white/90 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-4">
              <div to="/signin" onClick={() => setMobileMenuOpen(false)}>
                <button onClick={handleLogin} className={buttonMobileOutline}>Login</button>
              </div>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <button className={buttonMobilePrimary}>Sign Up</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
