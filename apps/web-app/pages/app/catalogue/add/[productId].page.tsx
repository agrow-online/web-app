import { NextPage } from 'next';
import { useRouter } from 'next/router';

const AddToInventoryPage: NextPage = () => {
  const router = useRouter();
  const { productId } = router.query;

  console.log(productId);
  return <div>ki</div>;
};

export default AddToInventoryPage;
