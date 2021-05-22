import React from "react";
import { shallow } from "enzyme";
import QuizCardInfo from "./quizCardInfo";

describe("QuizCardInfo", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<QuizCardInfo />);
    expect(wrapper).toMatchSnapshot();
  });
});
