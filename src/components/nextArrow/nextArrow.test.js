import React from "react";
import { shallow } from "enzyme";
import NextArrow from "./nextArrow";

describe("NextArrow", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<NextArrow />);
    expect(wrapper).toMatchSnapshot();
  });
});
