import React from "react";
import { shallow } from "enzyme";
import PlayerResult from "./playerResult";

describe("PlayerResult", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PlayerResult />);
    expect(wrapper).toMatchSnapshot();
  });
});
