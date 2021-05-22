import React from "react";
import { shallow } from "enzyme";
import Footer from "./footer";

describe("Footer", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });
});
