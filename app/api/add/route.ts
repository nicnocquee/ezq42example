export const dynamic = "force-dynamic"; // defaults to auto

export const POST = async (request: Request) => {
  const body = await request.json();
  const count = body.count || 1;
  const namePrefix = body.name || "Name";
  const delay = body.delay || 10000;
  const concurrency = body.concurrency || 1;

  const payloads = [];
  for (let i = 0; i < count; i++) {
    const name = `${namePrefix} ${i}`;
    payloads.push({
      email: process.env.EZQ42_EMAIL,
      apiKey: process.env.EZQ42_SECRET_KEY,
      concurrency,
      payload: {
        url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/run`,
        method: "POST",
        body: {
          name,
          delay,
          date: new Date().toISOString(),
        },
      },
    });
  }

  const responses = await Promise.all(
    payloads.map(async (payload) => {
      const url = `${process.env.EZQ42_URL}/api/v1/job`;
      console.log(`Sending job to ${url}`);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const status = response.status;
      return status;
    })
  );

  console.log(responses);

  return new Response("ok", {
    status: 200,
  });
};
