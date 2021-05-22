import React from "react";
import { shallow } from "enzyme";
import CustomizedSnackbars from "./customizedSnackbars";

describe("CustomizedSnackbars", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CustomizedSnackbars />);
    expect(wrapper).toMatchSnapshot();
  });
});
