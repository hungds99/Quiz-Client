import React from "react";
import { shallow } from "enzyme";
import PlayQuizSolo from "./playQuizSolo";

describe("PlayQuizSolo", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PlayQuizSolo />);
    expect(wrapper).toMatchSnapshot();
  });
});
