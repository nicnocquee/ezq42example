export const dynamic = "force-dynamic"; // defaults to auto

export const POST = async (request: Request) => {
  const body = await request.json();
  const count = body.count || 1;
  const concurrency = body.concurrency || 1;

  const payloads = [];
  for (let i = 0; i < count; i++) {
    const name = `Name ${i}`;
    payloads.push({
      email: process.env.EZQ42_EMAIL,
      concurrency,
      payload: {
        url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/run`,
        method: "POST",
        body: {
          name,
          date: new Date().toISOString(),
        },
      },
    });
  }

  await Promise.all(
    payloads.map(async (payload) => {
      console.log(`Sending job to ${payload.payload.url}`);
      const url = `${process.env.EZQ42_URL}/api/v1/job`;
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    })
  );

  return new Response("ok", {
    status: 200,
  });
};
