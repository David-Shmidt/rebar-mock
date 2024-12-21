import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  productName: string;
  price: number;
  ingredients: string[];
  image: string;
}

function ProductsPage() {
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get<Product[]>("https://localhost:7167/api/Product")
      .then((response) => handleImages(response.data));
  }, []);

  const handleImages = (list: Product[]) => {
    const listWithImages = list.map((item: Product) => ({
      ...item,
      image: `data:image/png;base64,${item.image}`,
    }));
    setProductList(listWithImages);
  };

  return (
    <>
      {productList.map((product) => (
        <div key={product.id} className="container-fluid">
          <div className="row justify-content-end">
            <div className="col-2 text-left">
              <div className="row">
                <h3>{product.productName}</h3>
              </div>
              <div className="row">
                <p>
                  {product.ingredients.map((item) => item.toString()).join(",")}
                </p>
              </div>
            </div>

            <div className="col-2">
              {" "}
              <img width={144} height={154} src={product.image} alt="" />
            </div>
          </div>

          <hr></hr>
        </div>
      ))}
    </>
  );
}

export default ProductsPage;
