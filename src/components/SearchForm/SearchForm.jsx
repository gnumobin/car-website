import "./SearchForm.scss";
import { useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";

const SearchForm = ({
  year,
  setYear,
  price,
  setPrice,
  kilometer,
  setKilometer,
  submitManager,
  setSubmitManager,
  cars,
}) => {
  const motorSelect = createNewArray(cars.items, "motor");
  const brandSelect = createNewArray(cars.items, "make");
  const modelSelect = createNewArray(cars.items, "name");

  return (
    <form
      action="#"
      className="search-form"
      onSubmit={(e) =>
        submitSearchHandle(
          e,
          year,
          price,
          kilometer,
          submitManager,
          setSubmitManager,
          toast
        )
      }
    >
      <div className="search-form__row">
        <div className="search-form__column">
          <label htmlFor="marcas" className="search-form__label">
            MARCAS
          </label>
          <select name="marcas" id="marcas" className="search-form__select">
            <option value="" className="search-form__choose">
              Choose
            </option>
            {brandSelect.map((brand, i) => (
              <option key={i} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <ExpandMore
            className="search-form__icon"
            sx={chevronBottomIconStyle}
          />
        </div>
        <div className="search-form__column">
          <label htmlFor="modelos" className="search-form__label">
            MODELOS
          </label>
          <select name="modelos" id="modelos" className="search-form__select">
            <option value="" className="search-form__choose">
              Choose
            </option>
            {modelSelect.map((model, i) => (
              <option key={i} value={model}>
                {model}
              </option>
            ))}
          </select>
          <ExpandMore
            className="search-form__icon"
            sx={chevronBottomIconStyle}
          />
        </div>
      </div>

      <div className="search-form__row">
        <div className="search-form__column">
          <label htmlFor="blindado" className="search-form__label">
            BLINDADO
          </label>
          <select name="blindao" id="blindado" className="search-form__select">
            <option value="" className="search-form__choose">
              Choose
            </option>
            <option value="all">All</option>
            <option value="bullet-proof">Bullet Proof</option>
          </select>
          <ExpandMore
            className="search-form__icon"
            sx={chevronBottomIconStyle}
          />
        </div>
        <div className="search-form__column">
          <label htmlFor="motor" className="search-form__label">
            MOTORIZAÇÃO
          </label>
          <select name="motor" id="motor" className="search-form__select">
            <option value="" className="search-form__choose">
              Choose
            </option>
            {motorSelect.map((motor, i) => (
              <option key={i} value={motor}>
                {motor}
              </option>
            ))}
          </select>
          <ExpandMore
            className="search-form__icon"
            sx={chevronBottomIconStyle}
          />
        </div>
      </div>

      <div className="search-form__row">
        <div className="search-form__column">
          <label htmlFor="yearOfStart" className="search-form__label">
            ANO
          </label>
          <input
            className="search-form__input"
            type="number"
            name="yearOfStart"
            id="yearOfStart"
            placeholder="2020"
            value={year.start}
            onChange={(e) => setYear({ ...year, start: e.target.value })}
          />
        </div>
        <p className="search-form__intermediary">ATÉ</p>
        <div className="search-form__column">
          <label htmlFor="yearOfEnd" className="search-form__label">
            &nbsp;
          </label>
          <input
            className="search-form__input"
            type="number"
            name="yearOfEnd"
            id="yearOfEnd"
            placeholder="2025"
            value={year.end}
            onChange={(e) => setYear({ ...year, end: e.target.value })}
          />
        </div>
      </div>

      <div className="search-form__row">
        <div className="search-form__column">
          <label htmlFor="priceEnd" className="search-form__label">
            VALOR
          </label>
          <input
            className="search-form__input"
            type="number"
            name="priceEnd"
            id="priceEnd"
            placeholder="100.000"
            value={price.start}
            onChange={(e) => setPrice({ ...price, start: e.target.value })}
          />
        </div>
        <p className="search-form__intermediary">ATÉ</p>
        <div className="search-form__column">
          <label htmlFor="priceStart" className="search-form__label">
            &nbsp;
          </label>
          <input
            className="search-form__input"
            type="number"
            name="priceStart"
            id="priceStart"
            placeholder="4.250.000"
            value={price.end}
            onChange={(e) => setPrice({ ...price, end: e.target.value })}
          />
        </div>
      </div>

      <div className="search-form__row">
        <div className="search-form__column">
          <label htmlFor="kilometerStart" className="search-form__label">
            QUILOMETRAGEM
          </label>
          <input
            className="search-form__input"
            type="text"
            name="kilometerStart"
            id="kilometerStart"
            placeholder="0km"
            value={kilometer.start}
            onChange={(e) =>
              setKilometer({ ...kilometer, start: e.target.value })
            }
          />
        </div>
        <p className="search-form__intermediary">ATÉ</p>
        <div className="search-form__column">
          <label htmlFor="kilometerEnd" className="search-form__label">
            &nbsp;
          </label>
          <input
            className="search-form__input"
            type="text"
            name="kilometerEnd"
            id="kilometerEnd"
            placeholder="50.000km"
            value={kilometer.end}
            onChange={(e) =>
              setKilometer({ ...kilometer, end: e.target.value })
            }
          />
        </div>
      </div>

      <button className="search-form__delete" type="reset">
        Limpar
      </button>
      <button className="search-form__submit">Filtrar</button>
      <ToastContainer />
    </form>
  );
};

const submitSearchHandle = (
  e,
  year,
  price,
  kilometer,
  submitManager,
  setSubmitManager,
  toast
) => {
  e.preventDefault();

  if (
    !(
      year.start &&
      year.end &&
      price.start &&
      price.end &&
      kilometer.start &&
      kilometer.end
    )
  ) {
    toast.error('Please fill all fileds');
  } else {
    setSubmitManager(!submitManager);
  }
};

const createNewArray = (cars, duty) => {
  return [...new Set(cars.map((car) => car[duty]))];
};

const chevronBottomIconStyle = {
  fontSize: "1.8rem",
  color: "rgba(0,0,0,.3)",
};

export default SearchForm;
