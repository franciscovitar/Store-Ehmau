import Navbar from "./navbar";
import getCategories from "@/actions/get-categories";

const RenderNav = async () => {
  const categories = await getCategories();
  return (
    <>
      <Navbar categories={categories} />
    </>
  );
};

export default RenderNav;
