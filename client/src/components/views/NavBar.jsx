import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MdOutlineCreate, MdTravelExplore } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { AiOutlineLaptop } from "react-icons/ai";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { Link, useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilteredActivities,
  setFilters,
  resetFilters,
  setSingOut,
} from "../../Redux trad/actions.js";

const navigation = [
  { icon: MdTravelExplore, name: "Explorar Actividades", to: "/activities" },
  { icon: MdOutlineCreate, name: "Crear Actividad", to: "/activity-form" },
  { icon: FaUserFriends, name: "Sobre Nosotros", to: "/about" },
  // { icon: AiOutlineLaptop, name: "Developer Team", to: "/developer" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [name, setName] = useState("");
  const [showName, setShowName] = useState("");
  const filter = useSelector((state) => state.filter);
  const user = useSelector((state) => state.user);
  const userImage = user.image;
  const userId = user.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    dispatch(resetFilters());

    dispatch(setFilters({ name }));

    dispatch(getFilteredActivities({ name }));

    setName("");
    navigate("/activities");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const userVacio = "";
  const { signOut } = useClerk();
  const handleSignOut = () => {
    dispatch(setSingOut(userVacio));
    signOut();
    navigate("/");
  };

  return (
    <Disclosure as="nav" className="bg-black font-quick relative border-b-2 border-blue">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 lg:text-xl">
            <div className="relative flex h-16 items-center justify-around lg:justify-between">
              <Link to="/home" className="absolute md:relative hover:scale-110 ease-out duration-300">
                <img src="https://res.cloudinary.com/dwit2djhy/image/upload/v1690153676/Nomadlocals/Logos/2_kbqwgr.png" alt="icon" className="h-8 w-8 mr-2" />
              </Link>
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="ml-2 inline-flex items-center justify-center rounded-md p-2 text-grey hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className=""></span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-20 flex-row justify-center items-center">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className="text-grey font-spartan relative"
                        onMouseEnter={() => setShowName(item.name)}
                        onMouseLeave={() => setShowName("")}
                      >
                        <div className="flex flex-col items-center ml-8">
                          <item.icon className="w-6 h-6 lg:w-10 lg:h-10" aria-hidden="true" />
                          <div className={`absolute rounded-xl font-quick bg-black text-grey -bottom-3 text-center font-extrabold text-xl text-black opacity-0 hover:scale-120 ease-out transition-opacity duration-300 ${showName === item.name ? "opacity-100" : ""}`}>
                            <span className="text-xs">{item.name}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0 text-blue">
                <button
                  onClick={() => setShowSearchBar(!showSearchBar)}
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-grey focus:outline-none hover:scale-125 ease-in-out duration-300"
                >
                  <span className="sr-only">View notifications</span>
                  {!showSearchBar && !open && (
                    <MagnifyingGlassIcon
                      className="h-6 w-6 text-grey"
                      aria-hidden="true"
                    />
                  )}
                </button>
                {showSearchBar && !open && (
                  <div className="relative mb-6 mr-2 rounded-md shadow-sm">
                    <input
                      type="text"
                      id="search"
                      className="absolute right-0 z-10 w-40 md:w-48 lg:w-56 origin-top-right rounded-md bg-white py-1 px-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none font-spartan"
                      placeholder="Buscar actividad"
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                      onKeyPress={handleKeyPress}
                      value={name}
                    />
                    <div className="absolute right-0 z-10 origin-top-right py-1 px-1">
                      <MagnifyingGlassIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                        onClick={handleSearch}
                      />
                    </div>
                  </div>
                )}

                {/* Profile dropdown */}
                {showSearchBar && !open && (
                  <button
                    className="mt-2 text-grey"
                    onClick={() => setShowSearchBar(false)}
                  >
                    X
                  </button>
                )}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={userImage}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute border border-blue right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-black py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={`/profile/${userId}`}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-grey lg:text-xl"
                            )}
                          >
                            Perfil
                          </Link>
                        )}
                      </Menu.Item>
                      {/* <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/settings"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-grey lg:text-xl"
                            )}
                          >
                            Configuración
                          </a>
                        )}
                      </Menu.Item> */}
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => handleSignOut()}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-grey lg:text-xl"
                            )}
                          >
                            Cerrar Sesión
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700" />
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-white hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  <div className="flex items-center">
                    {item.icon && (
                      <item.icon
                        className="w-5 h-5 mr-2 text-grey"
                        aria-hidden="true"
                      />
                    )}
                    <span className="">{item.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
