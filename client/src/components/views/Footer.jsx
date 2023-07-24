import { RiInstagramLine, RiFacebookLine, RiTwitterLine } from "react-icons/ri";
import { Link } from "react-router-dom";


export default function Footer() {
    return (
      <>
        <div className="bg-grey font-quick border-t border-black">
          <div className="max-w-2xl mx-auto text-black py-10">
            <div className="text-center">
              <img src="https://res.cloudinary.com/dwit2djhy/image/upload/v1690153676/Nomadlocals/Logos/5_n5vayy.png" alt="logo" className="h-8 mx-auto" />
            </div>
            <div className="mt-5 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
              <p className="order-2 md:order-1 mt-8 md:mt-0">&copy; Nomad-Locals</p>
              <div className="order-1 md:order-2">
              <nav className="flex items-center justify-center gap-4">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className=" block text-black p-3 bg-grey rounded-full" /* Reducir el padding */
          >
            <RiInstagramLine />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-black p-3 bg-grey rounded-full" /* Reducir el padding */
          >
            <RiFacebookLine />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-black p-3 bg-grey rounded-full" /* Reducir el padding */
          >
            <RiTwitterLine />
          </a>
        </nav>
            
            <Link to="/about">
            <button
            type="button"
            className="font-quick py-2 px-6 bg-grey text-black rounded-xl text-sm" /* Reducir el tamaño de fuente */
             >
            Sobre nosotros
            </button>
            </Link>

            <button
            type="button"
            className="font-quick py-2 px-6 bg-grey text-black rounded-xl text-sm" /* Reducir el tamaño de fuente */
            >
            Contáctanos
            </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  