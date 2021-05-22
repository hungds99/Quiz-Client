import React from "react";
import { shallow } from "enzyme";
import QuizCard from "./quizCard";

describe("QuizCard", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<QuizCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
