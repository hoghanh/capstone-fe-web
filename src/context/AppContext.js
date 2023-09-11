import React, { createContext, useEffect, useState } from 'react';
import { get } from 'utils/APICaller';
import { Link } from 'react-router-dom';

function getItem(key, label, children) {
  return {
    key,
    label,
    children,
  };
}

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  //   const [categories, setCategories] = useState([]);
  const [categoriesNavbar, setCategoriesNavbar] = useState([]);

  useEffect(() => {
    get({ endpoint: `/Category` })
      .then((res) => {
        // setCategories(res.data);
        setItem(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function setItem(categories) {
    let items = [];
    let itemChildren = [];
    categories?.map((category) => {
      category.subCategories?.forEach((subCategory) => {
        itemChildren.push(
          getItem(
            'subCate_' + subCategory.id,
            <Link to={`/jobs/${subCategory.id}/${subCategory.name}`}>
              {subCategory.name}
            </Link>
          )
        );
      });
      items.push(getItem('cate_' + category.id, category.name, itemChildren));
      itemChildren = [];
    });
    setCategoriesNavbar(items);
  }

  return (
    <AppContext.Provider
      value={{
        categoriesNavbar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
