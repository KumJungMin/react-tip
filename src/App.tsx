import "./styles.css";
import React from "react";
import imageCompression from "browser-image-compression";

export default function App() {
  const [url, setUrl] = React.useState();

  const onChange = async (e) => {
    if (e.target.files) {
      const reader = new FileReader();

      reader.onload = function (event) {
        setUrl(event.target.result);
      };

      const compress = await imageCompression(e.target.files[0], {
        initialQuality: 0.1
      });

      reader.readAsDataURL(compress);
      console.log("original", Math.ceil(e.target.files[0].size / 1000), "KB");
      console.log(Math.ceil(compress.size / 1000), "KB");
    }
  };

  return (
    <div className="App">
      <input onChange={onChange} type="file"></input>
      <img src={url} width={500} height={500} />
    </div>
  );
}
