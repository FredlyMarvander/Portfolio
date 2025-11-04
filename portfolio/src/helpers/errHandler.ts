export const errHandler = (err: unknown) => {
  const error = err as { message: string; status?: number };
  const message = error.message || "Internal Server Error";
  const status = error.status || 500;
  return Response.json({ message }, { status });
};
