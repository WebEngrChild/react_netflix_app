import { useState } from "react";
import "./Nav.scss";

export const Nav = () => {
  //showのデフォルト値にはfalseが入っている
  const [show, setShow] = useState(false);
  //スクロールの値に合わせてNav-blackを出し分けるための真偽値を設定
  const handleShow = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  
  //スクロールに反応するイベントを設定 → イベントはこのタブに設定される
  window.addEventListener("scroll", handleShow);

  return (
    //条件に合わせてナビバーを設定
    <div className={`Nav ${show && "Nav-black"}`}>
      <img
        className="Nav-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />
      <img
        className="Nav-avater"
        src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
        alt="Avatar"
      />
    </div>
  );
};