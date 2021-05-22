import React from "react";
import { shallow } from "enzyme";
import Explore from "./explore";

describe("Explore", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Explore />);
    expect(wrapper).toMatchSnapshot();
  });
});
