import React from "react";
import { shallow } from "enzyme";
import PlayerGame from "./playerGame";

describe("PlayerGame", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PlayerGame />);
    expect(wrapper).toMatchSnapshot();
  });
});
