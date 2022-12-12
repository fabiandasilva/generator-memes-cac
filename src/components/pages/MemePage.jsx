import axios from "axios";
import { useEffect, useState } from "react";

import Card from "../Card";
const objectToQueryParam = (obj) => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);

  return "?" + params.join("&");
};
const MemePage = () => {
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    //Genero un endpoint para obtener los datos de la api
    const endPoint = "https://api.imgflip.com/get_memes";

    //Utilizo axios para hacer la conexion con la api y utilizo el then para obtener la respuesta para luego acceder a la data
    axios
      .get(endPoint)
      .then((response) => {
        const apiData = response.data.data.memes;

        setTemplates(apiData);
      })
      //Utilizo cath para atrapar y mostrar los errores en caso de que no se pueda conectar con la api
      .catch((error) => {
        alert(
          "Hubo un error, estamos trabajando para solucionarlo, intente mas tarde"
        );
        // eslint-disable-next-line no-console
        console.warn(error);
      });
  }, []);

  if (meme) {
    return (
      <div style={{ textAlign: "center" }}>
        <img alt="custom meme" src={meme} style={{ width: 200 }} />
      </div>
    );
  }

  return (
    <div style={{ textAling: "center" }}>
      {template && (
        <>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              //TODO:Agregar logica para crear el meme

              const params = {
                template_id: template.id,
                text0: topText,
                text1: bottomText,
                username: "xzk03017",
                password: "xzk03017@cndps.com",
              };

              const response = await axios.get(
                `https://api.imgflip.com/caption_image${objectToQueryParam(
                  params
                )}`
              );
              const json = await response.json();

              setMeme(json.data.url);
            }}
          >
            <Card template={template} />
            <input
              placeholder="Ingresa tu primera frase"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
            />
            <input
              placeholder="Ingresa tu segunda frase"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
            />
            <button type="button">Generar meme</button>
          </form>
        </>
      )}
      {!template && (
        <>
          <h1>Seleccioná tu meme</h1>
          {templates.map((template) => {
            return (
              <Card
                key={template.id}
                template={template}
                onClick={() => {
                  setTemplate(template);
                }}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default MemePage;
