import React, { useEffect } from 'react';
import { Menu, Row, Col } from 'antd';
import navbar from 'styles/navbar';
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';

import { get } from 'utils/APICaller';
import { categoriesNavbarState } from 'recoil/atom';

function getItem(key, label, children) {
  return {
    key,
    label,
    children,
  };
}

const Navbar = () => {
  const [categoriesNavbar, setCategoriesNavbar] = useRecoilState(
    categoriesNavbarState
  );

  useEffect(() => {
    get({ endpoint: `/Category` })
      .then((res) => {
        setCategoriesNavbar(generateCategoriesNavbar(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function generateCategoriesNavbar(categories) {
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
    return items;
  }
  return (
    <Row>
      <Col xs={0} md={0} xl={24}>
        <Menu mode='horizontal' items={categoriesNavbar} style={navbar.menu} />
      </Col>
    </Row>
  );
};

export default Navbar;
