import React from "react";
import { shallow } from "enzyme";
import QuizDetail from "./quizDetail";

describe("QuizDetail", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<QuizDetail />);
    expect(wrapper).toMatchSnapshot();
  });
});
