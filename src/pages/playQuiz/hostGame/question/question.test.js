import React from "react";
import { shallow } from "enzyme";
import Question from "./question";

describe("Question", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Question />);
    expect(wrapper).toMatchSnapshot();
  });
});
