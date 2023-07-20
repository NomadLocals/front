export default function Footer() {
    return (
      <>
        <div className="bg-grey font-quick border-t border-black-500">
          <div className="max-w-2xl mx-auto text-black py-10">
            <div className="text-center">
              <img src="5.png" alt="logo" className="h-8 mx-auto" />
            </div>
            <div className="mt-5 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
              <p className="order-2 md:order-1 mt-8 md:mt-0">&copy; Nomad-Locals.</p>
              <div className="order-1 md:order-2">
                <span className="px-2">Sobre Nosotros</span>
                <span className="px-2 border-l">Contactanos</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  