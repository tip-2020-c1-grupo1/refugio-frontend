import React from "react";
import { shallow, mount } from "enzyme";
import AnimalList from "./AnimalList";
import { act } from 'react-dom/test-utils';
import {getInitialsAnimals} from './AnimalsApi';
import axios from 'axios';
import { ThemeProvider } from "@material-ui/core";

describe("AnimalList", () => {
  let wrapper;
  const user = {'email' : 'someEmail'};
  let data =  {"data":{"count":1,"next":null,"previous":null, "results":[{"id":2,"name":"Ethel","description":"Es muy vago y duerme todo el día","status_request":"Disponible","specie":"Gato","race":"Dos dedos","gender":"Macho","owner":null}]},"status":200,"statusText":"OK","headers": {}}
  const emptyData = {"data":{"count":0,"next":null,"previous":null, "results":[]},"status":200,"statusText":"OK","headers": {}}
  const props = {
    user: user,
    initialSearch: jest.fn('','','').mockResolvedValue(emptyData)
  };
  let useEffect;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };

  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect();
    mockUseEffect();
    wrapper = shallow(<AnimalList {...props} />);
  });

  describe("on start", () => {

    it("does load posts", () => {
      console.log(wrapper.debug())
      expect(props.initialSearch).toHaveBeenCalled();
    });

    // it("does load posts", () => {
    //   useEffect = jest.spyOn(React, "useEffect");
    //   mockUseEffect();
    //   mockUseEffect();
    //   data = emptyData
    //   wrapper = shallow(<AnimalList {...props} />);
    //   console.log(wrapper.debug())
    //   expect(props.initialSearch).toHaveBeenCalled();
    // });

  });
});