import React from "react";
import { shallow, mount } from "enzyme";
import AnimalList from "./AnimalList";
import { act } from 'react-dom/test-utils';
import {getInitialsAnimals} from './AnimalsApi';
import axios from 'axios';
import { ThemeProvider } from "@material-ui/core";

describe("AnimalList", () => {
  let props;
  let wrapper;

  // const posts = []

  const data =  {"data":{"count":1,"next":null,"previous":null, "results":[{"id":2,"name":"Ethel","description":"Es muy vago y duerme todo el día","status_request":"Disponible","specie":"Gato","race":"Dos dedos","gender":"Macho","owner":null}]},"status":200,"statusText":"OK","headers": {}}
  const user = {'email' : 'someEmail'};

  describe("on start", () => {

    it("does load posts", () => {
      // const data = []

      props = {
        user: user,
        // initialSearch: axios.get.mockImplementationOnce(() => Promise.resolve(data))
        initialSearch: jest.fn('','','').mockResolvedValue(data)
      };
      wrapper = shallow(<AnimalList {...props} />);
      console.log(wrapper.debug())
      wrapper.update()
      const element = wrapper.find('.container')
      console.log(wrapper.debug())
      console.log(element.debug())
      expect(props.initialSearch).toHaveBeenCalled();
    });

    // it("renders the authors", () => {
    //   wrapper.debug();
    //   expect(wrapper.find("Author")).toHaveLength(2);

    //   const firstAuthor = wrapper.find("Author").first();

    //   expect(firstAuthor.prop("author")).toEqual(alice);
    //   expect(firstAuthor.prop("activeAuthor")).toEqual(null);
    // });
  });
});