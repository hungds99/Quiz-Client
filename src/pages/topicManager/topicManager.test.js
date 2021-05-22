import React from "react";
import { shallow } from "enzyme";
import TopicManager from "./topicManager";

describe("TopicManager", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<TopicManager />);
    expect(wrapper).toMatchSnapshot();
  });
});
