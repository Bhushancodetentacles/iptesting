import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard';
import ChainList from '../pages/chain/ChainList';
import AddChain from '../pages/chain/AddChain';
import EditChain from '../pages/chain/EditChain';
import AddCategory from '../pages/category/AddCategory'
import EditCategory from '../pages/category/EditCategory'
import CategoryList from '../pages/category/CategoryList'
import Addsubcategory from '../pages/category/Addsubcategory'
import EditSubcategory from '../pages/category/EditSubcategory'
import SubcategoryList from '../pages/category/SubcategoryList'
import AddTip from '../pages/tip/AddTip'
import EditTip from '../pages/tip/EditTip'
import TipList from '../pages/tip/TipList'
import TagList from '../pages/tag/TagList'
import AddTag from '../pages/tag/AddTag'
import EditTag from '../pages/tag/EditTag'
import AddProject from '../pages/project/AddProject'
import EditProject from '../pages/project/EditProject'
import ProjectList from '../pages/project/ProjectList'




const LoginRedirect = () => {
  const isAuthenticated = localStorage.getItem("token") !== null || false;
  // const isAuthenticated = true
  return !isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};



function ProtectedRoute() {

  return (
    <Routes >
      <Route path="/" element={<Outlet />}>
        <Route path="/dashboard" element={<LoginRedirect />}>
          <Route index element={<Dashboard />} />
        </Route>

        <Route path="/chain-list" element={<LoginRedirect />}>
          <Route index element={<ChainList />} />
        </Route>
        <Route path="/add-chain" element={<LoginRedirect />}>
          <Route index element={<AddChain />} />
        </Route>
        <Route path="/edit-chain/:id" element={<LoginRedirect />}>
          <Route index element={<EditChain />} />
        </Route>
        <Route path="/category-list" element={<LoginRedirect />}>
          <Route index element={<CategoryList />} />
        </Route>

        <Route path="/add-category" element={<LoginRedirect />}>
          <Route index element={<AddCategory />} />
        </Route>

        <Route path="/edit-category/:categoryId" element={<LoginRedirect />}>
          <Route index element={<EditCategory />} />
        </Route>
        <Route path="/sub-category" element={<LoginRedirect />}>
          <Route index element={<SubcategoryList />} />
        </Route>
        <Route path="/add-subcategory" element={<LoginRedirect />}>
          <Route index element={<Addsubcategory />} />
        </Route>
        <Route path="/edit-subcategory/:subCategoryId" element={<LoginRedirect />}>
          <Route index element={<EditSubcategory />} />
        </Route>
        <Route path="/tip-list" element={<LoginRedirect />}>
          <Route index element={<TipList />} />
        </Route>
        <Route path="/tag-list" element={<LoginRedirect />}>
          <Route index element={<TagList />} />
        </Route>
        <Route path="/add-tag" element={<LoginRedirect />}>
          <Route index element={<AddTag />} />
        </Route>
        <Route path="/edit-tag/:tagsId" element={<LoginRedirect />}>
          <Route index element={<EditTag />} />
        </Route>
        <Route path="/add-tip" element={<LoginRedirect />}>
          <Route index element={<AddTip />} />
        </Route>
        <Route path="/edit-tip" element={<LoginRedirect />}>
          <Route index element={<EditTip />} />
        </Route>
        <Route path="/project-list" element={<LoginRedirect />}>
          <Route index element={<ProjectList />} />
        </Route>
        <Route path="/add-project" element={<LoginRedirect />}>
          <Route index element={<AddProject />} />
        </Route>
        <Route path="/edit-project/:projectId" element={<LoginRedirect />}>
          <Route index element={<EditProject />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default ProtectedRoute;
