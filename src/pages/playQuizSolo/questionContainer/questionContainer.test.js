import React from "react";
import { shallow } from "enzyme";
import QuestionContainer from "./questionContainer";

describe("QuestionContainer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<QuestionContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
