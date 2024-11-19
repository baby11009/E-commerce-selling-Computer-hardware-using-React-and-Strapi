
import Cookies from 'js-cookie'


export const getToken = (name) => {
  return Cookies.get(name);
};

export const setToken = (name,token,isRemember) => {
  let date ;
  if(isRemember) {
    date = 30;
  } else {
    date = 7;
  }
  Cookies.set(name,token,{
    expires: 30,
    path: ''
  })
};

export const removeToken = (name) => {
  Cookies.remove(name)
};
