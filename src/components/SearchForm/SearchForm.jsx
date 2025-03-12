import Select from "react-select";
import "./SearchForm.scss";

const SearchForm = (_) => {
  const options = [{ value: "mobin", label: "first name" }];
  const selectChangeHandle = (selected) => {
    console.log(selected);
  };
  const selectStyles = {
    control: (styles) => ({ ...styles, ...mySelectStyles }),
    option: (styles) => ({ ...styles, ...mySelectStyles }),
  };

  return (
    <form action="#" className="search-form">
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
            options={options}
            onChange={selectChangeHandle}
            className="select"
            styles={selectStyles}
          />
        </div>
        <p className="search-form__intermediary">ATÉ</p>
        <div className="search-form__column">
          <label htmlFor="" className="search-form__label">
            MOTORIZAÇÃO
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
          <label htmlFor="yearOfStart" className="search-form__label">
            ANO
          </label>
          <input
            className="search-form__input"
            type="number"
            name="yearOfStart"
            id="yearOfStart"
            placeholder="2020"
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
            type="number"
            name="kilometerStart"
            id="kilometerStart"
            placeholder="0km"
          />
        </div>
        <p className="search-form__intermediary">ATÉ</p>
        <div className="search-form__column">
          <label htmlFor="kilometerEnd" className="search-form__label">
            &nbsp;
          </label>
          <input
            className="search-form__input"
            type="number"
            name="kilometerEnd"
            id="kilometerEnd"
            placeholder="50.000km"
          />
        </div>
      </div>

      <button className="search-form__delete">Limpar</button>
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
