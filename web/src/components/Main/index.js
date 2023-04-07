import { useState, useMemo } from "react";

import iconFilter from "../../images/icon-filter.svg";

import Card from "../Card/index";
import cars from "../../data/cars";

import "./style.css";

const Main = () => {
  const [search, setSearch] = useState("");
  const [marca, setMarca] = useState("");

  const icons = [
    {
      url: "https://cdn-icons-png.flaticon.com/512/1828/1828817.png",
      alt: "Add Icon",
    },
    {
      url: "https://media.gettyimages.com/id/1472045974/vector/connected-car-icon-on-blue-background-flat-design-with-long-shadow.jpg?s=2048x2048&w=gi&k=20&c=GwbBeErwzeeTIq9DaAq7liCZoItcLJW0WzGtjBIzPWo=",
      alt: "Car Blue Icon",
    },
    {
      url: "https://t4.ftcdn.net/jpg/03/47/02/07/360_F_347020741_nyLd4OY6Yx8anx0MXbJGc7Rb5EsKMVY0.jpg",
      alt: "Blue Bike Icon",
    },
    {
      url: "https://cdn.create.vista.com/api/media/medium/338919118/stock-vector-truck-icon-for-web-and?token=",
      alt: "Blue Truck Icon",
    },
  ];

  const filteredCars = useMemo(() => {
    return cars.filter(({ title }) =>
      title.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [search]);

  const filteredCarBrand = useMemo(() => {
    if (marca === "all") return filteredCars;
    return filteredCars.filter(({ brand }) =>
      brand.toLowerCase().includes(marca.trim().toLowerCase())
    );
  }, [filteredCars, marca]);

  return (
    <main>
      <section className="main-header">
        <div className="row">
          <section className="search-container">
            <input
              className="input-search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Digite a marca ou o modelo"
            />
            <img src={iconFilter} className="filter-icon" alt="Filter Icon" />
            <div className="select">
              <select
                className="filter-select"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
              >
                <option value="all">FILTRAR MARCA</option>
                {Array.from(new Set(filteredCars.map((c) => c.brand))).map(
                  (brand) => (
                    <option key={brand} value={brand}>
                      {brand.toUpperCase()}
                    </option>
                  )
                )}
              </select>
            </div>
          </section>
        </div>
        <div className="row">
          <h1>Veículos</h1>
          <div className="icons">
            {icons.map(({ url, alt }, index) => {
              return <img key={index} src={url} className="icon" alt={alt} />;
            })}
          </div>
        </div>
        <div>
          <hr className="hr-min" />
        </div>
        <div>
          <hr className="hr-full" />
        </div>
      </section>
      <section className="card-container">
        {filteredCarBrand.map(
          ({ images, price, title, author, year, km, fuel, id }) => {
            return (
              <Card
                link={images}
                price={price}
                title={title}
                author={author}
                year={year}
                km={km}
                fuel={fuel}
                key={id}
                id={id}
              />
            );
          }
        )}
      </section>
    </main>
  );
};

export default Main;
