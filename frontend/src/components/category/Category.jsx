import { useTranslation } from "react-i18next";
import SEARCH from "../../assets/img/search.png";
import "./Category.css"
import { useState } from "react";

const Category = ({setActiveCat, setActiveInput}) => {
    const { t } = useTranslation();
    const [typedInput, setTypedInput] = useState(null);

     function submitHandler(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());

        setActiveInput(data.searchInput);
    }

    return (<div className="select-box">

        <h2>{t("select.title1")}</h2>
        <form className="select-form" onSubmit={submitHandler}>
            <input id="searchInput" name="searchInput" placeholder="..." />
            <button type="submit" />
        </form>
        <h2>{t("select.title2")}</h2>
        <select onChange={(e)=>setActiveCat(e.target.value)} className="select-option">
            <option>note</option>
            <option>album</option>
            <option>artiste</option>
            <option>titre</option>
        </select>
    </div>);
};
export default Category;
