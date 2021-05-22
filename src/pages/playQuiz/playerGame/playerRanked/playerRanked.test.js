import React from "react";
import { shallow } from "enzyme";
import PlayerRanked from "./playerRanked";

describe("PlayerRanked", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PlayerRanked />);
    expect(wrapper).toMatchSnapshot();
  });
});
