import React from "react";
import { shallow } from "enzyme";
import QuestionArea from "./questionArea";

describe("QuestionArea", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<QuestionArea />);
    expect(wrapper).toMatchSnapshot();
  });
});
