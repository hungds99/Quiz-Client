import React from "react";
import { shallow } from "enzyme";
import QuizResultDialog from "./quizResultDialog";

describe("QuizResultDialog", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<QuizResultDialog />);
    expect(wrapper).toMatchSnapshot();
  });
});
