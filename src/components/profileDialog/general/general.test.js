import React from "react";
import { shallow } from "enzyme";
import General from "./general";

describe("General", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<General />);
    expect(wrapper).toMatchSnapshot();
  });
});
