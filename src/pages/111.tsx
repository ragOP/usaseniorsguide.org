/* eslint-disable react/jsx-no-undef */
import React, { useState, useEffect } from "react";
//@ts-ignore
import TagManager from "react-gtm-module";
import axios from "axios";
import "./styles.scss";

import { scrollTo } from "../utils";

import Head_bg from "../assets/hero5.png";
import Yes from "../assets/1.svg";
import No from "../assets/2.svg";
import Headline from "../assets/headline_spandeb1.png";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

// google tag manager

const tagManagerArgs = {
  gtmId: "GTM-KZJBC3B",
};

TagManager.initialize(tagManagerArgs);

export default function Fifth_SP() {
  useEffect(() => {
    window.document.title = "Senior's Flex Program 2023";

    axios
      .get(process.env.REACT_APP_PROXY + `/visits/8`)
      .then(({ data }) => {
        if (data.length === 0) {
          const visits = {
            visits: 1,
            views: 0,
            calls: 0,
            positives: 0,
            negatives: 0,
          };

          axios
            .post(
              process.env.REACT_APP_PROXY + `/visits/create-visits8`,
              visits
            )
            .catch((err) => console.log(err));
        } else {
          const _id = data[0]._id;
          const _visits = data[0].visits;
          const _views = data[0].views;
          const _calls = data[0].calls;
          const _positives = data[0].positives;
          const _negatives = data[0].negatives;

          const visits = {
            visits: _visits + 1,
            views: _views,
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
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCall = () => {
    axios.get(process.env.REACT_APP_PROXY + `/visits/8`).then(({ data }) => {
      const _id = data[0]._id;
      const _visits = data[0].visits;
      const _views = data[0].views;
      const _calls = data[0].calls;
      const _positives = data[0].positives;
      const _negatives = data[0].negatives;
      const visits = {
        visits: _visits,
        views: _views,
        calls: _calls + 1,
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

    // Redirect to the specified URL
  };

  const [quiz, setQuiz] = useState("Are you over the age of 60?  ");
  const [step, setStep] = useState("process");
  const [min, setMin] = useState(3);
  const [second, setSecond] = useState<any>(0);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const stepProcess = () => {
    if (step === "1.Checking Your Eligibility...") {
      setTimeout(() => {
        setStep("2.You're Eligible ✅️");
      }, 1500);
    }
    if (step === "2.You're Eligible ✅️") {
      setTimeout(() => {
        setStep("3.3 Licensed Agents Available ✅️");
      }, 1500);
    }
    if (step === "3.3 Licensed Agents Available ✅️") {
      setTimeout(() => {
        setStep("4.Redirecting You Now...");
        setIsLoading(true);
      }, 1500);
    }

    if (step === "4.Redirecting You Now...") {
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
      }, 500);
    }

    if (step === "completed") {
      const startTime: any = new Date();
      const timer = setInterval(() => {
        const nowTime: any = new Date();
        setSecond((180 - Math.round((nowTime - startTime) / 1000)) % 60);
        setMin(
          Math.floor((180 - Math.round((nowTime - startTime) / 1000)) / 60)
        );
      }, 100);
    }
  };

  useEffect(() => {
    stepProcess();
  }, [step]);

  const topScroll = (id: any) => {
    scrollTo({ id });
  };

  const handleQuizP = () => {
    topScroll("btn");
    if (quiz === "Are you over the age of 60?  ") {
      setQuiz("2. Do you live in the United States?");
    } else {
      setStep("1.Checking Your Eligibility...");
      topScroll("top");
    }

    axios.get(process.env.REACT_APP_PROXY + `/visits/8`).then(({ data }) => {
      const _id = data[0]._id;
      const _visits = data[0].visits;
      const _views = data[0].views;
      const _calls = data[0].calls;
      const _positives = data[0].positives;
      const _negatives = data[0].negatives;
      const visits = {
        visits: _visits,
        views: _views,
        calls: _calls,
        positives: _positives + 1,
        negatives: _negatives,
      };
      axios
        .put(
          process.env.REACT_APP_PROXY + `/visits/update-visits8/` + _id,
          visits
        )
        .catch((err) => console.log(err));
    });
  };

  const handleQuizN = () => {
    topScroll("btn");
    if (quiz === "Are you over the age of 60?  ") {
      setQuiz("2. Do you live in the United States?");
    } else {
      setStep("1.Checking Your Eligibility...");
      topScroll("top");
    }

    axios.get(process.env.REACT_APP_PROXY + `/visits/8`).then(({ data }) => {
      const _id = data[0]._id;
      const _visits = data[0].visits;
      const _views = data[0].views;
      const _calls = data[0].calls;
      const _positives = data[0].positives;
      const _negatives = data[0].negatives;
      const visits = {
        visits: _visits,
        views: _views,
        calls: _calls,
        positives: _positives,
        negatives: _negatives + 1,
      };
      axios
        .put(
          process.env.REACT_APP_PROXY + `/visits/update-visits8/` + _id,
          visits
        )
        .catch((err) => console.log(err));
    });
  };
  useEffect(() => {
    if (step === "completed") {
      // Redirect to the specified URL when step is "completed"
      window.location.href =
        "https://policynational.com/call-vs/?c=21420&source={{value}}&pcid={{value}}";
    }
  }, [step]);

  return (
    <>
      {isLoading ? (
        <div >
          <ThreeDots
            height="80"
            width="80"
            wrapperClass="center-loader"
            radius="9"
            color="blue"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>
      ) : (
        <div>
          <div style={{ backgroundColor: "rgb(233, 242, 255)" }}>
            <div className="top-sticky-blue-test" id="top">
              <img
                src="https://cdn.convertri.com/7562552f-90c0-11ea-abef-0697e5ca793e%2F5c6aafc49fafcf3f661c18dd6c18c3b55c7d3b71%2Flogo-call-vs.svg"
                alt="Logo"
                style={{
                  width: "170px",
                  // Reduce the width by 10%
                  height: "50%", // Reduce the height by 10%
                }}
              />
            </div>
            {step === "process" ? (
              <>
                <div className="main-container-5">
                  <div className="main-descrition-5">
                    <div className="main-des-title-6-test">
                      <b>
                        Americans Over 60 Can Now Qualify For{" "}
                        <span style={{ color: "rgb(0, 74, 155)" }}>
                          The $3600 FLEX Card
                        </span>{" "}
                        In 2023. Here's How!
                      </b>
                    </div>
                    <img
                     
                      className="topic-img-middle-test"
                      src={Head_bg}
                      alt="head"
                    />
                    <div style={{ marginTop: '10px' }} className="main-des-5">
                      Americans over 60 years old can claim the 2023 Flex
                      Spending Card that gives them up to $3600. Americans can
                      use the funds to fully cover the cost of their monthly
                      expenses such as Groceries, Rent, Bills and any other
                      expenses they may have!
                    </div>
                    <div className="main-des-5" style={{ marginTop: '-10px' }}>
                      If you have not yet claimed your monthly allowance then
                      answer the questions below and once approved{" "}
                      <b>
                        you will have your $3,600 Flex Card mailed to you within
                        a few days ready for use!
                      </b>
                    </div>
                  </div>
                  <div style={{marginTop:"-8px"}} className="survey">
                    <div className="quiz-5-test" id="btn">
                      {quiz}
                    </div>
                    <div   className="answer">
                      <div
                        className="ok-test"
                        onClick={handleQuizP}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <img
                          src={Yes}
                          alt="Yes Icon"
                          style={{
                            width: "80px", // Set the width of the image
                            height: "60px", // Set the height of the image
                            marginRight: "10px", // Set the margin to the right
                          }}
                        />
                        <span
                          style={{
                            flexGrow: 1,
                            textAlign: "center",
                            marginRight: "100px",
                          }}
                        >
                          Yes
                        </span>{" "}
                        {/* Centered text */}
                      </div>
                      <div className="ok-test" onClick={handleQuizN}>
                        <img
                          src={No}
                          alt="Yes Icon"
                          style={{
                            width: "80px", // Set the width of the image
                            height: "60px", // Set the height of the image
                            marginRight: "10px", // Set the margin to the right
                          }}
                        />
                        <span
                          style={{
                            flexGrow: 1,
                            marginRight: "100px",
                            textAlign: "center",
                          }}
                        >
                          No
                        </span>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : step !== "process" && step !== "completed" ? (
              <div className="checking" style={{ fontWeight: "700" }}>
                {isLoading ? (
                  <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="red"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                ) : (
                  step
                )}
              </div>
            ) : (
              <div className="checking"></div>
            )}
            <div className="footer">
              <div className="terms">Terms & Conditions | Privacy Policy</div>
              <div className="copyright">
                Copyright © 2022 - All right reserved Daily America Savings.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
