import React from "react";
import { shallow } from "enzyme";
import Transition from "./transition";

describe("Transition", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Transition />);
    expect(wrapper).toMatchSnapshot();
  });
});
