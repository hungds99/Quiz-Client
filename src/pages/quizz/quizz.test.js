import React from "react";
import { shallow } from "enzyme";
import Quizz from "./quizz";

describe("Quizz", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Quizz />);
    expect(wrapper).toMatchSnapshot();
  });
});
