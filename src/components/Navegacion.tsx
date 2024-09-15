import React from "react";

import { Link } from "react-router-dom";

function Navegacion(){
    return (
      <nav className="bg-gray-400 p-2 md:w-1/5 rounded-xl w-full">
        <ul className="">
          <li className="text-white text-center font-bold bg-gray-500 p-4 rounded-xl">
            <Link to="/">Logo</Link>
          </li>
          <li className="text-white font-bold hover:bg-white p-4 rounded-xl hover:text-black mt-5">
            <Link to="/">Home</Link>
          </li>
          <li className="text-white font-bold hover:bg-white p-4 rounded-xl hover:text-black mt-5">
            <Link to="/Pageone">Pagina Una</Link>
          </li>
          <li className="text-white font-bold hover:bg-white p-4 rounded-xl hover:text-black mt-5">
            <Link to="/Pagetwo">Pagina Dos</Link>
          </li>
        </ul>
      </nav>
    );
}

export default Navegacion;