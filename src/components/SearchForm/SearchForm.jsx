import Select from "react-select";
import "./SearchForm.scss";
import { useState } from "react";

const SearchForm = ({ cars, submitSearchHandle }) => {
  const options = [{ value: "mobin", label: "first name" }];

  // const motorsArr = [...new Set(cars.map(car => car.motor))]

  const armoredOptions = [{ value: "bullet", label: "Bullet Proof" }];
  const motorOptions = [{ value: "2.0L Turbo", label: "2.0L Turbo" }];

  const selectChangeHandle = (selected) => {
    console.log(selected);
  };
  const selectStyles = {
    control: (styles) => ({ ...styles, ...mySelectStyles }),
    option: (styles) => ({ ...styles, ...mySelectStyles }),
  };

  // Form Input states
  const [armored, setArmored] = useState();
  const [motor, setMotor] = useState();
  const [year, setYear] = useState({ start: "2020", end: "2025" });
  const [value, setValue] = useState({ start: "10", end: "200000" });
  const [kilometer, setKilometer] = useState({ start: "", end: "" });

  return (
    <form
      action="#"
      className="search-form"
      onSubmit={submitSearchHandle.bind(this, year, value, kilometer)}
    >
      <div className="search-form__row">
        <div className="search-form__column">
          <label htmlFor="" className="search-form__label">
            MARCAS
          </label>
          <Select
            placeholder="Todas"
            options={options}
            onChange={selectChangeHandle}
            className="select"
            styles={selectStyles}
          />
        </div>
        <div className="search-form__column">
          <label htmlFor="" className="search-form__label">
            MODELOS
          </label>
          <Select
            placeholder="Todas"
            options={options}
            onChange={selectChangeHandle}
            className="select"
            styles={selectStyles}
          />
        </div>
      </div>

      <div className="search-form__row">
        <div className="search-form__column">
          <label htmlFor="" className="search-form__label">
            BLINDADO
          </label>
          <Select
            placeholder="Todas"
            options={armoredOptions}
            onChange={selectChangeHandle}
            className="select"
            styles={selectStyles}
          />
        </div>
        <div className="search-form__column">
          <label htmlFor="" className="search-form__label">
            MOTORIZAÇÃO
          </label>
          <Select
            placeholder="Todas"
            options={motorOptions}
            onChange={selectChangeHandle}
            className="select"
            styles={selectStyles}
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
            value={value.start}
            onChange={(e) => setValue({ ...value, start: e.target.value })}
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
            value={value.end}
            onChange={(e) => setValue({ ...value, end: e.target.value })}
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
    </form>
  );
};

const mySelectStyles = {
  width: "100%",
  borderRadius: ".8rem",
  cursor: "pointer",
};

export default SearchForm;
