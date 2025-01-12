
export function generateStaticParams() {
  return [
    { trans_id: '123' },
    { trans_id: '456' },
    { trans_id: '789' },
  ];
}

interface Params {
  trans_id: string; 
}

export default function Checkout({ params }: { params: Params }) {
  const { trans_id } = params; 

  return (
    <div>
      <h1>Checkout Success</h1>
      <p>Your transaction ID is: {trans_id}</p>
    </div>
  );
}
