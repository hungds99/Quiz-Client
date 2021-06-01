import React from "react";
import { shallow } from "enzyme";
import JoinHistory from "./joinHistory";

describe("JoinHistory", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<JoinHistory />);
    expect(wrapper).toMatchSnapshot();
  });
});
