import axios from "axios";

const KEY_PIXABAY = "46000687-ca1b88c23c48dbf3a9ce5f988";

const BuscadorImagen=async(countryName:string)=>{
    try{
        const response = await axios.get("https://pixabay.com/api/", {
          params: {
            key: KEY_PIXABAY,
            q:`${countryName} bandera`,
            image_type: "photo",
            lang:"es",
            per_page: 20,
          },
        });
        console.log(response.data);

        if (response.data.hits.length>0) {
            return response.data.hits[0]?.webformatURL;
        }else{
            console.warn("No se encontraron imagenes para:",countryName);
            return null;
        }

    }catch (error){
        console.log("Error al buscar la image de pixabay",error);
        return null;
    }
}

export default BuscadorImagen;

