export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=30");
      const data = await response.json();
      return Response.json({
        success: true,
        productCount: data.products?.length,
        ids: data.products?.map(p => p.id) || [],
        firstProduct: data.products?.[0],
      });
    } catch (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }

  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    return Response.json({ success: response.ok, data });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
