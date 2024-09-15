import { gql, useQuery } from "@apollo/client";
import "../App.css";
import { useState, useEffect } from "react";
import BuscadorImagen from "./BuscadorImagen";
import Navegacion from "./Navegacion";

// CONSULTANDO A LA API
export const PAISES = gql`
  query GetCountries {
    countries {
      name
      continent {
        name
      }
      languages {
        name
      }
      subdivisions {
        name
      }
      capital
      currency
      native
    }
  }
`;



export interface Language {
  name: string;
}

export interface Subdivision {
  name: string;
}

export interface Continent {
  name: string;
}


export interface Paises {
  name: string;
  continent: Continent;
  languages: Language[];
  capital: string;
  currency: string;
  native: string;
  subdivisions: Subdivision[];
}

interface paisType {
  countries: Paises[];
}


function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [itemsPerPage] = useState<number>(100);
  const [selectedContinent, setSelectedContinent] = useState<string>("All");
  const [selectedCountry, setSelectedCountry] = useState<Paises | null>(null);

  const [images, setImages] = useState<{ [key: string]: string }>({});

  const { data, error, loading } = useQuery<paisType>(PAISES);

  useEffect(() => {
    const fetchImages = async () => {
      if (data) {
        const countryImages = await Promise.all(
          data.countries.map(async (pais) => {
            const imageUrl = await BuscadorImagen(pais.name);
            return { name: pais.name, imageUrl };
          })
        );
        const imageMap = countryImages.reduce((acc, curr) => {
          acc[curr.name] = curr.imageUrl;
          return acc;
        }, {} as { [key: string]: string });
        setImages(imageMap);
      }
    };
    fetchImages();
  }, [data]);

  if (loading) return <p>cargando paises</p>;
  if (error) return <p>Error:{error.message}</p>;


  const indexOfLastCountry = currentPage * itemsPerPage;
  const indexOfFirstCountry = indexOfLastCountry - itemsPerPage;
  const currentCountries = data?.countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const filtrandoPaises = currentCountries
    ?.filter((pais) =>
      pais.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((pais) =>
      selectedContinent === "All"
        ? true
        : pais.continent.name === selectedContinent
    );

  const totalPages = Math.ceil((data?.countries.length || 0) / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

    const handleCountryClick = (pais: Paises) => {
      setSelectedCountry(pais);
    };

  return (
    <>
      <div className="flex justify-center p-2 gap-2 bg-blue-100 flex-wrap">
        <Navegacion />

        <div className="p-2 w-full md:w-9/12">
          <div className="p-2 flex justify-center">
            <input
              className="w-1/2 rounded-full p-4 outline-none shadow-xl"
              type="search"
              placeholder="Pais"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-blue-500 text-white p-4 px-15 rounded-full flex items-center">
              buscar
            </button>
          </div>

          <div className="p-2 flex justify-center">
            <select
              className="p-2 rounded-full"
              value={selectedContinent}
              onChange={(e) => setSelectedContinent(e.target.value)}
            >
              <option value="All">Continentes</option>
              <option value="Asia">Asia</option>
              <option value="Africa">Africa</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
              <option value="Americas">Americas</option>
            </select>
          </div>

          <div className="flex justify-between flex-wrap">
            {filtrandoPaises?.map((pais) => (
              <div
                className="flex justify-between m-2 gap-2 bg-blue-50 rounded-xl shadow-lg w-full lg:w-1/4"
                key={pais.name}
              >
                <img
                  className="w-2/4 p-3 block m-auto"
                  src={images[pais.name]}
                  alt={`${pais.name}`}
                />
                <div className="p-5 w-1/2" key={pais.name}>
                  <h2 className="font-bold text-blue-700">{pais.name}</h2>
                  <p>{pais.continent.name}</p>
                  <div className="p-2">
                    <button
                      className="bg-green-600 p-2 rounded-xl text-white"
                      onClick={() => handleCountryClick(pais)}
                    >
                      Ver mas
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedCountry && (
            <div className="p-5 mt-5 rounded-xl shadow-lg  bg-blue-300 w-1/2">
              <h2 className="text-xl font-bold">{selectedCountry.name}</h2>
              <p>
                <strong>Continent:</strong> {selectedCountry.continent.name}
              </p>
              <p>
                <strong>Capital:</strong> {selectedCountry.capital}
              </p>
              <p>
                <strong>Currency:</strong> {selectedCountry.currency}
              </p>
              <p>
                <strong>Native Language:</strong> {selectedCountry.native}
              </p>
              <p>
                <strong>Languages:</strong>{" "}
                {selectedCountry.languages.map((lang) => lang.name).join(", ")}
              </p>
              <p>
                <strong>Subdivisions:</strong>{" "}
                {selectedCountry.subdivisions.map((sub) => sub.name).join(", ")}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-5 p-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-slate-400 rounded-lg p-4"
        >
          Anterior
        </button>
        <span className="p-4">
          Pagina {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-slate-400 rounded-lg p-4"
        >
          Siguiente
        </button>
      </div>
    </>
  );
}

export default App;
