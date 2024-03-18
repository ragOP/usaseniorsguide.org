import React, { useState, useEffect } from "react";
//@ts-ignore
import TagManager from "react-gtm-module";
import axios from "axios";
import "./styles.scss";

import { scrollTo } from "../utils";

import Head_bg from "../assets/hero5.png";
import Headline from "../assets/headline_spandeb1.png";

// google tag manager

const tagManagerArgs = {
  gtmId: "GTM-KZJBC3B",
};

TagManager.initialize(tagManagerArgs);

export default function Ip() {
  const [zipCode, setZipCode] = useState("");

  useEffect(() => {
    window.document.title = "Senior's Allowance Program 2024";
  }, []);

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        console.log('response',response.data);
        setZipCode(response.data.postal);
      } catch (error) {
        console.error("Error fetching user location:", error);
      }
    };

    fetchUserLocation();
  }, []);

  const handleCall = () => {};

  const [quiz, setQuiz] = useState("Are you over the age of 64?  ");
  const [step, setStep] = useState("process");
  const [min, setMin] = useState(3);
  const [second, setSecond] = useState(0);
  const [yes, setYes] = useState("YES, I'M 65 OR OLDER");
  const [no, setNo] = useState("NO, I'M 64 OR YOUNGER");

  const stepProcess = () => {
    if (step === "Reviewing Your Answers...") {
      setTimeout(() => {
        setStep("Matching With Best Options...");
      }, 1500);
    }
    if (step === "Matching With Best Options...") {
      setTimeout(() => {
        setStep("Confirming Eligibility...");
      }, 1500);
    }
    if (step === "Confirming Eligibility...") {
      setTimeout(() => {
        setStep("completed");

        axios
          .get(process.env.REACT_APP_PROXY + `/visits/8`)
          .then(({ data }) => {
            const _id = data[0]._id;
            const _visits = data[0].visits;
            const _views = data[0].views;
            const _calls = data[0].calls;
            const _positives = data[0].positives;
            const _negatives = data[0].negatives;
            const visits = {
              visits: _visits,
              views: _views + 1,
              calls: _calls,
              positives: _positives,
              negatives: _negatives,
            };
            axios
              .put(
                process.env.REACT_APP_PROXY + `/visits/update-visits8/` + _id,
                visits
              )
              .catch((err) => console.log(err));
          });
      }, 1500);
    }

    if (step === "completed") {
      const startTime = new Date();
      const timer = setInterval(() => {
        const nowTime = new Date();
        setSecond((180 - Math.round((nowTime - startTime) / 1000)) % 60);
        setMin(
          Math.floor((180 - Math.round((nowTime - startTime) / 1000)) / 60)
        );
      }, 1000);
    }
  };

  useEffect(() => {
    stepProcess();
  }, [step]);

  const topScroll = (id) => {
    scrollTo({ id });
  };

  const handleQuizP = () => {
    topScroll("btn");
    if (quiz === "Are you over the age of 64?  ") {
      setYes("Yes");
      setNo("No");
      setQuiz("2. Do you live in the United States?");
    } else {
      setStep("Reviewing Your Answers...");

      topScroll("top");
    }
  };

  const handleQuizN = () => {
    topScroll("btn");
    if (quiz === "Are you over the age of 60?  ") {
      setYes("Yes");
      setNo("No");
      setQuiz("2. Do you live in the United States?");
    } else {
      setStep("Reviewing Your Answers...");

      topScroll("top");
    }
  };

  return (
    <div>
      <div
        style={{ marginBottom: "4px" }}
        className="top-sticky-blue-test2"
        id="top"
      >
        Senior's Allowance Program 2024
      </div>
      {step === "process" ? (
        <>
          <div className="main-container-5">
            <div className="main-descrition-5-5">
              <div className="main-des-title-6-7">
                <b>
                  Americans Over 65 Can Now Qualify For The $3600 Grocery
                  Allownace in 2024!
                </b>
              </div>
              {/* <img className='topic-img-larger' src = {Headline} alt = "head"/> */}
              <img className="topic-img-middle-z" src={Head_bg} alt="head" />
              <div style={{ marginTop: "14px" }} className="main-des-5">
                Americans over 65 years old can claim the 2024 Grocery Allowance
                Card that gives them up to $3600. Americans can use the funds to
                fully cover their Groceries, Medicines, etc. at Walmart and
                thousands of other participating stores!
              </div>
              <div className="main-des-5" style={{ marginTop: "-5px" }}>
                If you have not yet claimed your monthly allowance then answer
                the questions below and once approved{" "}
                <b>
                  you will have your $3,600 Grocery Allowance mailed to you
                  within a few days ready for use!
                </b>
              </div>
              {/* <div className='main-des-5' style = {{marginTop:"1rem"}}><b>Simplemente responda las siguientes preguntas:</b></div> */}
            </div>
            <div style={{ marginTop: "-5px" }} className="survey">
              <div className="quiz-5" id="btn">
                {quiz}
              </div>
              <div className="answer">
                <div className="answer-btn-5" onClick={handleQuizP}>
                  {yes}
                </div>
                <div className="answer-btn-5" onClick={handleQuizN}>
                  {no}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : step !== "process" && step !== "completed" ? (
        <div className="checking" style={{ fontWeight: "700" }}>
          {step}
        </div>
      ) : (
        <div className="checking">
          <div className="congrats">Congratulation, You Qualify!</div>
          <div className="top-description-5">
            Make A <b>Quick Call</b> To Claim Your Grocery Allowance!
          </div>
          <div className="spots-count">Spots remaining: 4</div>
          <div className="tap-direction">👇 TAP BELOW TO CALL 👇</div>
          <a href="tel:+18446720874">
            <div className="call-btn" onClick={handleCall}>
              CALL (844) 672-0874
            </div>
          </a>
          <div className="sub-title">We Have Reserved Your Spot</div>
          <div className="sub-description">
            Due to high call volume, your official agent is waiting for only{" "}
            <b>3 minutes</b>, then your spot will not be reserved.
          </div>
          <div className="timer">
            <div className="timer-cell">{min}</div>
            <div className="timer-cell">:</div>
            <div className="timer-cell">{second}</div>
          </div>
        </div>
      )}
      <div className="footer">
        <div className="terms">Terms & Conditions | Privacy Policy</div>
        <div className="copyright">
          Copyright © 2024 - All right reserved Daily America Savings.
        </div>
        <p>Test-{zipCode} </p>
      </div>
    </div>
  );
}
