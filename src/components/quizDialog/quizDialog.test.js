import React from "react";
import { shallow } from "enzyme";
import QuizDialog from "./quizDialog";

describe("QuizDialog", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<QuizDialog />);
    expect(wrapper).toMatchSnapshot();
  });
});
