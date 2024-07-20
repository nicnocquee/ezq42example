export const dynamic = "force-dynamic"; // defaults to auto

export const POST = async (request: Request) => {
  const body = await request.json();
  const name = body.name;

  console.log(`Job received: ${name}`);
  const payload = {
    email: process.env.EZQ42_EMAIL,
    payload: {
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/run`,
      method: "POST",
      body: {
        name,
        date: new Date().toISOString(),
      },
    },
  };
  console.log(payload);
  const url = `${process.env.EZQ42_URL}/api/v1/job`;
  console.log(`Sending job to ${url}`);
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return new Response("ok", {
    status: 200,
  });
};
