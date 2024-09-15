// import { gql, useQuery } from "@apollo/client";
// import "./App.css";
// import Menu from "./components/Menu";
// import { useState, useEffect } from "react";
// import BuscadorImagen from "./components/BuscadorImagen";

// // CONSULTANDO A LA API
// export const PAISES = gql`
//   query GetCountries {
//     countries {
//       name
//       continent {
//         name
//       }
//       languages {
//         name
//       }
//       subdivisions {
//         name
//       }
//       capital
//       currency
//       native
//     }
//   }
// `;

// //INTERFACES

// export interface Language {
//   name: string;
// }

// export interface Subdivision {
//   name: string;
// }

// export interface Continent {
//   name: string;
// }

// //

// export interface Paises {
//   name: string;
//   continent: Continent;
//   languages: Language[];
//   capital: string;
//   currency: string;
//   native: string;
//   subdivisions: Subdivision[];
// }

// //Tipando datos

// interface paisType {
//   countries: Paises[];
// }

// //funcion

// function App() {
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [itemsPerPage] = useState<number>(100);
//   const [selectedContinent,setSelectedContinent]=useState<string>("All")

//   const [images, setImages] = useState<{ [key: string]: string }>({});

//   const { data, error, loading } = useQuery<paisType>(PAISES);

//   useEffect(() => {
//     const fetchImages = async () => {
//       if (data) {
//         const countryImages = await Promise.all(
//           data.countries.map(async (pais) => {
//             const imageUrl = await BuscadorImagen(pais.name);
//             return { name: pais.name, imageUrl };
//           })
//         );
//         const imageMap = countryImages.reduce((acc, curr) => {
//           acc[curr.name] = curr.imageUrl;
//           return acc;
//         }, {} as { [key: string]: string });
//         setImages(imageMap);
//       }
//     };
//     fetchImages();
//   }, [data]);

//   if (loading) return <p>cargando paises</p>;
//   if (error) return <p>Error:{error.message}</p>;

//   //

//   const indexOfLastCountry = currentPage * itemsPerPage;
//   const indexOfFirstCountry = indexOfLastCountry - itemsPerPage;
//   const currentCountries = data?.countries.slice(
//     indexOfFirstCountry,
//     indexOfLastCountry
//   );

//   //filtar los paises
//   const filtrandoPaises = currentCountries?.filter((pais) =>
//     pais.name.toLowerCase().includes(searchTerm.toLowerCase())
//   )
//   .filter((pais)=>
//     selectedContinent==="All"?true:pais.continent.name===selectedContinent
//   );

//   const totalPages = Math.ceil((data?.countries.length || 0) / itemsPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-center p-2 gap-2 bg-blue-100 flex-wrap">
//         <Menu />

//         <div className="p-2 w-full md:w-9/12">
//           <div className="p-2 flex justify-center">
//             <input
//               className="w-1/2 rounded-full p-4 outline-none shadow-xl"
//               type="search"
//               placeholder="Pais"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button className="bg-blue-500 text-white p-2 px-4 rounded-r-full flex items-center"></button>
//           </div>

//           <div className="p-2 flex justify-center">
//             <select
//               className="p-2 rounded-full"
//               value={selectedContinent}
//               onChange={(e) => setSelectedContinent(e.target.value)}
//             >
//               <option value="All">Continentes</option>
//               <option value="Asia">Asia</option>
//               <option value="Africa">Africa</option>
//               <option value="Europe">Europe</option>
//               <option value="Oceania">Oceania</option>
//               <option value="Americas">Americas</option>
//             </select>
//           </div>

//           <div className="flex justify-between flex-wrap">
//             {filtrandoPaises?.map((pais) => (
//               <div
//                 className="flex justify-between m-2 gap-2 bg-blue-50 rounded-xl shadow-lg w-full sm:w-1/4"
//                 key={pais.name}
//               >
//                 <img
//                   className="w-2/4 p-3 block m-auto"
//                   src={images[pais.name]}
//                   //src={//images[pais.name]}
//                   alt={`${pais.name}`}
//                 />
//                 <div className="p-5 w-1/2" key={pais.name}>
//                   <h2 className="font-bold text-blue-700">{pais.name}</h2>
//                   <p>{pais.continent.name}</p>
//                   <div className="p-2">
//                     <button className="bg-green-600 p-2 rounded-xl text-white">
//                       Ver mas
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div>
//         <button onClick={handlePreviousPage} disabled={currentPage === 1}>
//           anterior
//         </button>
//         <span>
//           Pagina {currentPage} de {totalPages}
//         </span>
//         <button onClick={handleNextPage} disabled={currentPage === totalPages}>
//           Siguiente
//         </button>
//       </div>
//     </>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Home from './components/Home';
import Paginaone from './components/PaginaOne';
import Paginatwo from "./components/PaginaTwo";

function App(){
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Pageone" element={<Paginaone />} />
          <Route path="/Pagetwo" element={<Paginatwo />} />
        </Routes>
      </div>
    </Router>
  );
}



export default App;