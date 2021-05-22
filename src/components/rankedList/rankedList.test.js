import React from "react";
import { shallow } from "enzyme";
import RankedList from "./rankedList";

describe("RankedList", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<RankedList />);
    expect(wrapper).toMatchSnapshot();
  });
});
