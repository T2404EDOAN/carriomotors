import React from "react";
import logologo from "../../assets/images/Company_images/logologo.png";
import anha from "../../assets/images/Company_images/anha.webp";
import anha1 from "../../assets/images/Company_images/anha1.webp";
import anhavata1 from "../../assets/images/Company_images/anhavata1.png";
import anhavata2 from "../../assets/images/Company_images/anhavata2.png";
import anhavata3 from "../../assets/images/Company_images/anhavata3.png";
import des1 from "../../assets/images/Company_images/des1.jpg";
import des2 from "../../assets/images/Company_images/des2.jpg";
import des3 from "../../assets/images/Company_images/des3.jpg";
import box5 from "../../assets/images/Company_images/box5.jpg";
import "../../assets/styles/Company.css";

const CompanyPage = () => {
  return (
    <div className="company-main-container">
      <div className="box-company1">
        <div className="logo-company">
          <img src={logologo} alt="logo" />
        </div>
        <div className="title-copmany1">
          Transform your life with every drive
        </div>
        <div className="title-company2">
          Embodying the ideal blend of luxury, technology, and power,
          Carriomotors delivers a thrilling, sustainably designed all-electric
          line-up – including pioneering SUVs, stylish Gran Coupes, <br />
          and ultra-luxurious Sedans.
        </div>
      </div>
      <div className="box2-company">
        <div className="box-company2 k">
          <div className="list-company">
            <img src={anha} alt="anha" className="anha" />
            <img src={anha1} alt="anha1" className="a" />
          </div>
          <div className="list-company-text">
            <div className="list-company-name">bmw abc</div>
            <div className="list-company-price">Starting MSR $57,900</div>
            <div className="list-company-range">
              Range from 283 to 307 miles
            </div>
          </div>
        </div>
        <div className="box-company2 b" id="abcd">
          <div className="list-company">
            <img src={anha} alt="anha" className="anha" id="abc" />
            <img src={anha1} alt="anha1" className="a" />
          </div>
          <div className="list-company-text">
            <div className="list-company-name">bmw abc</div>
            <div className="list-company-price">Starting MSR $57,900</div>
            <div className="list-company-range">
              Range from 283 to 307 miles
            </div>
          </div>
        </div>
        <div className="box-company2 c">
          <div className="list-company">
            <img src={anha} alt="anha" className="anha" />
            <img src={anha1} alt="anha1" className="a" />
          </div>
          <div className="list-company-text">
            <div className="list-company-name">bmw abc</div>
            <div className="list-company-price">Starting MSR $57,900</div>
            <div className="list-company-range">
              Range from 283 to 307 miles
            </div>
          </div>
        </div>
        <div className="box-company2 ">
          <div className="list-company">
            <img src={anha} alt="anha" className="anha" />
            <img src={anha1} alt="anha1" className="a" />
          </div>
          <div className="list-company-text">
            <div className="list-company-name">bmw abc</div>
            <div className="list-company-price">Starting MSR $57,900</div>
            <div className="list-company-range">
              Range from 283 to 307 miles
            </div>
          </div>
        </div>
      </div>
      <div className="box-company3">
        <div className="title-company3">
          <p className="title-company3-1">OWNER'S STORIES</p>
          <p className="title-company3-2">Life, in charge.</p>
        </div>
        <div className="list-comment">
          <div className="comment1">
            <div className="avata1-comment">
              <img src={anhavata1} alt="anh avata 1" />
            </div>
            <div className="text-comment">
              Simone chose the i4 because its performance and style stood out
              from everything else on the road.
            </div>
          </div>
          <div className="comment2">
            <div className="avata2-comment">
              <img src={anhavata2} alt="anh avata 2" />
            </div>
            <div className="text-comment">
              Engineering first drew John to the i5 M60 and continues to thrill
              him and his passengers.
            </div>
          </div>
          <div className="comment3">
            <div className="avata3-comment">
              <img src={anhavata3} alt="anh avata 3" />
            </div>
            <div className="text-comment">
              Though his commute is over 100 miles, David says he never worries
              about running out of charge.
            </div>
          </div>
        </div>
      </div>
      <div className="box-company4">
        <div className="title-company4">MORE REASONS TO GO ELECTRIC</div>
        <div className="description-list">
          <div className="description-list1">
            <div className="description-img1">
              <img src={des1} alt="des1" className="des1" />
            </div>
            <div className="description-text1">
              <div className="description-text1-1">Feel like a VIP.</div>
              <div className="description-text1-2">
                Get there faster every day. You may be eligible for HOV lane
                access with a single occupant, as well as toll savings in select
                states. And you might be eligible to receive preferential
                parking while charging.
              </div>
            </div>
          </div>
          <div className="description-list2">
            <div className="description-img2">
              <img src={des2} alt="des2" className="des2" />
            </div>
            <div className="description-text2">
              <div className="description-text2-1">No more gas stations.</div>
              <div className="description-text2-2">
                Save time by charging up overnight at home with the BMW Wallbox.
                You’ll never have to stop at a gas station again
              </div>
            </div>
          </div>
          <div className="description-list3">
            <div className="description-img3">
              <img src={des3} alt="des3" />
            </div>
            <div className="description-text3">
              <div className="description-text3-1">
                And enjoy less routine maintenance.
              </div>
              <div className="description-text3-2">
                All-electric BMWs require less routine maintenance over their
                lifespan because there are fewer moving parts and fluids to
                replace. This adds up to even more time and money saved.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="box-company5">
        <div className="title-company5">
          EXPLORE THE WORLD OF BMW ELECTRIFIED
        </div>
        <div className="box5-list">
          <div className="box5-list1">
            <div className="box5-list-img">
              <img src={box5} alt="box5" />
            </div>
            <div className="box5-list-text">
              <div className="box5-list-text1">BMV charging</div>
              <div className="box5-list-text2">Learn More</div>
            </div>
          </div>
          <div className="box5-list1">
            <div className="box5-list-img">
              <img src={box5} alt="box5" />
            </div>
            <div className="box5-list-text">
              <div className="box5-list-text1">Audi charging</div>
              <div className="box5-list-text2">Learn More</div>
            </div>
          </div>
          <div className="box5-list1">
            <div className="box5-list-img">
              <img src={box5} alt="box5" />
            </div>
            <div className="box5-list-text">
              <div className="box5-list-text1">Porsche charging</div>
              <div className="box5-list-text2">Learn More</div>
            </div>
          </div>
          <div className="box5-list1">
            <div className="box5-list-img">
              <img src={box5} alt="box5" />
            </div>
            <div className="box5-list-text">
              <div className="box5-list-text1">Mec charging</div>
              <div className="box5-list-text2">Learn More</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CompanyPage;
