import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, UserCircle } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const [darkMode, setDarkMode] = useState(
  document.documentElement.classList.contains('dark')
);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setDarkMode(!darkMode);
};

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Scheduler', path: '/scheduler' },
    { name: 'Chores', path: '/chores' },
    { name: 'Group', path: '/group' },
  ];

  const [notifications, setNotifications] = useState([
  { id: 1, message: "New task assigned", read: false },
  { id: 2, message: "Trash was not taken out", read: false },
  { id: 3, message: "Group meeting scheduled", read: true },
]);

const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="bg-white shadow-md rounded-xl px-4 py-3 mb-6">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-600">FlatChores</div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 items-center text-gray-700 font-medium">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`hover:text-blue-500 ${
                  location.pathname === item.path ? 'text-blue-600 font-semibold' : ''
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
          {/* Notifications & Avatar */}
          <li className="ml-4">        
            <button className="relative hover:text-blue-500">
              <Bell size={20} />
                {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
                )}
            </button>
          </li>
          <li>
            <button className="hover:text-blue-500">
              <UserCircle size={24} />
            </button>
          </li>
          <li>
            <button
              onClick={toggleDarkMode}
              className="hover:text-blue-500 flex items-center gap-2"
            >
                {darkMode ? "🌙 Dark" : "☀️ Light"}
            </button>
          </li>
        </ul>

        {/* Hamburger Icon (Mobile Only) */}
        <button className="md:hidden text-gray-700" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu with Animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col gap-4 mt-4 text-gray-700 font-medium">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block hover:text-blue-500 ${
                  location.pathname === item.path ? 'text-blue-600 font-semibold' : ''
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <button className="hover:text-blue-500 flex items-center gap-2">
              <Bell size={20} /> Notifications
            </button>
          </li>
          <li>
            <button className="hover:text-blue-500 flex items-center gap-2">
              <UserCircle size={24} /> Profile
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
