import React from "react";
import { shallow } from "enzyme";
import PreArrow from "./preArrow";

describe("PreArrow", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PreArrow />);
    expect(wrapper).toMatchSnapshot();
  });
});
