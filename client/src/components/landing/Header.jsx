// import { useState } from "react";
// /* eslint no-unused-vars: "off" */

// import { RiMenu3Fill, RiCloseLine } from "react-icons/ri";
// import { GiExitDoor } from "react-icons/gi";

// const Header = () => {
//   const [showMenu, setShowMenu] = useState(false);
//   return (
//     <header
//       className="flex items-center justify-between xl:justify-start w-full py-4 px-8 h-[10vh] z-50"
//       style={{ backgroundColor: "#F1EFE7" }}
//     >
//       <div className="xl:w-1/6 text-center -mt-4">
//         {/* <a href="#" className="text-2xl font-bold relative p-1 bg-black" style={{ color: "#F1EFE7" }}>
//           <img src="https://res.cloudinary.com/dwit2djhy/image/upload/v1690153676/Nomadlocals/Logos/5_n5vayy.png" alt="Logo" className="h-8" />
//         </a> */}
//       </div>
//       <nav
//         className={`fixed bg-white w-[80%] md:w-[40%] xl:w-full h-full ${
//           showMenu ? "left-0" : "-left-full"
//         } top-0 xl:static flex-1 flex flex-col xl:flex-row items-center justify-center gap-10 transition-all duration-500 z-50`}
//         style={{ backgroundColor: "#F1EFE7" }}
//       >
//         <a href="#home" className="" style={{ color: "#000000" }}>
//           Inicio
//         </a>
//         <a href="#aboutUs" className="" style={{ color: "#000000" }}>
//           Eventos
//         </a>
//         <a href="#services" className="" style={{ color: "#000000" }}>
//           Servicios
//         </a>
//         <a href="#footer" className="" style={{ color: "#000000" }}>
//           Sobre nosotros
//         </a>
//       </nav>

//       <button
//         className="ml-auto bg-blue text-black px-4 py-2 rounded-xl"
//         onClick={() => (window.location.href = "/sign-in")}
//       >
//         Entrar <GiExitDoor className="inline ml-1" />
//       </button>
//       <button onClick={() => setShowMenu(!showMenu)} className="xl:hidden text-2xl p-2">
//         {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
//       </button>
//     </header>
//   );
// };

// export default Header;
