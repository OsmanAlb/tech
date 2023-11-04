import React, {useState, useRef, useEffect, useCallback} from "react";

const Form = () => {
    // const formRef = useRef(null);
    // const cityRef = useRef(``);
    // const [city, setCityRef] = useState(town);
    // const computed = useCallback(() => setTown(city), [city]);

    // useEffect(() => {
    //     console.log(`computed AdFrom`);
    //     computed(city);
    // }, [city]);
    // useEffect(() => {
    //     console.log(`setCityRef AdFrom`);
    //     setCityRef(town);
    // }, [town]);

    return (
        <form className={`ad-form`} method="post" encType="multipart/form-data"
              action="https://js.dump" autoComplete="off" ref={formRef}>

            <fieldset className="ad-form__element ad-form__element--wide">
                <p>{`Ваше обращение`}</p>
            </fieldset>
            <fieldset className="ad-form__element">
                <label className="ad-form__label" htmlFor="City">Город: </label>
                <select id="type" name="type" value={town}
                        onChange={() => {
                            setCityRef(cityRef.current.value);
                        }}
                        ref={cityRef}
                    // onClick={() => {
                    //   setCityRef(cityRef.current.value); // если тут не прописанть онклик то менять не будет приклике
                    // }}
                >
                    <option value="Москва">Москва</option>
                    <option value="Saint-Petersburg">Saint-Petersburg</option>
                    <option value="Екатеринбург">Екатеринбург</option>
                </select>
            </fieldset>
            <fieldset className="ad-form__element ad-form__element--submit">
                <p>Дистанция маршрута {length}</p>
                <p>Длительность маршрута {time}</p>
            </fieldset>
        </form>
    );
};

export default Form;
