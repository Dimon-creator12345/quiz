import { useEffect, useState } from "react";
import Quiz from "../Quiz/Quiz.jsx";
import "./Main.css";

function Main() {
  let [data, setData] = useState([]);
  let [dataCategory,setCategory] =useState([]);
  let [access,setAccess]=useState(false);
  useEffect(() => {
    async function fetchQuiz() {
      let result = await fetch("http://localhost:3000/all-quiz");
      let data = await result.json();
      setData(data);
    }
    fetchQuiz();
  }, []);
  function renderCategory(category) {
    if(category==='Все'){
setCategory([]);
    }
    else{let newdata=data.filter((dataCategory,index)=>dataCategory.category===category);
    setCategory([...newdata]);}
  }
  return (
    <main className="main">
      <section className="section_quiz">
        <h1 className="section_quiz__header">Тесты онлайн</h1>
        {dataCategory.length ? <p className="section_quiz__text">{dataCategory[0].category}</p>: undefined}
        <div className="section_quiz__quiz_category">
          <p className="section_quiz__quiz_category__text">Категория</p>
          <i className="fas fa-angle-down section_quiz__quiz_category__arrows_down"></i>
          <div className="section_quiz__quiz_category__choose">
          <div
              onClick={() => {
                renderCategory("Все");
              }}
              className="section_quiz__quiz_category__choose__item section_quiz__quiz_category__choose__item1"
            >
              Все
            </div>
            <div
              onClick={() => {
                renderCategory("Межличностные отношения");
              }}
              className="section_quiz__quiz_category__choose__item section_quiz__quiz_category__choose__item1"
            >
              Личность и характер
            </div>
            <div
              onClick={() => {
                renderCategory("Характер и личность");
              }}
              className="section_quiz__quiz_category__choose__item section_quiz__quiz_category__choose__item2"
            >
              Межличностные отношения
            </div>
            <div
              onClick={() => {
                renderCategory("Интеллектуальные");
              }}
              className="section_quiz__quiz_category__choose__item section_quiz__quiz_category__choose__item3"
            >
              Интеллектуальные
            </div>
          </div>
        </div>
        <div className="wrapper_card">
          {dataCategory.length? dataCategory.map((item,index)=>{
              return (
                <div onClick={()=>{setAccess(item)}} className="wrapper_card__Quiz" key={index}>
                  <img alt="Avatar" className="wrapper_card__Quiz__img" src={item.img} />
                  <p className="wrapper_card__Quiz__text">{item.header}</p>
                </div>
              );
            }) : data.map((item, index) => {
              return (
                <div onClick={()=>{setAccess(item)}} className="wrapper_card__Quiz" key={index}>
                  <img alt="Avatar" className="wrapper_card__Quiz__img" src={item.img} />
                  <p className="wrapper_card__Quiz__text">{item.header}</p>
                </div>
              );
            })}
        </div>
        {access ? <Quiz set={{setAccess}} props={access}/> :undefined}
      </section>
    </main>
  );
}

export default Main;
