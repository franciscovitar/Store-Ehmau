import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import Contacto from "@/components/Contacto";
import Imagen1 from "@/components/imagen1";
import Nosotros from "@/components/nosotros";

import "./page.scss";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({});

  return (
    <div className="">
      <Container>
        <div className="image-container  p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
          <div className="featured  rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover">
            <p>EXPLORA NUESTROS PRODUCTOS DESTACADOS!</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Destacados" items={products} />
        </div>
      </Container>
      <Imagen1></Imagen1>
      <Nosotros />
      <Contacto />
    </div>
  );
};

export default HomePage;
